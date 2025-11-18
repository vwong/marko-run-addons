export interface ActivityStackSession {
  _activityStack?: string[];
}

interface ActivityStackServiceOptions {
  currentUrl: string;
  session: ActivityStackSession;
}

export class ActivityStackService {
  readonly #currentUrl: string;
  readonly #session: ActivityStackSession;

  constructor({ currentUrl, session }: ActivityStackServiceOptions) {
    this.#currentUrl = currentUrl;
    this.#session = session;
    this.#session._activityStack ||= [];
  }

  reset() {
    this.#session._activityStack = [];
  }

  push(activity: string) {
    this.#session._activityStack!.push(activity);
  }

  pop(): Response | undefined {
    if (this.#currentUrl === this.top) {
      this.#session._activityStack!.pop();
    }

    if (this.top) {
      return new Response(null, {
        status: 302,
        headers: { location: this.top },
      });
    }
  }

  get top(): string | undefined {
    return this.#session._activityStack![
      this.#session._activityStack!.length - 1
    ];
  }

  toString(): string {
    return this.#session._activityStack!.join(",");
  }
}

export const activityStack = (): MarkoRun.Handler => (context) => {
  context.activityStack = new ActivityStackService({
    currentUrl: context.url.pathname + context.url.search,
    session: context.session,
  });
};

declare module "@marko/run" {
  interface Context {
    activityStack: ActivityStackService;
  }
}
