import { randomBytes } from "node:crypto";
import {
  clientJs,
  csrf,
  flash,
  parseBody,
  parseQuery,
  session,
  validateInit,
} from "@vwong/marko-run-addons/server";
import { AjvValidator } from "#lib/ajvValidator";
import { Contents } from "#lib/contents";
import { MemorySessionStore } from "#lib/memorySessionStore";
import { badRequest } from "#lib/responses";

const validator = new AjvValidator();

export default [
  session({
    clockTolerance: 60,
    cookieName: "sid",
    cookieOptions: {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    },
    create: () => Promise.resolve({ count: 0 }),
    maxAge: 86_400,
    minAge: 36_000,
    secrets: ["secret"],
    store: new MemorySessionStore({ maxAge: 86_400_000 }),
  }),
  flash(),
  parseBody(),
  parseQuery(),
  csrf({
    maxAge: 3_600,
    minAge: 1_800,
    onError: (context) => {
      const message = "Missing or expired CSRF Token";
      if (context.isXHR) {
        return badRequest({ error: message });
      } else {
        context.flash.error(message);
        return context.back();
      }
    },
  }),
  validateInit(validator),
  clientJs(),
  async (context, next) => {
    const { headers } = context.request;

    context.contents = new Contents();
    context.cspNonce =
      headers.get("X-Nonce") || randomBytes(16).toString("base64");
    context.isHardReload =
      headers.get("Pragma") === "no-cache" || // Safari, Firefox
      headers.get("Cache-control") === "no-cache"; // Chrome
    context.isXHR = headers.get("X-Requested-With") === "XMLHttpRequest";

    context.serializedGlobals.cspNonce = true;
    context.serializedGlobals.isHardReload = true;

    const response = await next();

    response.headers.set("Cache-Control", "no-store");

    return response;
  },
] as MarkoRun.Handler[];
