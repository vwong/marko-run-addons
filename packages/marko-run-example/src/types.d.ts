declare module "@marko/run" {
  interface Context {
    componentIdPrefix: string;
    cspNonce: string;
    isXHR: boolean;
  }
}

declare module "@vwong/marko-run-addons/server" {
  interface Session {
    count: number;
  }
}

export {}; /* make this a module */
