import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Sidebar (static)'
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
  <aside data-component="Sidebar" data-state="default">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Menu</h2>
      <button class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>`
};

export const Collapsed: Story = {
  render: () => `
  <aside data-component="Sidebar" data-state="collapsed">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Menu</h2>
      <button class="sidebar-toggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>`
};

