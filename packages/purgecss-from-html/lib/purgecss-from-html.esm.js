import t from "parse5";
import * as r from "parse5-htmlparser2-tree-adapter";
const s = t => {
    const r = [],
      s = t.name;
    return (
      t.attribs.class && r.push(...t.attribs.class.split(" ")),
      t.attribs.id && r.push(...t.attribs.id.split(" ")),
      [...e(t), ...r, s]
    );
  },
  e = t => {
    const r = [];
    for (const a of t.children) {
      const t = a;
      switch (t.type) {
        case "tag":
          r.push(...s(t));
          break;
        case "root":
          r.push(...e(t));
      }
    }
    return r;
  };
export default s => {
  const a = t.parse(s, { treeAdapter: r });
  return e(a);
};
