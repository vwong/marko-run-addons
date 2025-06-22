import { json, redirect } from "#lib/responses";
import { BodySchema } from "./-theme+meta";

export const POST = ((context) => {
  const { theme } = context.body as BodySchema;

  context.session.theme = theme;

  return context.isXHR
    ? json({ theme })
    : redirect(context.request.headers.get("referer") || "/");
}) satisfies MarkoRun.Handler;
