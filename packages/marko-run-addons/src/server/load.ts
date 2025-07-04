export const load =
  <T>(
    name: string,
    loader: (context: MarkoRun.Context) => Promise<T>,
  ): MarkoRun.Handler =>
  (context) => {
    context.loader ||= {};
    context.loader[name] = loader(context);
  };

declare module "@marko/run" {
  interface Context {
    loader: Record<string, Promise<unknown> | undefined>;
  }
}
