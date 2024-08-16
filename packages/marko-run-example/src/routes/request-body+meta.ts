import { Type } from "@sinclair/typebox";

export default {
  schema: {
    body: Type.Object({
      count: Type.Number({ maximum: 5 }),
      count2: Type.Number({ maximum: 5 }),
    }),
  },
};
