"use strict";
function _interopDefault(e) {
  return e && "object" == typeof e && "default" in e ? e.default : e;
}
var parse5 = _interopDefault(require("parse5")),
  htmlparser2 = require("parse5-htmlparser2-tree-adapter");
const getSelectorsInElement = e => {
    const t = [],
      r = e.name;
    return (
      e.attribs.class && t.push(...e.attribs.class.split(" ")),
      e.attribs.id && t.push(...e.attribs.id.split(" ")),
      [...getSelectorsInNodes(e), ...t, r]
    );
  },
  getSelectorsInNodes = e => {
    const t = [];
    for (const r of e.children) {
      const e = r;
      switch (e.type) {
        case "tag":
          t.push(...getSelectorsInElement(e));
          break;
        case "root":
          t.push(...getSelectorsInNodes(e));
      }
    }
    return t;
  },
  purgecssFromHtml = e => {
    const t = parse5.parse(e, { treeAdapter: htmlparser2 });
    return getSelectorsInNodes(t);
  };
module.exports = purgecssFromHtml;
