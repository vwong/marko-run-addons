import { badRequest } from "#lib/responses";
import type { QuerySchema } from "./~search+meta";

export const GET = ((context) => {
  const { search } = context.query as QuerySchema;

  if (context.isXHR && search === "break") {
    return badRequest({});
  }
}) satisfies MarkoRun.Handler;
