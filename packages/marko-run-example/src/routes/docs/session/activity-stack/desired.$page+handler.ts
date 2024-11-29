import type { MySession } from "./types";

export const GET: MarkoRun.Handler = (context) => {
  context.activityStack.reset();

  for (let p = Number(context.params.page); p > 0; p--) {
    if (!(context.session as unknown as MySession)[`interstitial-${p}`]) {
      context.activityStack.push(
        `/docs/session/activity-stack/interstitial/${p}`,
      );
    }
  }

  return context.activityStack.pop();
};
