const { createParser } = require("htmljs-parser");

let isInStyleTag;
let lastLine;
let preprocessor;
let style;
let api;

const parser = createParser({
  onOpenTagName(range) {
    if (parser.read(range) !== "style") {
      return;
    }

    const loc = parser.locationAt(range);
    isInStyleTag = true;
    style += "\n".repeat(loc.start.line - lastLine);
  },

  onTagShorthandClass(range) {
    if (!isInStyleTag) {
      return;
    }

    if (!preprocessor) {
      preprocessor = parser.read(range);
      return;
    }

    if (preprocessor !== parser.read(range)) {
      throw new Error("Support only a single preprocessor per file.");
    }
  },

  onText(range) {
    if (!isInStyleTag) {
      return;
    }

    const loc = parser.locationAt(range);
    isInStyleTag = false;
    lastLine = loc.end.line;
    style += parser.read(range);
    api = "tags";
  },

  onAttrName(range) {
    if (!isInStyleTag) {
      return;
    }

    const loc = parser.locationAt(range);
    isInStyleTag = false;
    lastLine = loc.end.line;
    style += parser.read(range);
    api = "class";
  },
});

function extract(code) {
  isInStyleTag = false;
  lastLine = 0;
  preprocessor = "";
  style = "";
  parser.parse(code);
  return [style, preprocessor.slice(1)];
}

module.exports = {
  parse: function (code, { from }) {
    let [style, preprocessor] = extract(code);
    if (api === "class") {
      style = style
        .split("\n")
        .map((s) => s.replaceAll(/^[{}]$/g, ""))
        .join("\n");
    }
    const plugin = ["postcss", preprocessor].filter(Boolean).join("-");
    const parser = require(plugin);
    return parser.parse(style, { from });
  },
  stringify: function () {},
};
