interface Loader {
  [key: string]: Promise<unknown>;
}

// FIXME: ideally, this is MarkoRun.Context, but it is not available here
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoaderContext {}

export interface Meta {
  load?: (context: LoaderContext) => Loader;
}

export const loader = (): MarkoRun.Handler => (context) => {
  const { load } = context.meta as Meta;

  context.loader = load?.(context as unknown as LoaderContext) || {};
};

declare module "@marko/run" {
  interface Context {
    loader: Loader;
  }
}
