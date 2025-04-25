import { type Static, Type } from "@sinclair/typebox";

export const QuerySchema = Type.Object({
  tab: Type.Union(
    [Type.Literal("tab-1"), Type.Literal("tab-2"), Type.Literal("tab-3")],
    { default: "tab-1" },
  ),
});

export type QuerySchema = Static<typeof QuerySchema>;

export default {
  schema: {
    query: QuerySchema,
  },
};
