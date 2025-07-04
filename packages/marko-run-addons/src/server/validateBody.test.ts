import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validateInit } from "./validateInit";
import { validateBody } from "./validateBody";

type CallableHandler = (
  context: MarkoRun.Context,
  next?: () => Response,
) => Promise<Response | undefined>;

const url = new URL("http://foo/path");

const validator = {
  validate: vi.fn(),
  asJson: vi.fn(),
};

const validationChecks = [{ name: "fieldName", message: "is invalid" }];

describe("validateBody", () => {
  let initMiddleware: CallableHandler;
  let middleware: CallableHandler;
  let context: MarkoRun.Context;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("for validation only", () => {
    beforeEach(() => {
      initMiddleware = validateInit(validator) as CallableHandler;
      middleware = validateBody("schema") as CallableHandler;
      context = {
        body: "body",
        request: new Request(url, {
          headers: new Headers({
            "X-Validate-Only": "true",
          }),
          method: "POST",
        }),
        session: {},
      } as MarkoRun.Context;
    });

    it("validates with no errors", async () => {
      validator.asJson.mockReturnValueOnce([]);

      initMiddleware(context);
      const response = await middleware(context);

      expect(response!.status).toEqual(204);
    });

    it("validates with errors in body", async () => {
      validator.asJson.mockReturnValueOnce(validationChecks);

      initMiddleware(context);
      const response = await middleware(context);

      expect(response!.status).toEqual(400);
      expect(await response!.json()).toEqual(validationChecks);
    });
  });

  describe("full submission (HTML or XHR)", () => {
    beforeEach(() => {
      initMiddleware = validateInit(validator) as CallableHandler;
      middleware = validateBody("schema") as CallableHandler;
      context = {
        body: "body",
        request: new Request(url, {
          method: "POST",
        }),
        session: {},
        url,
        redirect: vi.fn(() => new Response(null, { status: 302 })),
      } as unknown as MarkoRun.Context;
    });

    it("validates with no errors", async () => {
      const nextResponse = new Response();
      validator.asJson.mockReturnValueOnce([]);

      initMiddleware(context);
      const response = await middleware(context, () => nextResponse);

      expect(response).toEqual(nextResponse);
    });

    it("validates with no errors, but downstream also redirects", async () => {
      const nextResponse = new Response(null, { status: 302 });
      validator.asJson.mockReturnValueOnce([]);

      initMiddleware(context);
      const response = await middleware(context, () => nextResponse);

      expect(response).toEqual(nextResponse);
      expect(context.session._redirectTo).toEqual(context.url.pathname);
      expect(context.session._lastBody).toEqual("body");
      expect(context.session._lastBodyErrors).toEqual([]);
    });

    it("validates with errors in body", async () => {
      validator.asJson.mockReturnValueOnce(validationChecks);

      initMiddleware(context);
      await middleware(context);

      expect(context.bodyErrors).toEqual(validationChecks);
      expect(context.session._redirectTo).toEqual(context.url.pathname);
      expect(context.session._lastBody).toEqual("body");
      expect(context.session._lastBodyErrors).toEqual(validationChecks);
      expect(context.redirect).toBeCalledWith(context.url.pathname);
    });
  });
});
