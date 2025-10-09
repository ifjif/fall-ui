import mkContainer from "markdown-it-container";
import type Token from "markdown-it/lib/token.mjs";
import { resolve } from "path";
import fs from "fs";

function createDemoContainer(md: any) {
  md.use(mkContainer, "demo", {
    render(tokens: Token[], idx: number) {
      if (tokens[idx].nesting === 1) {
        const info = tokens[idx].info;
        const description = info.replace(/^demo\s+/g, "");
        const nextTokens = tokens[idx + 1];
        let componentPath = nextTokens.type === "fence"
          ? nextTokens.content
          : "";
        componentPath = componentPath.trim().replace(/^\s+/g, "");
        let source = "";
        if (componentPath) {
          const file = resolve(
            __dirname,
            "../../examples",
            `${componentPath}.vue`,
          );
          source = fs.readFileSync(file, "utf-8");
        }

        return `<Demo path="${componentPath}">
                <template #description>
                    ${description}
                </template>
                <template #source>
                  <pre><code class="language-html">${md.utils.escapeHtml(source)
          }</code></pre>
                </template>
`;
      } else {
        return `</Demo>`;
      }
    },
  });
}

export { createDemoContainer };
