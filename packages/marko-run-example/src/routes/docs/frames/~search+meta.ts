import { type Static, Type } from "@sinclair/typebox";
import type { Meta } from "@vwong/marko-run-addons/server";

export const QuerySchema = Type.Object({
  search: Type.Optional(Type.String()),
});

export type QuerySchema = Static<typeof QuerySchema>;

export default {
  schema: {
    query: QuerySchema,
  },
} satisfies Meta;
