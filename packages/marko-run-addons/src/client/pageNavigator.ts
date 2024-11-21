export interface PageNavigatorOptions {
  pageChange: (p: number | string) => void;
  page: number | string;
}

export class PageNavigator {
  #pageChange: (p: number | string) => void;

  constructor(options: PageNavigatorOptions) {
    this.#pageChange = options.pageChange;

    if (globalThis.history) {
      globalThis.history.replaceState({ page: options.page }, "");
      globalThis.addEventListener("popstate", (event: PopStateEvent) => {
        this.#pageChange(event.state!.page);
      });
    }
  }

  gotoPage(page: number | string) {
    return (event: Event) => {
      event.preventDefault();

      const { href } = event.target as HTMLLinkElement;
      globalThis.history.pushState({ page }, "", href);
      this.#pageChange(page);
    };
  }
}
