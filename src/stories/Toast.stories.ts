import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Toast (static)'
};
export default meta;

type Story = StoryObj;

export const Variants: Story = {
  render: () => `
  <div class="toast" data-type="info" role="status" aria-live="polite">
    <p>Informational message</p>
    <button class="toast-close" aria-label="Close">×</button>
  </div>
  <div class="toast" data-type="success" role="status" aria-live="polite">
    <p>Saved successfully</p>
    <button class="toast-close" aria-label="Close">×</button>
  </div>
  <div class="toast" data-type="warning" role="status" aria-live="polite">
    <p>Be careful with this action</p>
    <button class="toast-close" aria-label="Close">×</button>
  </div>
  <div class="toast" data-type="danger" role="status" aria-live="assertive">
    <p>Something went wrong</p>
    <button class="toast-close" aria-label="Close">×</button>
  </div>`
};

