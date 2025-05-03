const fs = require('node:fs');
const { argv } = require('node:process');
import { convert } from "./lib/worker";

if (!argv[2]) {
	console.error('Missing Argument: Markdown File');
	process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
fs.readFile(argv[2], 'utf8', (err, data) => {
	if (err) {
		console.error('Could not read Markdown file: ' + err);
		process.exit(1);
	}

	console.log(convert(data));
});