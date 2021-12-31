import { cartesian, polar } from '../../src/coordinate';
import { point } from '../../src/geometry';
import { plot } from './utils';

describe('point', () => {
  test('point has expected defaults', () => {
    const channels = point.channels();
    expect(channels).toEqual({
      x: { name: 'x', optional: false },
      y: { name: 'y', optional: false },
      r: { name: 'r', optional: true },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('scatter for x, y', () => {
    plot({
      geometry: point,
      index: [0, 1, 2, 3],
      scales: {},
      styles: {
        strokeWidth: 2,
      },
      channels: {
        stroke: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        x: [0.2, 0.5, 0.7, 0.9],
        y: [0.3, 0.1, 0.4, 0.5],
      },
    }).toHasAttributes({
      tagName: 'circle',
      cx: '120',
      cy: '120',
      'stroke-width': '2',
      fill: 'none',
    });
  });

  test('bubble for r', () => {
    plot({
      geometry: point,
      index: [0, 1, 2, 3],
      scales: {},
      styles: {
        fillOpacity: 0.5,
      },
      channels: {
        stroke: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        x: [0.2, 0.5, 0.7, 0.9],
        y: [0.3, 0.1, 0.4, 0.5],
        r: [20, 5, 30, 40],
      },
    }).toHasAttributes({
      tagName: 'circle',
      cx: '120',
      cy: '120',
      r: '20',
      fill: '#5B8FF9',
      'fill-opacity': '0.5',
    });
  });

  test('bubble in polar', () => {
    plot({
      geometry: point,
      index: [0, 1, 2, 3],
      scales: {},
      styles: {
        fillOpacity: 0.5,
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
      channels: {
        stroke: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        x: [0.2, 0.5, 0.7, 0.9],
        y: [0.3, 0.1, 0.4, 0.5],
        r: [20, 5, 30, 40],
      },
    }).toHasAttributes({
      tagName: 'circle',
      cx: '346.97058314499196',
      cy: '344.56059047686335',
      r: '20',
      fill: '#5B8FF9',
      'fill-opacity': '0.5',
    });
  });
});
