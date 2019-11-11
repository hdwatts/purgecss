import e from "postcss";
import {
  PurgeCSS as s,
  mergeExtractorSelectors as t,
  defaultOptions as o
} from "purgecss";
const r = e.plugin("postcss-plugin-purgecss", function(e) {
  return async function(r, c) {
    const n = new s(),
      p = { ...o, ...e };
    n.options = p;
    const { content: i, extractors: m } = p,
      a = i.filter(e => "string" == typeof e),
      l = i.filter(e => "object" == typeof e),
      u = await n.extractSelectorsFromFiles(a, m),
      f = n.extractSelectorsFromString(l, m),
      g = t(u, f);
    n.walkThroughCSS(r, g),
      n.options.fontFace && n.removeUnusedFontFaces(),
      n.options.keyframes && n.removeUnusedKeyframes(),
      n.options.rejected &&
        n.selectorsRemoved.size > 0 &&
        (c.messages.push({
          type: "purgecss",
          plugin: "postcss-purgecss",
          text: `purging ${
            n.selectorsRemoved.size
          } selectors:\n        ${Array.from(n.selectorsRemoved)
            .map(e => e.trim())
            .join("\n  ")}`
        }),
        n.selectorsRemoved.clear());
  };
});
export default r;
