export interface ActivityStackSession {
  _activityStack?: string[];
  _lastActivity?: string;
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
  }

  reset() {
    this.#session._activityStack = [this.#currentUrl];
    this.#session._lastActivity = this.#currentUrl;
  }

  push(activity: string) {
    this.#session._activityStack!.push(activity);
  }

  pop(): Response | undefined {
    if (this.#session._lastActivity !== this.#currentUrl) {
      // protect against non-stack activity
      return;
    }

    const nextUrl = this.#session._activityStack!.pop() as string;
    this.#session._lastActivity = nextUrl;
    if (nextUrl === this.#currentUrl) {
      return;
    } else {
      return new Response(null, {
        status: 302,
        headers: { location: nextUrl },
      });
    }
  }
}

export const activityStack = (): MarkoRun.Handler => (context) => {
  context.activityStack = new ActivityStackService({
    currentUrl: context.url.pathname + context.url.search,
    session: context.session,
  });
};
