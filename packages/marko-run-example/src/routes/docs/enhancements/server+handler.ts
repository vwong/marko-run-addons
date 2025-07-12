import { preventUnhandledRejections } from "#lib/promises";

export interface Loader {
  promise1: Promise<void>;
  promise2: Promise<void>;
}

const resolveAfter = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));

const rejectAfter = (duration: number): Promise<void> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("boom")), duration),
  );

export const GET = [
  (context) => {
    const promise1 = resolveAfter(5000);
    const promise2 = rejectAfter(3000);
    const rejection = Promise.reject(new Error("catch me if you can"));

    preventUnhandledRejections(promise1, promise2, rejection);

    context.loader = {
      promise1,
      promise2,
    } as Loader;
  },
] as MarkoRun.Handler[];
