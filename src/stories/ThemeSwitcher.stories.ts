import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/ThemeSwitcher (static)'
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
  <div role="radiogroup" aria-label="Theme">
    <button role="radio" aria-checked="true">Light</button>
    <button role="radio" aria-checked="false">Dark</button>
    <button role="radio" aria-checked="false">Auto</button>
  </div>`
};

