// see https://jakearchibald.com/2023/unhandled-rejections/
// a promise rejection is considered handled if there is at least one promise chain that handles it
// so, we add a catch to these loaders to avoid crashing node.js
export function preventUnhandledRejections(...promises: Promise<unknown>[]) {
  for (const promise of promises) promise.catch(() => {});
}
