import type { MySession } from "./types";

export const POST = ((context) => {
  for (let p = 1; p <= 3; p++) {
    delete (context.session as unknown as MySession)[`interstitial-${p}`];
  }

  return context.redirect(context.url.toString());
}) satisfies MarkoRun.Handler;
