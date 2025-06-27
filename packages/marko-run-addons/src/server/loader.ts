interface Loader {
  [key: string]: Promise<unknown>;
}

interface Meta {
  load?: (context: MarkoRun.Context) => Loader;
}

export const loader = (): MarkoRun.Handler => (context) => {
  const { load } = context.meta as Meta;

  context.loader = load?.(context) || {};
};

declare module "@marko/run" {
  interface Context {
    loader: Loader;
  }
}
