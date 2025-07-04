import { load } from "@vwong/marko-run-addons/server";

const sleep = (duration: number, succeed = true) =>
  new Promise((resolve, reject) =>
    setTimeout(succeed ? resolve : reject, duration),
  ) as Promise<void>;

export const GET = [
  load("sleep3Promise", () => sleep(3000)),
  load("sleep5Promise", () => sleep(5000, false)),
] as MarkoRun.Handler[];
