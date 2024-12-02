import { redirect } from "#lib/responses";
import type { MySession } from "./types";

export const POST: MarkoRun.Handler = (context) => {
  (context.session as unknown as MySession)[
    `interstitial-${Number(context.params.step)}`
  ] = true;

  return context.activityStack.pop() || redirect(context.url.pathname);
};
