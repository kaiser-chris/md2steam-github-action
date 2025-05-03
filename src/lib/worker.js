"use strict";
// see https://github.com/GoogleChromeLabs/comlink-loader/tree/2.0.0#singleton-mode
/* eslint-disable @typescript-eslint/require-await */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.convert = void 0;
var remark_parse_1 = __importDefault(require("remark-parse"));
var unified_1 = __importDefault(require("unified"));
var mdast_stringify_1 = __importDefault(require("./mdast-stringify"));
function convert(markdown) {
    var mdast = (0, unified_1["default"])()
        .use(remark_parse_1["default"])
        .parse(markdown);
    return (0, unified_1["default"])().use(mdast_stringify_1["default"]).stringify(mdast);
}
exports.convert = convert;
