import { badRequest, json } from "#lib/responses";
import type { MySession } from "./types";

export const GET = ((context) => {
  const session = context.session as unknown as MySession;
  session.favorites ||= {};

  const { favorite } = context.params;
  if (context.isXHR && favorite.startsWith("item-d")) {
    return badRequest({});
  }
}) satisfies MarkoRun.Handler;

export const POST = (async (context) => {
  const { favorite } = context.params;

  if (context.isXHR && favorite.startsWith("item-c")) {
    return badRequest({});
  }

  const session = context.session as unknown as MySession;
  session.favorites ||= {};
  session.favorites[favorite] = (session.favorites[favorite] || 0) + 1;

  return context.isXHR
    ? json({})
    : context.redirect(context.request.headers.get("referer")!);
}) satisfies MarkoRun.Handler;
