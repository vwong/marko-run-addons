import { badRequest } from "#lib/responses";

export const GET = ((context) => {
  const { tab } = context.params;

  if (context.isXHR && tab === "three") {
    return badRequest({});
  }
}) satisfies MarkoRun.Handler;
