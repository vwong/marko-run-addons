import qs, { type IParseOptions } from "qs";

export interface Meta {
  parse?: {
    body?: IParseOptions;
    query?: IParseOptions;
  };
}

export const requestParser = (): MarkoRun.Handler => async (context) => {
  const { parse } = context.meta as Meta;

  if (context.url.search) {
    context.query = qs.parse(context.url.search.substring(1), parse?.query);
  } else {
    context.query = {};
  }

  if (
    context.request.method === "POST" &&
    (context.request.headers.get("content-type") || "").startsWith(
      "application/x-www-form-urlencoded",
    )
  ) {
    const form = await context.request.text();
    context.form = form;
    context.body = qs.parse(form, parse?.body);
  }
};

declare module "@marko/run" {
  interface Context {
    body?: unknown;
    form?: string;
    query?: unknown;
  }
}
