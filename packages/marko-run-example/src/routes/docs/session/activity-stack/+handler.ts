import { redirect } from "#lib/responses";
import type { MySession } from "./types";

export const POST: MarkoRun.Handler = (context) => {
  for (let p = 1; p <= 3; p++) {
    delete (context.session as unknown as MySession)[`interstitial-${p}`];
  }

  return redirect(context.url.toString());
};