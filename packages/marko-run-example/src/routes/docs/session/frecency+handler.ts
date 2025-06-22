import { QuerySchema } from "./frecency+meta";

export const GET = ((context) => {
  const { page } = context.query as QuerySchema;

  if (page) {
    context.frecency.visit("category", page);
  }
}) satisfies MarkoRun.Handler;
