import { type Static, Type } from "@sinclair/typebox";
import type { Meta } from "@vwong/marko-run-addons/server";

export const QuerySchema = Type.Object({
  page: Type.Number({ default: 1, minimum: 1 }),
});

export type QuerySchema = Static<typeof QuerySchema>;

export default {
  schema: {
    query: QuerySchema,
  },
} satisfies Meta;
