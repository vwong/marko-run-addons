import { Static, Type } from "@sinclair/typebox";

export const QuerySchema = Type.Object({
  page: Type.Optional(Type.String()),
});

export type QuerySchema = Static<typeof QuerySchema>;

export default {
  schema: {
    query: QuerySchema,
  },
};
