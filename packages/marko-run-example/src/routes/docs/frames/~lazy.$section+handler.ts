import { type Static, Type } from "@sinclair/typebox";
import { badRequest } from "#lib/responses";

const sleep = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

export const QuerySchema = Type.Object({
  delay: Type.Optional(Type.Number({ default: 0 })),
});

export type QuerySchema = Static<typeof QuerySchema>;

export const GET = [
  async (context) => {
    const { section } = context.params;
    const { delay } = context.query as QuerySchema;

    await sleep(delay!);

    if (context.isXHR && section === "10") {
      return badRequest({});
    }
  },
] as MarkoRun.Handler;
