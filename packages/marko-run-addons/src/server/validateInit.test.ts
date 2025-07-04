import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validateInit } from "./validateInit";

type CallableHandler = (
  context: MarkoRun.Context,
) => Promise<Response | undefined>;

const url = new URL("http://foo/path");

const validator = {
  validate: vi.fn(),
  asJson: vi.fn(),
};

const validationChecks = [{ name: "fieldName", message: "is invalid" }];

describe("validateInit", () => {
  let middleware: CallableHandler;
  let context: MarkoRun.Context;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("redirected page", () => {
    beforeEach(() => {
      middleware = validateInit(validator) as CallableHandler;
      context = {
        request: new Request(url),
        session: {
          _redirectTo: url.pathname,
          _lastQuery: "query",
          _lastQueryErrors: validationChecks,
        },
        url,
      } as MarkoRun.Context;
    });

    it("restores previous body and errors", async () => {
      await middleware(context);

      expect(context.lastQuery).toEqual("query");
      expect(context.lastQueryErrors).toEqual(validationChecks);

      expect(context.session._redirectTo).toBeUndefined();
      expect(context.session._lastQuery).toBeUndefined();
      expect(context.session._lastQueryErrors).toBeUndefined();
    });
  });
});
