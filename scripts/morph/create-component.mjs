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

const content = `import { define } from "./runtime";
import { ComponentMorph } from "../js/morph";

type Props = Record<string, unknown>;

const ${Name} = ComponentMorph.create<Props>("${Name}", {
  stateKeys: [],
  render: ({ props, slots }) => {
    return \
`<div class=\"${Name}\">${Name} component<slot>${'${slots.default || \"\"}'}</slot></div>`;
  },
});

define("${Name}", ${Name});
export default ${Name};
`;

fs.writeFileSync(filePath, content);
console.log(`Created component: ${filePath}`);

