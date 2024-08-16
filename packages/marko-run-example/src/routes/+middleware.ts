import {
  csrf,
  flash,
  requestParser,
  session,
  validate,
} from "@vwong/marko-run-addons/server";
import { MemorySessionStore } from "../lib/memorySessionStore";
import { AjvValidator } from "../lib/ajvValidator";

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
    store: new MemorySessionStore({ maxAge: 86_400 }),
  }),
  flash(),
  requestParser(),
  csrf({
    maxAge: 3_600,
    minAge: 1_800,
    onError: (context: MarkoRun.Context) => {
      context.flash.error("Missing or expired CSRF Token");
      return new Response(null, {
        status: 302,
        headers: {
          location: context.request.headers.get("referer") as string,
        },
      });
    },
  }),
  validate({ validator: new AjvValidator() }),
] as MarkoRun.Handler[];
