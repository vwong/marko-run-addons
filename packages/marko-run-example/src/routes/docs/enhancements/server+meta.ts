import type { Meta } from "@vwong/marko-run-addons/server";

const sleep = (duration: number, succeed = true) =>
  new Promise((resolve, reject) =>
    setTimeout(succeed ? resolve : reject, duration),
  ) as Promise<void>;

export default {
  load: () => ({
    sleep3Promise: sleep(3000),
    sleep5Promise: sleep(5000, false),
  }),
} satisfies Meta;
