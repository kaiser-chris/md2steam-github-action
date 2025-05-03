// see https://github.com/GoogleChromeLabs/comlink-loader/tree/2.0.0#singleton-mode
/* eslint-disable @typescript-eslint/require-await */

import parse from "remark-parse";
import unified from "unified";
import mdastStringify from "./mdast-stringify";

function convert(markdown: string): string {
  const mdast = unified()
    .use(parse)
    .parse(markdown);

  return unified().use(mdastStringify).stringify(mdast);
}

export { convert };
