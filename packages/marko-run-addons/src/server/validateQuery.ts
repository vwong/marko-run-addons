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
  async (context) => {
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

    if (context.queryErrors.length) {
      // redirect to same path, but without query parameters
      // remember the errors for reuse
      context.session._redirectTo = context.url.pathname;
      context.session._lastQuery = cloneDeep(context.query);
      context.session._lastQueryErrors = context.queryErrors;
      return context.redirect(context.url.pathname);
    }
  };

declare module "@marko/run" {
  interface Context {
    lastQuery?: unknown;
    lastQueryErrors: ValidationCheck[];
    queryErrors: ValidationCheck[];
  }
}
