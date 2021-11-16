import * as renderer from '../../src/renderer';
import { mount } from '../../src/renderer/utils';
import { createDiv } from '../utils';

describe('shapes', () => {
  test('draw circle', () => {
    const context = renderer.createContext(600, 400);

    const circle = renderer.circle(context, {
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });

    mount(createDiv(), context.node);

    expect(circle.parentNode).toBe(context.group);
    expect(circle.getAttribute('cx')).toBe('100');
  });
});
