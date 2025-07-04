import { type Static, Type } from "@sinclair/typebox";
import { validateBody } from "@vwong/marko-run-addons/server";

const BodySchema = Type.Object({
  count: Type.Number({ maximum: 5, errorMessage: "no more than 5 please" }),
  count2: Type.Number({ maximum: 5, errorMessage: "yo, less than 5, I say" }),
});

export type BodySchema = Static<typeof BodySchema>;

export const POST = [
  validateBody(BodySchema),
  (context) => {
    if (Math.random() > 0.5) {
      context.flash.success("Successfully processed! Form has been reset");
      context.body = undefined;
    } else {
      context.flash.error("Failed to process. Unsaved form is preserved");
    }

    return context.back();
  },
] as MarkoRun.Handler;
