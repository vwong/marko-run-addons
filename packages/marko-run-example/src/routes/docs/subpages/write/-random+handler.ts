import { json, redirect } from "#lib/responses";

export const POST: MarkoRun.Handler = async (context) =>
  context.isXHR ? json({}) : redirect(context.request.headers.get("referer")!);
