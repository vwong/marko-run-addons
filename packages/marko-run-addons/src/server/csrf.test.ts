import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { csrf, type Context } from "./csrf";

const MAX_AGE = 3600; /* 1 hour */
const MIN_AGE = 1800; /* 0.5 hours */

type CallableHandler = (context: Context) => Promise<void>;

const { randomBytes } = vi.hoisted(() => ({
  randomBytes: vi.fn(),
}));

vi.mock("node:crypto", () => {
  return {
    randomBytes,
  };
});

const onError = vi.fn();

describe("csrf", () => {
  let csrfMiddleware: CallableHandler;
  let context: Context;
  let now: number;

  beforeAll(() => {
    now = Date.now() / 1000 - 10;
    csrfMiddleware = csrf({
      maxAge: MAX_AGE,
      minAge: MIN_AGE,
      onError,
    }) as unknown as CallableHandler;
  });

  describe("initialised session", () => {
    describe("when there are no active tokens", () => {
      beforeEach(() => {
        context = {
          body: {
            _csrf: "active-token",
          },
          session: {
            _csrfTokens: [
              { value: "active-token", iat: now - MIN_AGE },
              { value: "old-token", iat: now - MAX_AGE },
            ],
          },
        } as unknown as Context;
        randomBytes.mockReturnValue("new-token");

        csrfMiddleware(context);
      });

      it("rotates the tokens", () => {
        expect(context.session._csrfTokens).toMatchObject([
          { value: "new-token" },
          { value: "active-token" },
        ]);
      });

      it("does not validate the old token", () => {
        expect(context.csrf.isValid("old-token")).toBe(false);
      });

      it("validates the active token", () => {
        expect(context.csrf.isValid("active-token")).toBe(true);
      });

      it("validates the new token", () => {
        expect(context.csrf.isValid("new-token")).toBe(true);
      });

      it("return the latest token", () => {
        expect(context.csrf.current).toBe("new-token");
      });
    });

    describe("when there is an invalid token", () => {
      beforeEach(() => {
        context = {
          body: {
            _csrf: "tampered-token",
          },
          session: {
            _csrfTokens: [],
          },
        } as unknown as Context;
        randomBytes.mockReturnValue("new-token");

        csrfMiddleware(context);
      });

      it("invokes the error handler", () => {
        expect(onError).toBeCalled();
      });
    });
  });

  describe("uninitialised session", () => {
    beforeEach(() => {
      context = {
        session: {},
      } as unknown as Context;
      randomBytes.mockReturnValue("new-token");

      csrfMiddleware(context);
    });

    it("correctly initialises", async () => {
      expect(context.csrf.current).toBe("new-token");
    });
  });
});
