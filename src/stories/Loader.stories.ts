import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Loader (static)'
};
export default meta;

type Story = StoryObj;

export const Spinner: Story = {
  render: () => `
  <div class="loader" data-type="spinner" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
};

