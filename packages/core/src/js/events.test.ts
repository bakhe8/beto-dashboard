import { describe, it, expect, vi } from 'vitest';
import { on } from './events';

describe('events.on (delegation)', () => {
  it('calls handler when matching descendant clicked', () => {
    const root = document.createElement('div');
    root.innerHTML = `<button class="x"><span>go</span></button>`;

    const handler = vi.fn();
    const off = on(root, 'click', 'button.x', (_ev, target) => handler((target as HTMLElement).tagName));

    const span = root.querySelector('span')!;
    span.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('BUTTON');

    off();
  });
});

