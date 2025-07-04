import qs, { type IParseOptions } from "qs";

export const parseQuery =
  (options?: IParseOptions): MarkoRun.Handler =>
  (context) => {
    const { url } = context;

    context.query = url.search
      ? qs.parse(url.search.substring(1), options)
      : {};
  };

declare module "@marko/run" {
  interface Context {
    query?: unknown;
  }
}
