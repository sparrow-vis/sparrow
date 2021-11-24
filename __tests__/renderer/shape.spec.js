import { createRenderer } from '../../src/renderer';
import { mount } from '../../src/renderer/utils';
import { createDiv } from '../utils';

describe('shapes', () => {
  test('draw circle', () => {
    const renderer = createRenderer(600, 400);

    const circle = renderer.circle({
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });

    mount(createDiv(), renderer.node());

    expect(circle.parentNode).toBe(renderer.group());
    expect(circle.getAttribute('cx')).toBe('100');
  });
});
