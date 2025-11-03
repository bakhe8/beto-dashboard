import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Modal (static)',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-content">
        <h2 id="modal-title">Confirm Action</h2>
        <p>Are you sure you want to proceed?</p>
        <div class="modal-footer">
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  `,
};

