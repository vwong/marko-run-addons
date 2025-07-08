import qs, { type IParseOptions } from "qs";

export const parseBody =
  (options?: IParseOptions): MarkoRun.Handler =>
  async (context) => {
    const { request } = context;
    if (
      request.method === "POST" &&
      (request.headers.get("content-type") || "").startsWith(
        "application/x-www-form-urlencoded",
      )
    ) {
      context.form ||= await request.text();
      context.body = qs.parse(context.form, options);
    } else {
      context.form = "";
      context.body = {};
    }
  };

declare module "@marko/run" {
  interface Context {
    body?: unknown;
    form?: string;
  }
}
