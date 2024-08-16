import Ajv, { ValidationError } from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import type { ErrorObject, SchemaObject } from "ajv";
import type { Validator } from "@vwong/marko-run-addons/server";

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
});
addFormats(ajv);
ajvErrors(ajv);

export class AjvValidator implements Validator<ErrorObject, SchemaObject> {
  async validate(
    context: MarkoRun.Context,
    schema: SchemaObject,
    data: unknown,
  ): Promise<ErrorObject[]> {
    const schemaId = `${context.request.method} ${context.route}`;
    let validate = ajv.getSchema(schemaId);
    if (!validate) {
      ajv.addSchema(schema, schemaId);
      validate = ajv.getSchema(schemaId);
    }

    if (schema.$async) {
      return (validate!.call(context, data) as unknown as Promise<void>)
        .then(function () {
          return [] as ErrorObject[];
        })
        .catch(function (err: Error) {
          if (!(err instanceof ValidationError)) {
            throw err;
          }
          return err.errors as ErrorObject[];
        });
    } else {
      const valid = validate!(data);
      return valid ? [] : validate!.errors!;
    }
  }

  asJson(errors: ErrorObject[]) {
    return errors.map(({ instancePath, message }) => {
      const name = instancePath
        .substring(1)
        .split("/")
        .map((value, index) => (index === 0 ? value : `[${value}]`))
        .join("");

      return {
        name,
        message: message as string,
      };
    });
  }

  asHtml(errors: ErrorObject[]): string {
    return `<code><pre>${JSON.stringify(errors, null, 2)}</pre></code>`;
  }
}
