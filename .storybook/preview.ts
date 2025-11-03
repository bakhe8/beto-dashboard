import type { Preview } from '@storybook/html';
import '../packages/core/src/css/base.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered'
  }
};

export default preview;
