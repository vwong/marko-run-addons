import { type Static, Type } from "@sinclair/typebox";
import { validateQuery } from "@vwong/marko-run-addons/server";

export const QuerySchema = Type.Object({
  tab: Type.String({ default: "one" }),
  tab2: Type.String({ default: "four" }),
  search: Type.Optional(Type.String()),
});

export type QuerySchema = Static<typeof QuerySchema>;

export const GET = validateQuery(QuerySchema) as MarkoRun.Handler;
