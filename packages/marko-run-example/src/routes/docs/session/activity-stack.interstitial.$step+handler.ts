import { redirect } from "#lib/responses";
import type { MySession } from "./types";

export const POST = ((context) => {
  const step = Number(context.params.step);

  if (step <= 3) {
    (context.session as unknown as MySession)[`interstitial-${step}`] = true;
  }

  if (step === 2) {
    // add a bonus interstitial after this step
    context.activityStack.pop();
    context.activityStack.push("/docs/session/activity-stack/interstitial/100");
  }

  return context.activityStack.pop() || redirect(context.url.pathname);
}) satisfies MarkoRun.Handler;
