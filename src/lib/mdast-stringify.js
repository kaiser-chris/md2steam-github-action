"use strict";
// see https://github.com/syntax-tree/mdast-util-to-hast/tree/8.2.0 and
// https://github.com/syntax-tree/hast-util-to-html/tree/7.1.0 and
// https://github.com/remarkjs/remark/tree/remark-stringify%408.0.0/packages/remark-stringify
exports.__esModule = true;
// block content helper
var block = function (tag) { return function (node) {
    return "[".concat(tag, "]\n").concat(all(node), "[/").concat(tag, "]\n");
}; };
// inline content helper
var inline = function (tag) { return function (node) {
    return "[".concat(tag, "]").concat(all(node), "[/").concat(tag, "]");
}; };
var paragraph = function (node, prev) {
    // `Paragraph should not be adjacent to each other
    return "".concat(prev === "paragraph" ? "\n" : "").concat(all(node), "\n");
};
var heading = function (node) {
    // steam does not support `[h4]` or below
    var depth = node.depth < 3 ? node.depth : 3;
    // `Heading` children are only inline content, so line breaks should be at the end only
    return "[h".concat(depth, "]").concat(all(node), "[/h").concat(depth, "]\n");
};
var list = function (node) {
    return block(node.ordered ? "olist" : "list")(node);
};
var listItem = function (node) {
    // `ListItem` is a wrapper and has only one child content
    // if child content is `Code`, skip it
    return node.children[0].children ? "[*]".concat(all(node.children[0]), "\n") : "";
};
// see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.2.0/lib/handlers/table.js
var table = function (node) {
    // `TableRow` and `Table` are block contents
    var tableRows = node.children.map(function (tr, i) {
        var tableCells = tr.children.map(inline(i === 0 ? "th" : "tb"));
        return "[tr]\n".concat(tableCells.join("\n"), "\n[/tr]\n");
    });
    return "[table]\n".concat(tableRows.join(""), "[/table]\n");
};
var code = function (node) { return "[code]\n".concat(node.value, "\n[/code]\n"); };
var text = function (node) { return node.value; };
var link = function (node) {
    // to support widget generation when the URL is directly pasted
    return node.children[0].value === node.url
        ? node.url
        : "[url=".concat(node.url, "]").concat(all(node), "[/url]");
};
// see https://github.com/syntax-tree/mdast/tree/684631f
var visitors = {
    // block contents
    root: all,
    paragraph: paragraph,
    heading: heading,
    blockquote: block("quote"),
    list: list,
    listItem: listItem,
    table: table,
    code: code,
    // inline contents
    text: text,
    emphasis: inline("i"),
    strong: inline("b"),
    "delete": inline("strike"),
    link: link
};
function one(node, prev) {
    var visitor = visitors[node.type];
    return visitor ? visitor(node, prev) : "";
}
function all(parent) {
    return (parent.children
        // you can also pass `parent` and `index` if necessary
        // see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.1.0/lib/all.js#L16
        // and https://github.com/syntax-tree/hast-util-to-html/blob/7.1.0/lib/all.js#L15
        .map(function (node, i) { return one(node, i === 0 ? null : parent.children[i - 1].type); })
        .join(""));
}
// see https://github.com/unifiedjs/unified/tree/9.0.0#processorcompiler
function stringify() {
    // `all()` can be substituted, but usually the function based on `one()` is used
    // see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.1.0/lib/index.js#L101
    // and https://github.com/syntax-tree/hast-util-to-html/blob/7.1.0/lib/index.js#L47
    this.Compiler = function (node) { return one(node, null); };
}
exports["default"] = stringify;
