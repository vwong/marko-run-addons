import { cloneDeep } from "lodash-es";
import { badRequest, noContent } from "./responses";
import type { ValidationCheck } from "./validateInit";

export interface ValidateBodySession {
  _lastBody?: unknown;
  _lastBodyErrors?: ValidationCheck[];
}

export const validateBody =
  <S>(schema: S): MarkoRun.Handler =>
  async (context) => {
    context.bodyErrors = context.validator.asJson(
      context.body && schema
        ? await context.validator.validate(context, schema, context.body)
        : [],
    );

    if (context.request.headers.has("X-Validate-Only")) {
      if (context.bodyErrors.length) {
        return badRequest(context.bodyErrors);
      } else {
        return noContent();
      }
    }

    if (context.bodyErrors.length) {
      context.session._lastBody = cloneDeep(context.body);
      context.session._lastBodyErrors = context.bodyErrors;
      return context.redirect(context.url.pathname);
    }
  };

declare module "@marko/run" {
  interface Context {
    bodyErrors: ValidationCheck[];
    lastBody?: unknown;
    lastBodyErrors: ValidationCheck[];
  }
}
