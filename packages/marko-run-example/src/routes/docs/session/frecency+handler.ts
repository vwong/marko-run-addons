import { type Static, Type } from "@sinclair/typebox";
import { validateQuery } from "@vwong/marko-run-addons/server";

export const QuerySchema = Type.Object({
  page: Type.Optional(Type.String()),
});

export type QuerySchema = Static<typeof QuerySchema>;

export const GET = [
  validateQuery(QuerySchema),
  (context) => {
    const { page } = context.query as QuerySchema;

    if (page) {
      context.frecency.visit("category", page);
    }
  },
] as MarkoRun.Handler;
