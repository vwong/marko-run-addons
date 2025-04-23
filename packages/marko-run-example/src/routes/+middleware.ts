import { randomBytes } from "node:crypto";
import {
  activityStack,
  clientJs,
  csrf,
  flash,
  frecency,
  requestParser,
  session,
  validate,
} from "@vwong/marko-run-addons/server";
import { AjvValidator } from "#lib/ajvValidator";
import { MemorySessionStore } from "#lib/memorySessionStore";
import { badRequest, redirect } from "#lib/responses";

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
  requestParser(),
  csrf({
    maxAge: 3_600,
    minAge: 1_800,
    onError: (context) => {
      const message = "Missing or expired CSRF Token";
      if (context.isXHR) {
        return badRequest({ error: message });
      } else {
        context.flash.error(message);
        return redirect(context.request.headers.get("referer")!);
      }
    },
  }),
  validate({
    validator: new AjvValidator(),
  }),
  activityStack(),
  frecency({ decay: 0.99 }),
  clientJs(),
  async (context, next) => {
    context.cspNonce = randomBytes(16).toString("base64");
    context.csrfToken = context.csrf.current;
    context.isXHR =
      context.request.headers.get("X-Requested-With") === "XMLHttpRequest";

    // TODO: this will be renamed to "renderId" in Marko 6
    if (context.isXHR) {
      context.componentIdPrefix = `c-${Math.random()}`;
    }

    context.serializedGlobals.csrfToken = true;

    const response = await next();

    response.headers.set("Cache-Control", "no-store");

    return response;
  },
] as MarkoRun.Handler[];
