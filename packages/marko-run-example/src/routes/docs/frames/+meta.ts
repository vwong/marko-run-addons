import { type Static, Type } from "@sinclair/typebox";

export const QuerySchema = Type.Object({
  tab: Type.String({ default: "one" }),
  tab2: Type.String({ default: "four" }),
  search: Type.Optional(Type.String()),
});

export type QuerySchema = Static<typeof QuerySchema>;

export default {
  schema: {
    query: QuerySchema,
  },
};
