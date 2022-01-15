import { axisX } from '../../src/guide';
import { createLinear } from '../../src/scale';
import { cartesian, transpose, polar } from '../../src/coordinate';
import { renderAxis, firstOf } from './utils';

describe('axisX', () => {
  const domain = [0, 10];
  const scale = createLinear({
    domain,
    range: [0, 1],
  });

  test('cartesian', () => {
    const svg = renderAxis({ scale,
      domain,
      transforms: [cartesian()],
      axis: axisX,
      label: 'val',
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '30',
      x2: '30',
      y1: '370',
      y2: '375',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'middle',
      x: '30',
      y: '375',
      dy: '1em',
      textContent: '0',
    });

    firstOf(svg, 'label').toEqual({
      textContent: 'val →',
      x: '570',
      y: '375',
    });
  });

  test('transpose', () => {
    const svg = renderAxis({
      scale,
      domain,
      transforms: [transpose(), cartesian()],
      axis: axisX,
      label: 'val',
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '30',
      x2: '25',
      y1: '30',
      y2: '30',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'end',
      x: '25',
      y: '30',
      dy: '0.5em',
      textContent: '0',
    });

    firstOf(svg, 'label').toEqual({
      textContent: '↓ val',
      x: '30',
      y: '370',
    });
  });

  test('polar', () => {
    const svg = renderAxis({ scale,
      domain,
      axis: axisX,
      transforms: [
        polar({
          startAngle: -Math.PI / 2,
          endAngle: (Math.PI / 2) * 3,
          innerRadius: 0,
          outerRadius: 1,
        }),
        cartesian()],
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '0',
      x2: '0',
      y1: '0',
      y2: '5',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'middle',
      x: '0',
      y: '0',
      dy: '-0.5em',
    });

    firstOf(svg, 'label').toBeNull();
  });

  test('polar and transpose', () => {
    const domain = [0, 10];
    const scale = createLinear({
      domain,
      range: [0, 1],
    });
    const svg = renderAxis({ scale,
      domain,
      axis: axisX,
      transforms: [
        transpose(),
        polar({
          startAngle: -Math.PI / 2,
          endAngle: (Math.PI / 2) * 3,
          innerRadius: 0,
          outerRadius: 1,
        }),
        cartesian()],
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '300',
      x2: '295',
      y1: '30',
      y2: '30',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'end',
      x: '295',
      y: '30',
      dy: '0.5em',
    });

    firstOf(svg, 'label').toBeNull();
  });
});
