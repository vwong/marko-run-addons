import { CsrfService } from "./csrf";
import { FlashService } from "./flash";
import { Session } from "./session";
import type { ValidationCheck } from "./validation";

export { CsrfService, csrf } from "./csrf";
export type { CsrfSession, CsrfOptions } from "./csrf";
export { FlashService, flash } from "./flash";
export type { FlashMessage, FlashSession } from "./flash";
export { session } from "./session";
export { requestParser } from "./requestParser";
export type { Session, SessionStore, SessionOptions } from "./session";
export { validate } from "./validation";
export type { ValidationCheck, Validator, ValidateOptions } from "./validation";

declare module "@marko/run" {
  interface Context {
    body?: unknown;
    bodyErrors: ValidationCheck[];
    csrf: CsrfService;
    flash: FlashService;
    form?: string;
    lastBody?: unknown;
    lastBodyErrors: ValidationCheck[];
    lastQuery?: unknown;
    lastQueryErrors: ValidationCheck[];
    query?: unknown;
    queryErrors: ValidationCheck[];
    session: Session;
  }
}
