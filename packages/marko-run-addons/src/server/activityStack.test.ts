import { beforeEach, describe, expect, it } from "vitest";
import { activityStack } from "./activityStack";

type CallableHandler = (context: MarkoRun.Context) => Promise<void>;

describe("activityStack", () => {
  let activityStackMiddleware: CallableHandler;
  let context: MarkoRun.Context;

  beforeEach(() => {
    context = {
      session: {},
      url: new URL("http://example/zero"),
    } as MarkoRun.Context;

    activityStackMiddleware = activityStack() as unknown as CallableHandler;
  });

  describe("with an empty stack", () => {
    it("returns no response", () => {
      activityStackMiddleware(context);

      context.activityStack.reset();
      const response = context.activityStack.pop();

      expect(response).toBeUndefined();
    });
  });

  describe("with normal stack usage", () => {
    it("pops the stack and redirects to it", () => {
      activityStackMiddleware(context);

      context.activityStack.reset();
      context.activityStack.push("/one");
      context.activityStack.push("/two");
      const response = context.activityStack.pop();

      expect(response!.status).toBe(302);
      expect(response!.headers.get("location")).toBe("/two");

      context = {
        ...context,
        url: new URL("http://example.com/two"),
      };
      activityStackMiddleware(context);

      const response2 = context.activityStack.pop();

      expect(response2!.status).toBe(302);
      expect(response2!.headers.get("location")).toBe("/one");
    });
  });

  describe("with out-of-order stack usage", () => {
    it("returns the top of the stack without popping", () => {
      activityStackMiddleware(context);

      context.activityStack.reset();
      context.activityStack.push("/one");
      context.activityStack.push("/two");
      const response = context.activityStack.pop();

      expect(response!.status).toBe(302);
      expect(response!.headers.get("location")).toBe("/two");

      context = {
        ...context,
        url: new URL("http://example.com/not-in-stack"),
      };
      activityStackMiddleware(context);

      const response2 = context.activityStack.pop();

      expect(response2!.status).toBe(302);
      expect(response2!.headers.get("location")).toBe("/two");
    });
  });
});
