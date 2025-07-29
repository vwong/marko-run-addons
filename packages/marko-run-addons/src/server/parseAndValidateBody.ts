import qs, { type IParseOptions } from "qs";
import { badRequest, noContent } from "./responses";
import type { ValidationCheck } from "./validateInit";

export interface ValidateBodySession {
  _lastBody?: unknown;
  _lastBodyErrors?: ValidationCheck[];
}

export const parseAndValidateBody =
  <S>(schema: S, options: IParseOptions): MarkoRun.Handler =>
  async (context, next) => {
    const body = qs.parse(context.form, options);

    const bodyErrors = context.validator.asJson(
      body && schema
        ? await context.validator.validate(context, schema, body)
        : [],
    );

    if (context.request.headers.has("X-Validate-Only")) {
      return bodyErrors.length
        ? badRequest(bodyErrors)
        : noContent();
    }

    const response = bodyErrors.length
      ? context.redirect(context.url.pathname)
      : await next();

    if (response.status === 302) {
      context.session._redirectTo = response.headers.get("location") as string;
      context.session._lastBody = body;
      context.session._lastBodyErrors = bodyErrors;
    }

    return response;
  };
