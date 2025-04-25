import { type Static, Type } from "@sinclair/typebox";

export const BodySchema = Type.Object({
  theme: Type.Union([
    Type.Literal("dark"),
    Type.Literal("light"),
    Type.Literal(""),
  ]),
});

export type BodySchema = Static<typeof BodySchema>;

export default {
  schema: {
    body: BodySchema,
  },
};
