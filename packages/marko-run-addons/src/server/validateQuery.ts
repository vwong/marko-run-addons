import { cloneDeep } from "lodash-es";
import { badRequest } from "./responses";
import type { ValidationCheck } from "./validateInit";

export interface ValidateQuerySession {
  _redirectTo?: string;
  _lastQuery?: unknown;
  _lastQueryErrors?: ValidationCheck[];
}

export const validateQuery =
  <S>(schema: S): MarkoRun.Handler =>
  async (context, next) => {
    context.queryErrors = context.validator.asJson(
      context.query && schema
        ? await context.validator.validate(context, schema, context.query)
        : [],
    );

    if (
      context.request.headers.has("X-Validate-Only") &&
      context.queryErrors.length
    ) {
      return badRequest(context.queryErrors);
    }

    const response = context.queryErrors.length
      ? context.redirect(context.url.pathname)
      : await next();

    if (response.status === 302) {
      context.session._redirectTo = context.url.pathname;
      context.session._lastQuery = cloneDeep(context.query);
      context.session._lastQueryErrors = context.queryErrors;
    }

    return response;
  };

declare module "@marko/run" {
  interface Context {
    lastQuery?: unknown;
    lastQueryErrors: ValidationCheck[];
    queryErrors: ValidationCheck[];
  }
}
