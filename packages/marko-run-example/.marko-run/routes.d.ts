/*
  WARNING: This file is automatically generated and any changes made to it will be overwritten without warning.
  Do NOT manually edit this file or your changes will be lost.
*/

import { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform } from "@marko/run/namespace";
import type Run from "@marko/run";
import type { NodePlatformInfo } from '@marko/run-adapter-node'

declare module "@marko/run" {
	interface Platform extends NodePlatformInfo {}

	interface AppData extends Run.DefineApp<{
		routes: {
			"/": Routes["/"];
			"/request-body": Routes["/request-body"];
			"/search-params": Routes["/search-params"];
		}
	}> {}
}

declare module "../src/routes/+handler" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/request-body+handler" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/request-body"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/+middleware" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/" | "/request-body" | "/search-params"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/request-body+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/request-body"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/search-params+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/search-params"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/+layout.marko" {
  export interface Input {
    renderBody: Marko.Body;
  }
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/" | "/request-body" | "/search-params"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    export const route: Run.HandlerTypeFn<Route>;
  }
}

type Routes = {
	"/": { verb: "get"; };
	"/request-body": { verb: "get" | "post"; meta: typeof import("../src/routes/request-body+meta")["default"]; };
	"/search-params": { verb: "get"; meta: typeof import("../src/routes/search-params+meta")["default"]; };
}
