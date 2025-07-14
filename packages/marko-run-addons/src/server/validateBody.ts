import { cloneDeep } from "lodash-es";
import { badRequest, noContent } from "./responses";
import type { ValidationCheck } from "./validateInit";

export interface ValidateBodySession {
  _lastBody?: unknown;
  _lastBodyErrors?: ValidationCheck[];
}

export const validateBody =
  <S>(schema: S): MarkoRun.Handler =>
  async (context, next) => {
    context.bodyErrors = context.validator.asJson(
      context.body && schema
        ? await context.validator.validate(context, schema, context.body)
        : [],
    );

    if (context.request.headers.has("X-Validate-Only")) {
      return context.bodyErrors.length
        ? badRequest(context.bodyErrors)
        : noContent();
    }

    const response = context.bodyErrors.length
      ? context.redirect(context.url.pathname)
      : await next();

    if (response.status === 302) {
      context.session._redirectTo = response.headers.get("location") as string;
      context.session._lastBody = cloneDeep(context.body);
      context.session._lastBodyErrors = context.bodyErrors;
    }

    return response;
  };

declare module "@marko/run" {
  interface Context {
    bodyErrors: ValidationCheck[];
    lastBody?: unknown;
    lastBodyErrors: ValidationCheck[];
  }
}
