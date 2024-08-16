import { badRequest, noContent, redirect } from "./responses";

const isValidateOnly = (request: Request): boolean =>
  request.headers.get("X-Validate-Only") === "true";

export interface ValidationChecks {
  name: string;
  message: string;
}

export abstract class Validator<E, S> {
  abstract validate(
    context: MarkoRun.Context,
    schema: S,
    data: unknown,
  ): Promise<E[]>;
  abstract asJson(errors: E[]): ValidationChecks[];
  abstract asHtml(errors: E[]): string;
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
  async (context) => {
    const meta = context.meta as Meta;

    const errors = (
      await Promise.all(
        [
          context.query &&
            meta.schema?.query &&
            validator.validate(context, meta.schema.query as S, context.query),
          context.body &&
            meta.schema?.body &&
            validator.validate(context, meta.schema.body as S, context.body),
        ].filter(Boolean),
      )
    ).flat() as E[];

    if (isValidateOnly(context.request)) {
      if (errors.length) {
        return badRequest(validator.asJson(errors));
      } else {
        return noContent();
      }
    }

    if (errors.length) {
      context.flash.error(validator.asHtml(errors));
      return redirect(context.url.pathname);
    }
  };
