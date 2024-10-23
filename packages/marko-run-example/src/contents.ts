export const contents = [
  { href: "/", text: "Home" },
  { href: "/session", text: "Session Management" },
  {
    href: undefined,
    text: "Validation",
    contents: [
      { href: "/search-params", text: "Search Params" },
      { href: "/request-body", text: "Request Body" },
    ],
  },
  {
    href: "/subpage-frames",
    text: "Subpage navigation",
    contents: [
      { href: "/modifying-subpage-frames", text: "Modifying Subpage Frames" },
      { href: "/reading-subpage-frames", text: "Reading Subpage Frames" },
      { href: "/pagination", text: "Pagination" },
    ],
  },
];

export const flatContents = contents
  .map((c) => {
    const { contents, ...others } = c;
    return contents ? [others, ...contents] : c;
  })
  .flat()
  .filter((c) => c.href);
