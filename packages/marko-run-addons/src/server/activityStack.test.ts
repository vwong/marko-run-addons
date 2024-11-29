import { beforeEach, describe, expect, it } from "vitest";
import { activityStack } from "./activityStack";

type CallableHandler = (context: MarkoRun.Context) => Promise<void>;

describe("activityStack", () => {
  let activityStackMiddleware: CallableHandler;
  let context: MarkoRun.Context;

  beforeEach(() => {
    context = {
      session: {},
      url: new URL("http://example/current"),
    } as MarkoRun.Context;

    activityStackMiddleware = activityStack() as unknown as CallableHandler;
  });

  it("returns the current page", () => {
    activityStackMiddleware(context);

    context.activityStack.reset();
    const response = context.activityStack.pop();

    expect(response).toBeUndefined();
  });

  it("redirects to the top of the stack", () => {
    activityStackMiddleware(context);

    context.activityStack.reset();
    context.activityStack.push("/one");
    context.activityStack.push("/two");
    const response = context.activityStack.pop();

    expect(response!.status).toBe(302);
    expect(response!.headers.get("location")).toBe("/two");
  });

  it("ignores requests outside of the activity stack", () => {
    activityStackMiddleware(context);

    context.activityStack.reset();
    context.activityStack.push("/one");
    context.activityStack.push("/two");

    context = {
      ...context,
      url: new URL("http://example.com/not-in-stack"),
    };
    activityStackMiddleware(context);

    const response = context.activityStack.pop();

    expect(response!).toBeUndefined();
  });
});
