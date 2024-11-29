import type { MySession } from "./types";

export const POST: MarkoRun.Handler = (context) => {
  (context.session as unknown as MySession)[
    `interstitial-${Number(context.params.step)}`
  ] = true;

  return context.activityStack.pop();
};
