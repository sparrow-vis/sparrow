import { cartesian, polar } from '../../src/coordinate';
import { area } from '../../src/geometry';
import { plot } from './utils';

describe('area', () => {
  test('area has expected defaults', () => {
    const channels = area.channels();
    expect(channels).toEqual({
      x: { name: 'x', optional: false },
      y: { name: 'y', optional: false },
      x1: { name: 'x1', optional: false },
      y1: { name: 'y1', optional: false },
      z: { name: 'z', optional: true },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('area for x, y, x1, y1', () => {
    plot({
      geometry: area,
      index: [0, 1, 2, 3],
      scales: {},
      styles: {
        stroke: 'black',
        fillOpacity: 0.5,
      },
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16'],
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9],
        y: [0.2, 0.1, 0.9, 0.2],
        x1: [0.1, 0.3, 0.5, 0.9],
        y1: [1, 1, 1, 1],
      },
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 60 80 L 180 40 L 300 360 L 540 80 L 540 400 L 300 400 L 180 400 L 60 400 Z',
      stroke: '#5B8FF9',
      fill: '#5B8FF9',
      'fill-opacity': '0.5',
    });
  });

  test('area for z', () => {
    plot({
      geometry: area,
      index: [0, 1, 2, 3, 4, 5, 6, 7],
      scales: {},
      styles: {
        stroke: 'black',
        fillOpacity: 0.2,
      },
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9, 0.1, 0.4, 0.6, 0.9],
        y: [0.2, 0.1, 0.9, 0.2, 0.9, 0.3, 0.5, 0.9],
        x1: [0.1, 0.3, 0.5, 0.9, 0.1, 0.4, 0.6, 0.9],
        y1: [1, 1, 1, 1, 1, 1, 1, 1],
        z: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      },
      get: (d) => d[1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 60 360 L 240 120 L 360 200 L 540 360 L 540 400 L 360 400 L 240 400 L 60 400 Z',
      fill: '#F6BD16',
    });
  });

  test('stack area', () => {
    plot({
      geometry: area,
      index: [0, 1, 2, 3, 4, 5, 6, 7],
      scales: {},
      styles: {
        stroke: 'black',
        fillOpacity: 0.5,
      },
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        x1: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        y: [0.6, 0.5, 0.8, 0.4, 0.3, 0.2, 0.3, 0.1],
        y1: [1, 1, 1, 1, 0.6, 0.5, 0.8, 0.4],
        z: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      },
      get: (d) => d[1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 60 120 L 180 80 L 300 120 L 540 40 L 540 160 L 300 320 L 180 200 L 60 240 Z',
    });
  });

  test('radar with background', () => {
    plot({
      geometry: area,
      index: [0, 1, 2, 3, 4, 5, 6, 7],
      scales: {},
      styles: {
        stroke: 'black',
        fillOpacity: 0.2,
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0, outerRadius: 1 }),
        cartesian(),
      ],
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        y: [0.2, 0.1, 0.9, 0.2, 0.9, 0.3, 0.4, 0.9],
        x1: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        y1: [1, 1, 1, 1, 1, 1, 1, 1],
        z: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      },
      get: (d) => d[1][1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 316.180339887499 211.75570504584945 L 256.73762078750735 333.1479122813215 L 180.00000000000003 200 L 316.180339887499 188.24429495415055 L 316.180339887499 211.75570504584945 L 300 200 L 300 200 L 300 200 L 300 200 L 300 200 Z',
      fill: '#F6BD16',
    });
  });

  test('stack area in polar', () => {
    plot({
      geometry: area,
      index: [0, 1, 2, 3, 4, 5, 6, 7],
      scales: {},
      styles: {
        stroke: 'black',
        fillOpacity: 0.2,
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0, outerRadius: 1 }),
        cartesian(),
      ],
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        x1: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        y: [0.6, 0.5, 0.8, 0.4, 0.3, 0.2, 0.3, 0.1],
        y1: [1, 1, 1, 1, 0.6, 0.5, 0.8, 0.4],
        z: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      },
      get: (d) => d[1][1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 413.2623792124926 282.2899353209462 L 250.5572809000084 352.1690426072246 L 160.00000000000003 200 L 445.62305898749054 94.1986545873548 L 413.2623792124926 282.2899353209462 L 364.7213595499958 247.02282018339784 L 397.0820393249936 129.4657697249032 L 260 200 L 269.0983005625053 295.10565162951536 L 364.7213595499958 247.02282018339784 Z',
      fill: '#F6BD16',
    });
  });
});
