import a from "pug-lexer";
export default e => {
  const s = a(e),
    t = [];
  for (const a of s)
    switch (a.type) {
      case "tag":
      case "id":
      case "class":
        t.push(a.val);
        break;
      case "attribute":
        ("class" !== a.name && "id" !== a.name) ||
          t.push(a.mustEscape ? a.val.replace(/"/g, "") : a.val);
    }
  return t;
};
