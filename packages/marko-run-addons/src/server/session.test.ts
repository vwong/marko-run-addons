import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { session, type Session } from "./session";

const COOKIE_NAME = "sessionCookie";
const MAX_AGE = 86_400; /* 24 hours */
const MIN_AGE = 36_000; /* 10 hours */

const { randomBytes, sign, verify } = vi.hoisted(() => ({
  randomBytes: vi.fn(),
  sign: vi.fn(),
  verify: vi.fn(),
}));

vi.mock("node:crypto", () => {
  return {
    randomBytes,
  };
});

vi.mock("jsonwebtoken", () => {
  return {
    default: {
      sign,
      verify,
    },
  };
});

const store = {
  get: vi.fn(),
  set: vi.fn(),
};

const create = vi.fn();

const next = () => Promise.resolve(new Response());

type CallableHandler = (
  context: MarkoRun.Context,
  next: () => Promise<Response>,
) => Promise<Response>;

describe("session", () => {
  let sessionMiddleware: CallableHandler;
  let context: MarkoRun.Context;
  let now: number;

  beforeAll(() => {
    now = Date.now() / 1000 - 10;
    sessionMiddleware = session({
      clockTolerance: 60,
      cookieName: COOKIE_NAME,
      cookieOptions: {},
      create,
      maxAge: MAX_AGE,
      minAge: MIN_AGE,
      secrets: ["secret", "old-secret"],
      store,
    }) as CallableHandler;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("when there are no cookies", () => {
    beforeEach(() => {
      context = {
        request: new Request("http://foo"),
      } as MarkoRun.Context;

      randomBytes.mockReturnValue("session-id");
      create.mockResolvedValue("new-session");
      sign.mockReturnValue("signed-jwt");
    });

    it("creates a new session", async () => {
      const response = await sessionMiddleware(context, next);

      expect(store.set).toHaveBeenCalledWith("session-id", "new-session");
      expect(response.headers.get("Set-Cookie")).toEqual(
        `${COOKIE_NAME}=signed-jwt; Max-Age=${MAX_AGE}`,
      );
    });
  });

  describe("when there is a tampered cookie", () => {
    beforeEach(() => {
      context = {
        request: new Request("http://foo", {
          headers: new Headers({ Cookie: `${COOKIE_NAME}=tampered-jwt` }),
        }),
      } as MarkoRun.Context;

      verify.mockRejectedValue(new Error("tampered cookie!"));
      randomBytes.mockReturnValue("session-id");
      create.mockResolvedValue("new-session");
      sign.mockReturnValue("signed-jwt");
    });

    it("creates a new session", async () => {
      const response = await sessionMiddleware(context, next);

      expect(store.set).toHaveBeenCalledWith("session-id", "new-session");
      expect(response.headers.get("Set-Cookie")).toEqual(
        `${COOKIE_NAME}=signed-jwt; Max-Age=${MAX_AGE}`,
      );
    });
  });

  describe("when there is a valid cookie", () => {
    describe("with no matching session in store", () => {
      beforeEach(() => {
        context = {
          request: new Request("http://foo", {
            headers: new Headers({ Cookie: `${COOKIE_NAME}=jwt` }),
          }),
        } as MarkoRun.Context;

        verify.mockReturnValue({ exp: now + MAX_AGE, sessionId: "existing" });
        store.get.mockReturnValue(null);
        create.mockResolvedValue("new-session");
        sign.mockReturnValue("signed-jwt");
      });

      it("creates a new session", async () => {
        const response = await sessionMiddleware(context, next);

        expect(store.set).toHaveBeenCalledWith("existing", "new-session");
        expect(response.headers.get("Set-Cookie")).toEqual(
          `${COOKIE_NAME}=signed-jwt; Max-Age=${MAX_AGE}`,
        );
      });
    });

    describe("with matching session in store", () => {
      describe("there is plenty of time remaining", () => {
        beforeEach(() => {
          context = {
            request: new Request("http://foo", {
              headers: new Headers({ Cookie: `${COOKIE_NAME}=jwt` }),
            }),
          } as MarkoRun.Context;

          verify.mockReturnValue({ exp: now + MAX_AGE, sessionId: "existing" });
          store.get.mockReturnValue("existing-session");
          sign.mockReturnValue("signed-jwt");
        });

        describe("session contents have changed", () => {
          it("updates the store", async () => {
            const response = await sessionMiddleware(context, () => {
              context.session = "changed-session" as unknown as Session;
              return next();
            });

            expect(store.set).toHaveBeenCalledWith(
              "existing",
              "changed-session",
            );
            expect(response.headers.get("Set-Cookie")).toEqual(
              `${COOKIE_NAME}=signed-jwt; Max-Age=${MAX_AGE}`,
            );
          });
        });

        describe("session contents have NOT changed", () => {
          it("does NOT update the store", async () => {
            const response = await sessionMiddleware(context, next);

            expect(store.set).not.toHaveBeenCalled();
            expect(response.headers.get("Set-Cookie")).toBeNull();
          });
        });
      });

      describe("there is little time remaining", () => {
        beforeEach(() => {
          context = {
            request: new Request("http://foo", {
              headers: new Headers({ Cookie: `${COOKIE_NAME}=jwt` }),
            }),
          } as MarkoRun.Context;

          verify.mockReturnValue({ exp: now + MIN_AGE, sessionId: "existing" });
          store.get.mockReturnValue("existing-session");
          sign.mockReturnValue("signed-jwt");
        });

        describe("session contents have NOT changed", () => {
          it("updates the session to prolong its life", async () => {
            const response = await sessionMiddleware(context, next);

            expect(store.set).toHaveBeenCalledWith(
              "existing",
              "existing-session",
            );
            expect(response.headers.get("Set-Cookie")).toEqual(
              `${COOKIE_NAME}=signed-jwt; Max-Age=${MAX_AGE}`,
            );
          });
        });
      });
    });

    describe("when secrets are rotated", () => {
      beforeEach(() => {
        context = {
          request: new Request("http://foo", {
            headers: new Headers({ Cookie: `${COOKIE_NAME}=jwt` }),
          }),
        } as MarkoRun.Context;

        verify.mockRejectedValueOnce(new Error("unrecognised secret"));
        verify.mockReturnValueOnce({
          exp: now + MAX_AGE,
          sessionId: "existing",
        });
      });

      it("accepts cookies signed with the older secret", async () => {
        await sessionMiddleware(context, next);

        expect(store.get).toHaveBeenCalledWith("existing");
      });
    });

    describe("when secrets are lost", () => {
      beforeEach(() => {
        context = {
          request: new Request("http://foo", {
            headers: new Headers({ Cookie: `${COOKIE_NAME}=jwt` }),
          }),
        } as MarkoRun.Context;

        verify.mockRejectedValue(new Error("unrecognised secret"));
        randomBytes.mockReturnValue("session-id");
      });

      it("creates a new session", async () => {
        await sessionMiddleware(context, next);

        expect(store.get).not.toHaveBeenCalled();
        expect(create).toHaveBeenCalledWith();
      });
    });
  });

  describe("with explicitly 'set-cookie' header", () => {
    beforeEach(() => {
      context = {
        request: new Request("http://foo"),
      } as MarkoRun.Context;

      randomBytes.mockReturnValue("session-id");
      create.mockResolvedValue("new-session");
      sign.mockReturnValue("signed-jwt");
    });

    it("does not clobber the header", async () => {
      const response = await sessionMiddleware(context, () =>
        Promise.resolve(
          new Response(null, {
            headers: {
              "Set-Cookie": "explicitly-set",
            },
          }),
        ),
      );

      expect(store.set).toHaveBeenCalledWith("session-id", "new-session");
      expect(response.headers.get("Set-Cookie")).toEqual("explicitly-set");
    });
  });
});
