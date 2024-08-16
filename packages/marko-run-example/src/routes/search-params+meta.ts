import { Type } from "@sinclair/typebox";

export default {
  schema: {
    query: Type.Object({
      page: Type.Number({ default: 1, minimum: 1 }),
    }),
  },
};
