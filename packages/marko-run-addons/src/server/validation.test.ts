import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validate } from "./validation";

type CallableHandler = (
  context: MarkoRun.Context,
  next?: () => Response,
) => Promise<Response | undefined>;

const validator = {
  validate: vi.fn(),
  asJson: vi.fn(),
};

const validationChecks = [{ name: "fieldName", message: "is invalid" }];
const redirectResponse = new Response(null, {
  status: 302,
  headers: { location: "/some/path" },
});

describe("validate", () => {
  let validateMiddleware: CallableHandler;
  let context: MarkoRun.Context;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("for validation only", () => {
    beforeEach(() => {
      const url = new URL("http://foo/some/path");
      context = {
        meta: {
          schema: {
            body: "bodySchema",
            query: "querySchema",
          },
        },
        body: "body",
        query: "query",
        request: new Request(url, {
          headers: new Headers({
            "X-Validate-Only": "true",
          }),
          method: "POST",
        }),
        session: {},
        url,
      } as MarkoRun.Context;
      validateMiddleware = validate({ validator }) as CallableHandler;
    });

    it("validates with no errors", async () => {
      validator.asJson.mockReturnValueOnce([]);
      validator.asJson.mockReturnValueOnce([]);

      const response = await validateMiddleware(context);
      expect(response!.status).toEqual(204);
    });

    it("validates with errors in query params", async () => {
      validator.asJson.mockReturnValueOnce(validationChecks);

      const response = await validateMiddleware(context);

      expect(validator.validate).toHaveBeenCalledWith(
        context,
        "querySchema",
        context.query,
      );
      expect(response!.status).toEqual(400);
      expect(await response!.json()).toEqual(validationChecks);
    });

    it("validates with errors in body", async () => {
      validator.asJson.mockReturnValueOnce([]);
      validator.asJson.mockReturnValueOnce(validationChecks);

      const response = await validateMiddleware(context);

      expect(validator.validate).toHaveBeenCalledWith(
        context,
        "bodySchema",
        context.body,
      );
      expect(response!.status).toEqual(400);
      expect(await response!.json()).toEqual(validationChecks);
    });
  });

  describe("full submission (html or XHR)", () => {
    beforeEach(() => {
      const url = new URL("http://foo/some/path");
      context = {
        meta: {
          schema: {
            body: "bodySchema",
            query: "querySchema",
          },
        },
        body: "body",
        query: "query",
        request: new Request(url, {
          method: "POST",
        }),
        session: {},
        url,
      } as unknown as MarkoRun.Context;
      validateMiddleware = validate({ validator }) as CallableHandler;
    });

    it("validates with no errors", async () => {
      validator.asJson.mockReturnValueOnce([]);
      validator.asJson.mockReturnValueOnce([]);

      const response = await validateMiddleware(
        context,
        () => redirectResponse,
      );

      expect(response).toBe(redirectResponse);
    });

    it("validates with errors in query params", async () => {
      validator.asJson.mockReturnValueOnce(validationChecks);
      validator.asJson.mockReturnValueOnce([]);

      const response = await validateMiddleware(context);

      expect(response!.status).toEqual(302);
      expect(response!.headers.get("location")).toEqual("/some/path");
      expect(context.queryErrors).toEqual(validationChecks);
      expect(context.bodyErrors).toEqual([]);
    });

    it("validates with errors in body", async () => {
      validator.asJson.mockReturnValueOnce([]);
      validator.asJson.mockReturnValueOnce(validationChecks);

      const response = await validateMiddleware(context);

      expect(response!.status).toEqual(302);
      expect(response!.headers.get("location")).toEqual("/some/path");
      expect(context.queryErrors).toEqual([]);
      expect(context.bodyErrors).toEqual(validationChecks);
    });

    it("stores body and bodyError for use in next GET", async () => {
      validator.asJson.mockReturnValueOnce(["queryErrors"]);
      validator.asJson.mockReturnValueOnce(["bodyErrors"]);

      await validateMiddleware(context, () => redirectResponse);

      expect(context.session._redirectTo).toEqual("/some/path");
      expect(context.session._lastBody).toEqual("body");
      expect(context.session._lastBodyErrors).toEqual(["bodyErrors"]);
      expect(context.session._lastQuery).toEqual("query");
      expect(context.session._lastQueryErrors).toEqual(["queryErrors"]);
    });
  });

  describe("redirected page after a POST", () => {
    beforeEach(() => {
      const url = new URL("http://foo/some/path");
      context = {
        request: new Request(url),
        session: {
          _redirectTo: "/some/path",
          _lastBody: "body",
          _lastBodyErrors: ["bodyErrors"],
          _lastQuery: "query",
          _lastQueryErrors: ["queryErrors"],
        },
        url,
      } as unknown as MarkoRun.Context;
      validateMiddleware = validate({ validator }) as CallableHandler;
    });

    it("restores previous body and errors", async () => {
      await validateMiddleware(context);

      expect(context.body).toEqual("body");
      expect(context.bodyErrors).toEqual(["bodyErrors"]);
      expect(context.query).toEqual("query");
      expect(context.queryErrors).toEqual(["queryErrors"]);

      expect(context.session._redirectTo).toBeUndefined();
      expect(context.session._lastBody).toBeUndefined();
      expect(context.session._lastBodyErrors).toBeUndefined();
      expect(context.session._lastQuery).toBeUndefined();
      expect(context.session._lastQueryErrors).toBeUndefined();
    });
  });
});
