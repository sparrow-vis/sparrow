import { axisY } from '../../src/guide';
import { createLinear } from '../../src/scale';
import { cartesian, transpose, polar } from '../../src/coordinate';
import { renderAxis, firstOf } from './utils';

describe('axisY', () => {
  const domain = [0, 10];
  const scale = createLinear({
    domain,
    range: [1, 0],
  });

  test('cartesian', () => {
    const svg = renderAxis({
      scale,
      domain,
      transforms: [cartesian()],
      axis: axisY,
      label: 'val',
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '30',
      x2: '25',
      y1: '370',
      y2: '370',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'end',
      x: '25',
      y: '370',
      dy: '0.5em',
      textContent: '0',
    });

    firstOf(svg, 'label').toEqual({
      textContent: '↑ val',
      x: '30',
      y: '30',
    });
  });

  test('transpose', () => {
    const svg = renderAxis({
      scale,
      domain,
      transforms: [transpose(), cartesian()],
      axis: axisY,
      label: 'val',
      grid: true,
    });

    firstOf(svg, 'tick').toEqual({
      x1: '30',
      x2: '30',
      y1: '30',
      y2: '25',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'middle',
      x: '30',
      y: '25',
      dy: '-0.3em',
      textContent: '0',
    });

    firstOf(svg, 'label').toEqual({
      textContent: 'val →',
      x: '570',
      y: '25',
    });
  });

  test('polar', () => {
    const svg = renderAxis({ scale,
      domain,
      axis: axisY,
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
      x1: '300',
      x2: '295',
      y1: '200',
      y2: '200',
      stroke: 'currentColor',
    });

    firstOf(svg, 'text').toEqual({
      'text-anchor': 'end',
      x: '295',
      y: '200',
      dy: '0.5em',
      textContent: '0',
    });

    firstOf(svg, 'label').toBeNull();
  });

  test('polar and transpose', () => {
    const svg = renderAxis({ scale,
      domain,
      axis: axisY,
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
      textContent: '0',
    });

    firstOf(svg, 'label').toBeNull();
  });
});
