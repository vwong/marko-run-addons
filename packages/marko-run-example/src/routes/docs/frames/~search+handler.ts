import { type Static, Type } from "@sinclair/typebox";
import { validateQuery } from "@vwong/marko-run-addons/server";
import { badRequest } from "#lib/responses";

export const QuerySchema = Type.Object({
  search: Type.Optional(Type.String()),
});

export type QuerySchema = Static<typeof QuerySchema>;

export const GET = [
  validateQuery(QuerySchema),
  (context) => {
    const { search } = context.query as QuerySchema;

    if (context.isXHR && search === "break") {
      return badRequest({});
    }
  },
] as MarkoRun.Handler;
