import { randomBytes } from "node:crypto";

interface FormBody {
  _csrf?: string;
}

export interface CsrfToken {
  iat: number;
  value: string;
}

export interface CsrfSession {
  _csrfTokens?: CsrfToken[];
}

export class CsrfService {
  #tokens: CsrfToken[];

  constructor({
    maxAge,
    minAge,
    session,
  }: {
    maxAge: number;
    minAge: number;
    session: CsrfSession;
  }) {
    const now = Date.now() / 1000;
    const tokens = session._csrfTokens || [];

    const activeTokens = tokens.filter((t) => t.iat + maxAge > now);

    if (!tokens.some((t) => t.iat + minAge > now)) {
      activeTokens.unshift({
        iat: now,
        value: randomBytes(16).toString("base64"),
      });
    }

    session._csrfTokens = activeTokens;
    this.#tokens = activeTokens;
  }

  isValid(token: string): boolean {
    return this.#tokens.some((t) => t.value === token);
  }

  get current(): string {
    return this.#tokens[0].value;
  }
}

export interface CsrfOptions {
  disableCheck?: (context: MarkoRun.Context) => boolean;
  maxAge: number;
  minAge: number;
  onError: (context: MarkoRun.Context) => void;
}

export const csrf =
  ({
    disableCheck = () => false,
    minAge,
    maxAge,
    onError,
  }: CsrfOptions): MarkoRun.Handler =>
  (context) => {
    const csrf = new CsrfService({
      maxAge,
      minAge,
      session: context.session,
    });

    if (
      !disableCheck(context) &&
      context.body !== undefined &&
      !csrf.isValid((context.body as FormBody)._csrf!)
    ) {
      return onError(context);
    }

    context.csrf = csrf;
  };

declare module "@marko/run" {
  interface Context {
    csrf: CsrfService;
  }
}
