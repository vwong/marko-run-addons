import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { validate } from "./validation";

type CallableHandler = (
  context: MarkoRun.Context,
) => Promise<Response | undefined>;

const flash = {
  error: vi.fn(),
};

const validator = {
  validate: vi.fn(),
  asJson: vi.fn(),
  asHtml: vi.fn(),
};

describe("validate", () => {
  let validateMiddleware: CallableHandler;
  let context: MarkoRun.Context;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("for validation only", () => {
    beforeAll(() => {
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
      } as MarkoRun.Context;
      validateMiddleware = validate({ validator }) as CallableHandler;
    });

    it("validates correctly", async () => {
      validator.validate.mockResolvedValue([]);

      const response = await validateMiddleware(context);

      expect(validator.validate).toHaveBeenCalled();
      expect(validator.asJson).not.toHaveBeenCalled();
      expect(validator.asHtml).not.toHaveBeenCalled();
      expect(response!.status).toEqual(204);
    });

    it("validates with error", async () => {
      validator.validate.mockReturnValueOnce(["error1", "error2"]); // query
      validator.validate.mockReturnValueOnce(["error3", "error4"]); // body

      const response = await validateMiddleware(context);

      expect(validator.validate).toHaveBeenCalled();
      expect(validator.asJson).toHaveBeenCalledWith([
        "error1",
        "error2",
        "error3",
        "error4",
      ]);
      expect(validator.asHtml).not.toHaveBeenCalled();
      expect(response!.status).toEqual(400);
    });
  });

  describe("native form submission", () => {
    beforeAll(() => {
      const url = new URL("http://foo/some/path");
      context = {
        flash,
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
        url,
      } as unknown as MarkoRun.Context;
      validateMiddleware = validate({ validator }) as CallableHandler;
    });

    it("validates correctly", async () => {
      validator.validate.mockResolvedValue([]);

      const response = await validateMiddleware(context);

      expect(validator.validate).toHaveBeenCalled();
      expect(validator.asJson).not.toHaveBeenCalled();
      expect(validator.asHtml).not.toHaveBeenCalled();
      expect(response).toBeUndefined();
    });

    it("validates with error", async () => {
      validator.validate.mockReturnValueOnce(["error1", "error2"]); // query
      validator.validate.mockReturnValueOnce(["error3", "error4"]); // body

      const response = await validateMiddleware(context);

      expect(validator.validate).toHaveBeenCalled();
      expect(validator.asHtml).toHaveBeenCalledWith([
        "error1",
        "error2",
        "error3",
        "error4",
      ]);
      expect(flash.error).toHaveBeenCalled();
      expect(response!.status).toEqual(302);
      expect(response!.headers.get("location")).toEqual("/some/path");
    });
  });
});
