import { beforeEach, describe, expect, it } from "vitest";
import { requestParser } from "./requestParser";

type CallableHandler = (context: MarkoRun.Context) => Promise<void>;

describe("requestParser", () => {
  let requestParserMiddleware: CallableHandler;
  let context: MarkoRun.Context;

  describe("default parse options", () => {
    describe("search params", () => {
      beforeEach(() => {
        const url = new URL("http://foo?a=1&b=2&c[]=3&c[]=4");
        context = {
          meta: {},
          request: new Request(url),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("parses search params", async () => {
        await requestParserMiddleware(context);
        expect(context.query).toEqual({ a: "1", b: "2", c: ["3", "4"] });
      });
    });

    describe("form POSTS", () => {
      beforeEach(() => {
        const url = new URL("http://foo");
        context = {
          meta: {},
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: "a=1&b=2&c[]=3&c[]=4",
          }),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("parses POST form data", async () => {
        await requestParserMiddleware(context);
        expect(context.body).toEqual({ a: "1", b: "2", c: ["3", "4"] });
      });
    });

    describe("other body content types", () => {
      beforeEach(() => {
        const url = new URL("http://foo");
        context = {
          meta: {},
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: "a=b",
          }),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("ignores the body", async () => {
        await requestParserMiddleware(context);
        expect(context.body).toBeUndefined();
      });
    });

    describe("unspecified content-type", () => {
      beforeEach(() => {
        const url = new URL("http://foo");
        context = {
          meta: {},
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "",
            }),
            body: "a=b",
          }),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("ignores the body", async () => {
        await requestParserMiddleware(context);
        expect(context.body).toBeUndefined();
      });
    });

    describe("other HTTP methods", () => {
      beforeEach(() => {
        const url = new URL("http://foo");
        context = {
          meta: {},
          request: new Request(url, {
            method: "PUT",
            body: "a=b",
          }),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("ignores the body", async () => {
        await requestParserMiddleware(context);
        expect(context.body).toBeUndefined();
      });
    });
  });

  describe("custom parse options", () => {
    describe("search params", () => {
      beforeEach(() => {
        const url = new URL("http://foo?a=1&b=2&c[]=3&c[]=4");
        context = {
          meta: {
            parse: {
              query: { parseArrays: false },
            },
          },
          request: new Request(url),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("parses search params", async () => {
        await requestParserMiddleware(context);
        expect(context.query).toEqual({
          a: "1",
          b: "2",
          c: { "0": ["3", "4"] },
        });
      });
    });

    describe("form POSTS", () => {
      beforeEach(() => {
        const url = new URL("http://foo");
        context = {
          meta: {
            parse: {
              body: { parseArrays: false },
            },
          },
          request: new Request(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: "a=1&b=2&c[]=3&c[]=4",
          }),
          url,
        } as unknown as MarkoRun.Context;
        requestParserMiddleware = requestParser() as unknown as CallableHandler;
      });

      it("parses POST form data", async () => {
        await requestParserMiddleware(context);
        expect(context.body).toEqual({
          a: "1",
          b: "2",
          c: { "0": ["3", "4"] },
        });
      });
    });
  });
});
