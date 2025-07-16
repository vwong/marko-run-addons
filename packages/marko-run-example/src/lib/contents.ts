export interface Page {
  href: string;
  text: string;
  contents?: Page[];
}

const contents: Page[] = [
  { href: "/docs", text: "Introduction" },
  {
    href: "/docs/session",
    text: "Session Management",
    contents: [
      { href: "/docs/session/activity-stack", text: "Activity Stack" },
      { href: "/docs/session/frecency", text: "Frecency" },
    ],
  },
  {
    href: "/docs/validation",
    text: "Validation",
    contents: [
      { href: "/docs/validation/search-params", text: "Search Params" },
      { href: "/docs/validation/request-body", text: "Request Body" },
    ],
  },
  {
    href: "/docs/frames",
    text: "Frames",
  },
  {
    href: "/docs/dynamic-content",
    text: "Dynamic Content",
  },
  { href: "/docs/hosting", text: "Hosting" },
  {
    href: "/docs/enhancements",
    text: "Enhancements",
    contents: [
      { href: "/docs/enhancements/server", text: "Server enhancements" },
    ],
  },
  { href: "/docs/design", text: "Design" },
];

export class Contents {
  #cache?: Page[];
  toc = contents;

  related(href: string) {
    const index = this.#flatToc.findIndex((c) => c.href === href);
    const previous = index >= 0 ? this.#flatToc[index - 1] : undefined;
    const next =
      index <= this.#flatToc.length - 1 ? this.#flatToc[index + 1] : undefined;
    return [previous, next];
  }

  get #flatToc() {
    return (
      this.#cache ||
      this.toc
        .map((c) => {
          const { contents, ...others } = c;
          return contents ? [others, ...contents] : c;
        })
        .flat()
        .filter((c) => c.href)
    );
  }
}
