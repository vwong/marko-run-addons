import { type Static, Type } from "@sinclair/typebox";

export const QuerySchema = Type.Object({
  tab: Type.String({ default: "one" }),
});

export type QuerySchema = Static<typeof QuerySchema>;

export default {
  schema: {
    query: QuerySchema,
  },
};
