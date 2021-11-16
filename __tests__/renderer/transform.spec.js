import * as renderer from '../../src/renderer';
import { mount } from '../../src/renderer/utils';
import { createDiv } from '../utils';

describe('transform', () => {
  test('transforms', () => {
    const context = renderer.createContext(600, 400);

    renderer.save(context);
    renderer.translate(context, 200, 100);
    renderer.rotate(context, 60);
    renderer.scale(context, 2, 3);
    const r1 = renderer.rect(context, {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });
    renderer.restore(context);

    const r2 = renderer.rect(context, {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });

    mount(createDiv(), context.node);

    expect(r1.parentNode.getAttribute('transform')).toBe('translate(200, 100) rotate(60) scale(2, 3)');
    expect(r2.parentNode.getAttribute('transform')).toBeNull();
  });
});
