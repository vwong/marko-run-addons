import compression from "compression";
import express from "express";
import path from "node:path";
import url from "node:url";
import zlib from "node:zlib";
import { routerMiddleware } from "@marko/run-adapter-node/middleware";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();
app.set("trust proxy", true);
app.disable("x-powered-by");
app.use(
  compression({
    flush: zlib.constants.Z_PARTIAL_FLUSH,
    threshold: 500,
  }),
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "public", "assets"), {
    index: false,
    immutable: true,
    maxAge: "365 days",
  }),
);
app.use((req, _res, next) => {
  // sanitize bad urls, so @marko/run doesn't crash
  if (req.url.match(/\/{2,}/)) {
    req.url = "/404";
  }
  next();
});
app.use(routerMiddleware());
app.listen(process.env.PORT || 3000);
