import cookie, { type SerializeOptions } from "cookie";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { cloneDeep, isEqual } from "lodash-es";
import { randomBytes } from "node:crypto";
import type { ActivityStackSession } from "./activityStack";
import type { CsrfSession } from "./csrf";
import type { FlashSession } from "./flash";
import type { ValidationSession } from "./validation";

export interface Session
  extends ActivityStackSession,
    CsrfSession,
    FlashSession,
    ValidationSession {}

export abstract class SessionStore {
  abstract get(sessionId: string): Promise<Session | undefined>;
  abstract set(sessionId: string, session: Session): Promise<void>;
}

export interface SessionOptions {
  clockTolerance: number;
  cookieName: string;
  cookieOptions: Omit<SerializeOptions, "expires" | "maxAge">;
  create: () => Promise<Session>;
  maxAge: number;
  minAge: number;
  secrets: string[];
  store: SessionStore;
}

export const session = ({
  clockTolerance,
  cookieName,
  cookieOptions,
  create,
  maxAge,
  minAge,
  secrets,
  store,
}: SessionOptions): MarkoRun.Handler => {
  const signSessionId = (sessionId: string): string =>
    jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + maxAge,
        sessionId,
      },
      secrets[0],
    );

  const setCookie = (
    response: Response,
    token: string,
    options: Partial<SerializeOptions>,
  ) => {
    if (response.headers.has("Set-cookie")) {
      /* don't clobber */
      return;
    }
    response.headers.set(
      "Set-cookie",
      cookie.serialize(cookieName, token, {
        ...cookieOptions,
        ...options,
      }),
    );
  };

  const decodeSessionId = async (
    token: string,
  ): Promise<JwtPayload | undefined> => {
    for (const secret of secrets) {
      try {
        const payload = await jwt.verify(token, secret, {
          clockTolerance,
        });
        return payload as JwtPayload;
      } catch (_error) {
        // tampered cookie!
      }
    }
  };

  return async (context, next) => {
    const { [cookieName]: existingSessionToken } = cookie.parse(
      (context.request.headers.get("Cookie") as string) || "",
    );
    let savedSession: Session | undefined;

    const decodedSession = existingSessionToken
      ? await decodeSessionId(existingSessionToken)
      : undefined;

    const remainingAge = decodedSession
      ? decodedSession.exp! - Math.floor(Date.now() / 1000)
      : 0;

    let sessionId = decodedSession ? decodedSession.sessionId : "";

    if (sessionId) {
      savedSession = await store.get(sessionId);
      if (savedSession) {
        context.session = cloneDeep(savedSession) as Session;
      }
    }

    context.session ||= await (create() as Promise<Session>);

    const response = await next();

    if (!sessionId) {
      sessionId = randomBytes(16).toString("base64");
    }

    if (!isEqual(context.session, savedSession) || remainingAge < minAge) {
      await store.set(sessionId, context.session);
      setCookie(response, signSessionId(sessionId), { maxAge });
    }

    return response;
  };
};
