import { type Static, Type } from "@sinclair/typebox";
import { validateBody } from "@vwong/marko-run-addons/server";
import { json } from "#lib/responses";

const BodySchema = Type.Object({
  theme: Type.Union([
    Type.Literal("dark"),
    Type.Literal("light"),
    Type.Literal(""),
  ]),
});

export type BodySchema = Static<typeof BodySchema>;

export const POST = [
  validateBody(BodySchema),
  (context) => {
    const { theme } = context.body as BodySchema;

    context.session.theme = theme;

    return context.isXHR ? json({ theme }) : context.back();
  },
] as MarkoRun.Handler[];
