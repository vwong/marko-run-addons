import { QuerySchema } from "./+meta";

export const GET: MarkoRun.Handler = (context) => {
  const { page } = context.query as QuerySchema;

  if (page) {
    context.frecency.visit("category", page);
  }
};
