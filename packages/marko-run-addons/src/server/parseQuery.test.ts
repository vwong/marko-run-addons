import { beforeEach, describe, expect, it } from "vitest";
import { parseQuery } from "./parseQuery";

type CallableHandler = (context: MarkoRun.Context) => Promise<void>;

describe("requestParser", () => {
  let middleware: CallableHandler;

  describe("default parse options", () => {
    beforeEach(() => {
      middleware = parseQuery() as CallableHandler;
    });

    describe("search params", () => {
      it("parses search params", async () => {
        const context = {
          url: new URL("http://foo?a=1&b=2&c[]=3&c[]=4"),
        } as MarkoRun.Context;

        await middleware(context);

        expect(context.query).toEqual({ a: "1", b: "2", c: ["3", "4"] });
      });
    });
  });
  describe("custom parse options", () => {
    beforeEach(() => {
      middleware = parseQuery({
        parseArrays: false,
      }) as CallableHandler;
    });

    describe("search params", () => {
      it("parses search params", async () => {
        const context = {
          url: new URL("http://foo?a=1&b=2&c[]=3&c[]=4"),
        } as MarkoRun.Context;

        await middleware(context);

        expect(context.query).toEqual({
          a: "1",
          b: "2",
          c: { "0": ["3", "4"] },
        });
      });
    });
  });
});
