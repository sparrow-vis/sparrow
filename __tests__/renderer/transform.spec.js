import { createRenderer } from '../../src/renderer';
import { mount } from '../../src/renderer/utils';
import { createDiv } from '../utils';

describe('transform', () => {
  test('Renderer should apply specified transforms and can save or restore transforms context.', () => {
    const renderer = createRenderer(600, 400);

    renderer.save();
    renderer.translate(200, 100);
    renderer.rotate(60);
    renderer.scale(2, 3);
    const r1 = renderer.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });
    renderer.restore();

    const r2 = renderer.rect({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    });

    mount(createDiv(), renderer.node());

    expect(r1.parentNode.getAttribute('transform')).toBe('translate(200, 100) rotate(60) scale(2, 3)');
    expect(r2.parentNode.getAttribute('transform')).toBeNull();
  });
});
