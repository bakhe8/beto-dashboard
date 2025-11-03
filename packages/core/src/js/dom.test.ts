import { describe, it, expect } from 'vitest';
import { setHTML, setAttrs, replaceChildren, setText } from './dom';

describe('dom helpers', () => {
  it('sanitizes HTML in setHTML', () => {
    const el = document.createElement('div');
    setHTML(el, `<img src=x onerror=alert(1)><script>evil()</script><p>ok</p>`);
    expect(el.innerHTML).toContain('<p>ok</p>');
    expect(el.innerHTML).not.toContain('<script>');
    expect(el.innerHTML).not.toContain('onerror');
  });

  it('applies boolean/null attributes correctly', () => {
    const el = document.createElement('button');
    setAttrs(el, { disabled: true, title: 'Hi', hidden: false, 'aria-label': null });
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('title')).toBe('Hi');
    expect(el.hasAttribute('hidden')).toBe(false);
    expect(el.hasAttribute('aria-label')).toBe(false);
  });

  it('replaces children efficiently', () => {
    const el = document.createElement('div');
    el.innerHTML = '<span>a</span>';
    replaceChildren(el, 'b', document.createElement('em'));
    expect(el.childNodes.length).toBe(2);
    expect(el.textContent?.includes('b')).toBe(true);
  });

  it('sets text content safely', () => {
    const el = document.createElement('div');
    setText(el, '<span>raw</span>');
    expect(el.textContent).toBe('<span>raw</span>');
    // innerHTML should not contain an actual span element
    expect(el.innerHTML).toContain('&lt;span&gt;');
  });
});
