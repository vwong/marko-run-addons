interface Page {
  href: string;
  text: string;
  contents?: Page[];
}

export const contents: Page[] = [
  { href: "/docs", text: "Introduction" },
  { href: "/docs/session", text: "Session Management" },
  {
    href: "/docs/validation",
    text: "Validation",
    contents: [
      { href: "/docs/validation/search-params", text: "Search Params" },
      { href: "/docs/validation/request-body", text: "Request Body" },
    ],
  },
  {
    href: "/docs/subpages",
    text: "Subpage navigation",
    contents: [
      { href: "/docs/subpages/pagination", text: "Pagination" },
      { href: "/docs/subpages/tabbed-interface", text: "Tabbed interface" },
      { href: "/docs/subpages/read", text: "Reading Subpage Frames" },
      {
        href: "/docs/subpages/write",
        text: "Modifying Subpage Frames",
      },
    ],
  },
  { href: "/docs/hosting", text: "Hosting" },
  { href: "/docs/enhancements", text: "Enhancements" },
];

export const flatContents = contents
  .map((c) => {
    const { contents, ...others } = c;
    return contents ? [others, ...contents] : c;
  })
  .flat()
  .filter((c) => c.href);
