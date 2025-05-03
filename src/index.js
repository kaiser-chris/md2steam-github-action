"use strict";
exports.__esModule = true;
var fs = require('node:fs');
var argv = require('node:process').argv;
var worker_1 = require("./lib/worker");
if (!argv[2]) {
    console.error('Missing Argument: Markdown File');
    process.exit(1);
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
fs.readFile(argv[2], 'utf8', function (err, data) {
    if (err) {
        console.error('Could not read Markdown file:' + err);
        process.exit(1);
    }
    console.log((0, worker_1.convert)(data));
});
