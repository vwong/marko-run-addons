import { beforeEach, describe, expect, it } from "vitest";
import { parseBody } from "./parseBody";

type CallableHandler = (context: MarkoRun.Context) => Promise<void>;

const url = new URL("http://foo");

describe("parseBody", () => {
  let middleware: CallableHandler;

  describe("default parse options", () => {
    beforeEach(() => {
      middleware = parseBody() as CallableHandler;
    });

    describe("form POSTS", () => {
      it("parses POST form data", async () => {
        const context = {
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: "a=1&b=2&c[]=3&c[]=4",
          }),
        } as MarkoRun.Context;

        await middleware(context);

        expect(context.body).toEqual({ a: "1", b: "2", c: ["3", "4"] });
      });
    });

    describe("other body content types", () => {
      it("ignores the body", async () => {
        const context = {
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: "a=b",
          }),
        } as MarkoRun.Context;

        await middleware(context);

        expect(context.body).toEqual({});
      });
    });

    describe("unspecified content-type", () => {
      it("ignores the body", async () => {
        const context = {
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "",
            }),
            body: "a=b",
          }),
        } as MarkoRun.Context;

        await middleware(context);

        expect(context.body).toEqual({});
      });
    });

    describe("other HTTP methods", () => {
      it("ignores the body", async () => {
        const context = {
          request: new Request(url, {
            method: "PUT",
            body: "a=b",
          }),
        } as MarkoRun.Context;

        await middleware(context);

        expect(context.body).toEqual({});
      });
    });
  });

  describe("custom parse options", () => {
    beforeEach(() => {
      middleware = parseBody({
        parseArrays: false,
      }) as CallableHandler;
    });

    describe("form POSTS", () => {
      it("parses POST form data", async () => {
        const context = {
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: "a=1&b=2&c[]=3&c[]=4",
          }),
        } as MarkoRun.Context;
        await middleware(context);
        expect(context.body).toEqual({
          a: "1",
          b: "2",
          c: { "0": ["3", "4"] },
        });
      });
    });
  });
});
