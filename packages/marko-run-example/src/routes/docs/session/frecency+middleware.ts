import { frecency } from "@vwong/marko-run-addons/server";

export default frecency({ decay: 0.99 }) as MarkoRun.Handler;
