import { type Static, Type } from "@sinclair/typebox";
import type { Meta } from "@vwong/marko-run-addons/server";

export const BodySchema = Type.Object({
  count: Type.Number({ maximum: 5, errorMessage: "no more than 5 please" }),
  count2: Type.Number({ maximum: 5, errorMessage: "yo, less than 5, I say" }),
});

export type BodySchema = Static<typeof BodySchema>;

export default {
  schema: {
    body: BodySchema,
  },
} satisfies Meta;
