import { cloneDeep } from "lodash-es";
import { badRequest, noContent, redirect } from "./responses";

export interface ValidationCheck {
  name: string;
  message: string;
}

export interface ValidationSession {
  _redirectTo?: string;
  _lastBody?: unknown;
  _lastBodyErrors?: ValidationCheck[];
}

export abstract class Validator<E, S> {
  abstract validate(
    context: MarkoRun.Context,
    schema: S,
    data: unknown,
  ): Promise<E[]>;
  abstract asJson(errors: E[]): ValidationCheck[];
}

export interface ValidateOptions<E, S> {
  validator: Validator<E, S>;
}

interface Meta {
  schema?: {
    body?: unknown;
    query?: unknown;
  };
}

export const validate =
  <E, S>({ validator }: ValidateOptions<E, S>): MarkoRun.Handler =>
  async (context, next) => {
    const meta = context.meta as Meta;
    context.queryErrors = validator.asJson(
      (context.query && meta.schema?.query
        ? await validator.validate(
            context,
            meta.schema.query as S,
            context.query,
          )
        : []) as E[],
    );

    if (
      context.request.headers.has("X-Validate-Only") &&
      context.queryErrors.length
    ) {
      return badRequest(context.queryErrors);
    }

    if (
      context.request.method === "GET" &&
      (context.session._redirectTo === context.url.href || // full path
        context.session._redirectTo === context.url.pathname) // relative path
    ) {
      context.body = context.session._lastBody;
      context.bodyErrors = context.session._lastBodyErrors || [];
      delete context.session._redirectTo;
      delete context.session._lastBody;
      delete context.session._lastBodyErrors;
      return;
    }

    context.bodyErrors = validator.asJson(
      (context.body && meta.schema?.body
        ? await validator.validate(context, meta.schema.body as S, context.body)
        : []) as E[],
    );

    if (context.request.headers.has("X-Validate-Only")) {
      if (context.bodyErrors.length) {
        return badRequest(context.bodyErrors);
      } else {
        return noContent();
      }
    }

    let response;
    if (
      context.request.method === "POST" &&
      (context.queryErrors.length || context.bodyErrors.length)
    ) {
      response = redirect(context.url.pathname);
    } else {
      response = await next();
    }

    if (context.body && response.status === 302) {
      context.session._redirectTo = response.headers.get("location")!;
      context.session._lastBody = cloneDeep(context.body);
      context.session._lastBodyErrors = context.bodyErrors;
    }

    return response;
  };
