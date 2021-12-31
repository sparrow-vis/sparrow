import { cartesian, polar } from '../../src/coordinate';
import { cell } from '../../src/geometry';
import { createBand } from '../../src/scale';
import { plot } from './utils';

describe('cell', () => {
  test('cell has expected defaults', () => {
    const channels = cell.channels();
    expect(channels).toEqual({
      x: { name: 'x', scale: 'band', optional: false },
      y: { name: 'y', scale: 'band', optional: false },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('heatmap for x, y', () => {
    plot({
      geometry: cell,
      index: [0, 1, 2, 3],
      scales: {
        x: createBand({
          domain: ['a', 'b'],
          range: [0, 1],
          padding: 0,
        }),
        y: createBand({
          domain: ['c', 'd'],
          range: [0, 1],
          padding: 0,
        }),
      },
      styles: {
        stroke: 'black',
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        x: [0, 0, 0.5, 0.5],
        y: [0, 0.5, 0, 0.5],
      },
    }).toHasAttributes({
      tagName: 'rect',
      x: '0',
      y: '0',
      width: '300',
      height: '200',
      stroke: 'black',
      fill: '#5B8FF9',
    });
  });

  test('heatmap in polar', () => {
    plot({
      geometry: cell,
      index: [0, 1, 2, 3],
      scales: {
        x: createBand({
          domain: ['a', 'b'],
          range: [0, 1],
          padding: 0,
        }),
        y: createBand({
          domain: ['c', 'd'],
          range: [0, 1],
          padding: 0,
        }),
      },
      styles: {
        stroke: 'black',
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        x: [0, 0, 0.5, 0.5],
        y: [0, 0.5, 0, 0.5],
      },
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 499.99999999999994 200 A 199.99999999999994 199.99999999999994 0 0 1 100.00000000000001 200.00000000000006 L 180 200 A 120 120 0 0 0 420 200 Z',
    });
  });
});
