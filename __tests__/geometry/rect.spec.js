import { cartesian, polar } from '../../src/coordinate';
import { rect } from '../../src/geometry';
import { plot } from './utils';

describe('rect', () => {
  test('rect has expected defaults', () => {
    const channels = rect.channels();
    expect(channels).toEqual({
      x: { name: 'x', optional: false },
      y: { name: 'y', optional: false },
      x1: { name: 'x1', optional: false },
      y1: { name: 'y1', optional: false },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('treemap for x, y, x1, y1', () => {
    plot({
      geometry: rect,
      index: [0, 1, 2],
      scales: {},
      styles: {
        stroke: 'black',
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 0, 0.5],
        y: [0, 0.5, 0.5],
        x1: [1, 0.5, 1],
        y1: [0.5, 1, 1],
      },
    }).toHasAttributes({
      tagName: 'rect',
      x: '0',
      y: '0',
      width: '600',
      height: '200',
      stroke: 'black',
      fill: '#5B8FF9',
    });
  });

  test('treemap in polar', () => {
    plot({
      geometry: rect,
      index: [0, 1, 2],
      scales: {},
      styles: {
        stroke: 'black',
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 0, 0.5],
        y: [0, 0.5, 0.5],
        x1: [1, 0.5, 1],
        y1: [0.5, 1, 1],
      },
      get: (d) => d[0][0],
    }).toHasAttributes({
      tagName: 'circle',
      cx: '300',
      cy: '200',
      r: '120',
    });
  });
});
