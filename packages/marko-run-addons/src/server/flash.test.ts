import { beforeEach, describe, expect, it } from "vitest";
import { flash } from "./flash";

type CallableHandler = (context: MarkoRun.Context) => Promise<void>;

describe("flash", () => {
  let flashMiddleware: CallableHandler;
  let context: MarkoRun.Context;

  describe("initialised session", () => {
    beforeEach(() => {
      context = {
        session: {
          _flash: [{ status: "success", message: "previous" }],
        },
      } as MarkoRun.Context;
      flashMiddleware = flash() as unknown as CallableHandler;
    });

    it("shows previous messages", async () => {
      await flashMiddleware(context);

      expect(context.flash.current).toEqual([
        { status: "success", message: "previous" },
      ]);
    });

    it("clears previous messages", async () => {
      await flashMiddleware(context);

      expect(context.flash.next).toEqual([]);
    });

    it("sets new messages", async () => {
      await flashMiddleware(context);

      context.flash.error("error-message");
      context.flash.information("information-message");
      context.flash.success("success-message");
      context.flash.warning("warning-message");

      expect(context.flash.next).toEqual([
        expect.objectContaining({ status: "error", message: "error-message" }),
        expect.objectContaining({
          status: "information",
          message: "information-message",
        }),
        expect.objectContaining({
          status: "success",
          message: "success-message",
        }),
        expect.objectContaining({
          status: "warning",
          message: "warning-message",
        }),
      ]);
    });
  });

  describe("uninitialised session", () => {
    beforeEach(() => {
      context = {
        session: {},
      } as MarkoRun.Context;
      flashMiddleware = flash() as unknown as CallableHandler;
    });

    it("correctly initialises", async () => {
      await flashMiddleware(context);

      expect(context.flash.next).toEqual([]);
    });
  });
});
