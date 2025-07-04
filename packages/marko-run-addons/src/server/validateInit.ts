export interface ValidationCheck {
  name: string;
  message: string;
}

export abstract class Validator<E, S> {
  abstract validate(
    context: MarkoRun.Context,
    schema: S,
    data: unknown,
  ): Promise<E[]>;
  abstract asJson(errors: E[]): ValidationCheck[];
}

export const validateInit =
  <E, S>(validator: Validator<E, S>): MarkoRun.Handler =>
  (context) => {
    context.validator = validator;

    context.lastBodyErrors = [];

    // restore query params errors if being redirected
    if (
      context.request.method === "GET" &&
      (context.session._redirectTo === context.url.href || // full path
        context.session._redirectTo === context.url.pathname) // relative path
    ) {
      context.lastQuery = context.session._lastQuery;
      context.lastQueryErrors = context.session._lastQueryErrors || [];

      delete context.session._redirectTo;
      delete context.session._lastQuery;
      delete context.session._lastQueryErrors;
    } else {
      context.lastQueryErrors = [];
    }
  };

declare module "@marko/run" {
  interface Context {
    validator: Validator<unknown, unknown>;
  }
}
