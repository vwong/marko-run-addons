interface Meta {
  load?: (context: MarkoRun.Context) => unknown;
}

export const loader = (): MarkoRun.Handler => (context) => {
  const { load } = context.meta as Meta;

  context.loader = load?.(context) || {};
};
