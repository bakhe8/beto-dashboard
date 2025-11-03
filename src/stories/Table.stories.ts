import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Table (static)'
};

export default meta;

type Story = StoryObj;

export const WithData: Story = {
  render: () => `
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th></tr>
      </thead>
      <tbody>
        <tr><td>John Doe</td><td>Admin</td></tr>
        <tr><td>Jane Smith</td><td>Editor</td></tr>
      </tbody>
    </table>
  </div>`
};

export const Empty: Story = {
  render: () => `
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th></tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <p>No rows.</p>
  </div>`
};

