#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const nameArg = args.find(a => a.startsWith('--name='));
if (!nameArg) {
  console.error('Usage: npm run morph:component -- --name=MyComponent');
  process.exit(1);
}
const Name = nameArg.split('=')[1];
if (!/^[A-Z][A-Za-z0-9]+$/.test(Name)) {
  console.error('Component name must be PascalCase (e.g., UserList)');
  process.exit(1);
}

const fileBase = path.resolve('packages/core/src/components');
const filePath = path.join(fileBase, `${Name}.ts`);
if (fs.existsSync(filePath)) {
  console.error(`Component already exists: ${filePath}`);
  process.exit(2);
}

const content = String.raw`import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = Record<string, unknown>;

const ${Name} = ComponentMorph.create<Props>("${Name}", {
  render: ({ slots }) => {
    return ` + "`" + `<div class="${Name}">${Name} component
  <div class="slot-default">${'${slots.default || ""}'}</div>
</div>` + "`" + `;
  },
});

define("${Name}", ${Name});
export default ${Name};
`;

fs.writeFileSync(filePath, content);
console.log(`Created component: ${filePath}`);

// Also scaffold docs and a minimal test placeholder
const docsDir = path.resolve('docs/components');
const docPath = path.join(docsDir, `${Name.toLowerCase()}.md`);
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
const md = `---\ntitle: ${Name}\n---\n\n# ${Name}\n\nLive demo:\n\n<DocsDemo :rows="6" :source="\`<div data-component=\\\"${Name}\\\"></div>\`" />\n\nUsage:\n\n\`\`\`html\n<div data-component="${Name}"></div>\n\`\`\`\n`;
fs.writeFileSync(docPath, md);
console.log(`Created docs page: ${docPath}`);

