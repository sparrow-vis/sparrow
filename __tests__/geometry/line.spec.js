import { cartesian, polar } from '../../src/coordinate';
import { line } from '../../src/geometry';
import { plot } from './utils';

describe('line', () => {
  test('line has expected defaults', () => {
    const channels = line.channels();
    expect(channels).toEqual({
      x: { name: 'x', optional: false },
      y: { name: 'y', optional: false },
      z: { name: 'z', optional: true },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('line for x, y', () => {
    plot({
      geometry: line,
      index: [0, 1, 2, 3],
      scales: {},
      styles: {
        stroke: 'black',
      },
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9],
        y: [0.2, 0.1, 0.9, 0.2],
      },
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 60 80 L 180 40 L 300 360 L 540 80',
    });
  });

  test('line for z', () => {
    plot({
      geometry: line,
      index: [0, 1, 2, 3, 4, 5, 6, 7],
      scales: {},
      styles: {
        stroke: 'black',
      },
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9, 0.2, 0.4, 0.6, 0.8],
        y: [0.2, 0.1, 0.9, 0.2, 0.9, 0.3, 0.5, 0.9],
        z: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      },
      get: (d) => d[1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 120 360 L 240 120 L 360 200 L 480 360',
      stroke: '#F6BD16',
      fill: 'none',
    });
  });

  test('radar', () => {
    plot({
      geometry: line,
      index: [0, 1, 2, 3, 4, 5, 6, 7],
      scales: {},
      styles: {
        stroke: 'black',
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
      channels: {
        stroke: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5B8FF9', '#F6BD16', '#F6BD16', '#F6BD16', '#F6BD16'],
        x: [0.1, 0.3, 0.5, 0.9, 0.1, 0.3, 0.5, 0.9],
        y: [0.2, 0.1, 0.9, 0.2, 0.9, 0.3, 0.4, 0.9],
        z: ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b'],
      },
      get: (d) => d[1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 345.30495168499704 232.91597412837854 L 253.029416855008 344.56059047686335 L 164.00000000000003 200 L 345.30495168499704 167.08402587162146 L 345.30495168499704 232.91597412837854',
    });
  });
});
