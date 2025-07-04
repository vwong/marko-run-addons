import { type Static, Type } from "@sinclair/typebox";
import { validateQuery } from "@vwong/marko-run-addons/server";

export const QuerySchema = Type.Object({
  page: Type.Number({ default: 1, minimum: 1 }),
});

export type QuerySchema = Static<typeof QuerySchema>;

export const GET = validateQuery(QuerySchema) as MarkoRun.Handler;
