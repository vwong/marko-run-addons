/*
  WARNING: This file is automatically generated and any changes made to it will be overwritten without warning.
  Do NOT manually edit this file or your changes will be lost.
*/

import { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform } from "@marko/run/namespace";
import type * as Run from "@marko/run";
import type { NodePlatformInfo } from '@marko/run-adapter-node'

declare module "@marko/run" {
	interface Platform extends NodePlatformInfo {}

	interface AppData extends Run.DefineApp<{
		routes: {
			"/": Routes["/"];
			"/docs": Routes["/docs"];
			"/docs/enhancements": Routes["/docs/enhancements"];
			"/docs/hosting": Routes["/docs/hosting"];
			"/docs/session": Routes["/docs/session"];
			"/docs/subpages": Routes["/docs/subpages"];
			"/docs/subpages/pagination": Routes["/docs/subpages/pagination"];
			"/docs/subpages/pagination/%5fsearch": Routes["/docs/subpages/pagination/%5fsearch"];
			"/docs/subpages/read": Routes["/docs/subpages/read"];
			"/docs/subpages/read/%5frandom": Routes["/docs/subpages/read/%5frandom"];
			"/docs/subpages/tabbed-interface": Routes["/docs/subpages/tabbed-interface"];
			"/docs/subpages/tabbed-interface/%5ftab-1": Routes["/docs/subpages/tabbed-interface/%5ftab-1"];
			"/docs/subpages/tabbed-interface/%5ftab-2": Routes["/docs/subpages/tabbed-interface/%5ftab-2"];
			"/docs/subpages/tabbed-interface/%5ftab-3": Routes["/docs/subpages/tabbed-interface/%5ftab-3"];
			"/docs/subpages/write": Routes["/docs/subpages/write"];
			"/docs/subpages/write/%5frandom": Routes["/docs/subpages/write/%5frandom"];
			"/docs/validation": Routes["/docs/validation"];
			"/docs/validation/request-body": Routes["/docs/validation/request-body"];
			"/docs/validation/search-params": Routes["/docs/validation/search-params"];
		}
	}> {}
}

declare module "../src/routes/+handler" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/session/+handler" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/session"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/write/%5frandom+handler" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/write/%5frandom"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/validation/request-body+handler" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/validation/request-body"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/+middleware" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/" | "/docs" | "/docs/enhancements" | "/docs/hosting" | "/docs/session" | "/docs/subpages" | "/docs/subpages/pagination" | "/docs/subpages/pagination/%5fsearch" | "/docs/subpages/read" | "/docs/subpages/read/%5frandom" | "/docs/subpages/tabbed-interface" | "/docs/subpages/tabbed-interface/%5ftab-1" | "/docs/subpages/tabbed-interface/%5ftab-2" | "/docs/subpages/tabbed-interface/%5ftab-3" | "/docs/subpages/write" | "/docs/subpages/write/%5frandom" | "/docs/validation" | "/docs/validation/request-body" | "/docs/validation/search-params"];
    export type Context = Run.MultiRouteContext<Route>;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/enhancements/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/enhancements"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/hosting/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/hosting"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/session/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/session"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/pagination/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/pagination"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/pagination/%5fsearch+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/pagination/%5fsearch"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/read/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/read"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/read/%5frandom+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/read/%5frandom"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/tabbed-interface/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/tabbed-interface"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/tabbed-interface/%5ftab-1+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/tabbed-interface/%5ftab-1"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/tabbed-interface/%5ftab-2+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/tabbed-interface/%5ftab-2"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/tabbed-interface/%5ftab-3+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/tabbed-interface/%5ftab-3"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/write/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/write"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/subpages/write/%5frandom+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/subpages/write/%5frandom"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/validation/+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/validation"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/validation/request-body+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/validation/request-body"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

declare module "../src/routes/docs/validation/search-params+page.marko" {
  namespace MarkoRun {
    export { NotHandled, NotMatched, GetPaths, PostPaths, GetablePath, GetableHref, PostablePath, PostableHref, Platform };
    export type Route = Run.Routes["/docs/validation/search-params"];
    export type Context = Run.MultiRouteContext<Route> & Marko.Global;
    export type Handler = Run.HandlerLike<Route>;
    /** @deprecated use `((context, next) => { ... }) satisfies MarkoRun.Handler` instead */
    export const route: Run.HandlerTypeFn<Route>;
  }
}

type Routes = {
	"/": { verb: "get"; };
	"/docs": { verb: "get"; };
	"/docs/enhancements": { verb: "get"; };
	"/docs/hosting": { verb: "get"; };
	"/docs/session": { verb: "get"; };
	"/docs/subpages": { verb: "get"; };
	"/docs/subpages/pagination": { verb: "get"; meta: typeof import("../src/routes/docs/subpages/pagination/+meta")["default"]; };
	"/docs/subpages/pagination/%5fsearch": { verb: "get"; meta: typeof import("../src/routes/docs/subpages/pagination/%5fsearch+meta")["default"]; };
	"/docs/subpages/read": { verb: "get"; };
	"/docs/subpages/read/%5frandom": { verb: "get"; };
	"/docs/subpages/tabbed-interface": { verb: "get"; meta: typeof import("../src/routes/docs/subpages/tabbed-interface/+meta")["default"]; };
	"/docs/subpages/tabbed-interface/%5ftab-1": { verb: "get"; };
	"/docs/subpages/tabbed-interface/%5ftab-2": { verb: "get"; };
	"/docs/subpages/tabbed-interface/%5ftab-3": { verb: "get"; };
	"/docs/subpages/write": { verb: "get"; };
	"/docs/subpages/write/%5frandom": { verb: "get" | "post"; };
	"/docs/validation": { verb: "get"; };
	"/docs/validation/request-body": { verb: "get" | "post"; meta: typeof import("../src/routes/docs/validation/request-body+meta")["default"]; };
	"/docs/validation/search-params": { verb: "get"; meta: typeof import("../src/routes/docs/validation/search-params+meta")["default"]; };
}
