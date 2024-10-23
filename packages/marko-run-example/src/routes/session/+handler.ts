export const GET: MarkoRun.Handler[] = [
  (context) => {
    context.session!.count++;
  },
];
