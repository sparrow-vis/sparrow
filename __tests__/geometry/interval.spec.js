import {
  cartesian, polar, transpose,
} from '../../src/coordinate';
import { interval } from '../../src/geometry';
import { createBand } from '../../src/scale';
import { plot } from './utils';

describe('interval', () => {
  test('interval has expected channels', () => {
    const channels = interval.channels();
    expect(channels).toEqual({
      x: { name: 'x', scale: 'band', optional: false },
      y: { name: 'y', optional: false },
      z: { name: 'z', optional: true, scale: 'band' },
      y1: { name: 'y1', optional: false },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('column chart for x, y, fill channels', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2],
      scales: {
        x: createBand({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
          padding: 0.2,
        }),
      },
      styles: {
        stroke: 'black',
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 1 / 3, 2 / 3],
        y: [0.6, 0.4, 0.2],
        y1: [1, 1, 1],
      },
    }).toHasAttributes({
      stroke: 'black',
      fill: '#5B8FF9',
      x: '0',
      y: '240',
      width: '150',
      height: '160',
      tagName: 'rect',
    });
  });

  test('stack column for y and y1 channels', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2, 3, 4, 5],
      styles: {
        stroke: 'black',
      },
      scales: {
        x: createBand({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
          padding: 0.2,
        }),
      },
      channels: {
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5AD8A6', '#5AD8A6', '#5AD8A6'],
        x: [0, 1 / 3, 2 / 3, 0, 1 / 3, 2 / 3],
        y: [0.6, 0.5, 0.8, 0.3, 0.2, 0.3],
        y1: [1, 1, 1, 0.6, 0.5, 0.8],
      },
    }).toHasAttributes({
      tagName: 'rect',
      stroke: 'black',
      fill: '#5B8FF9',
      x: '0',
      y: '240',
      width: '150',
      height: '160',
    });
  });

  test('group column for z channels', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2, 3, 4, 5],
      styles: {
        stroke: 'black',
      },
      scales: {
        x: createBand({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
          padding: 0.1,
        }),
        z: createBand({
          domain: ['1', '2'],
          range: [0, 1],
          padding: 0.1,
        }),
      },
      channels: {
        fill: ['#5B8FF9', '#5B8FF9', '#5B8FF9', '#5AD8A6', '#5AD8A6', '#5AD8A6'],
        x: [0, 1 / 3, 2 / 3, 0, 1 / 3, 2 / 3],
        y: [0.6, 0.5, 0.8, 0.3, 0.2, 0.3],
        y1: [1, 1, 1, 1, 1, 1],
        z: [0, 0, 0, 1 / 2, 1 / 2, 1 / 2],
      },
    }).toHasAttributes({
      tagName: 'rect',
      stroke: 'black',
      fill: '#5B8FF9',
      x: '0',
      y: '240',
      width: '74.65437788018433',
      height: '160',
    });
  });

  test('bar for transpose', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2],
      styles: {
        stroke: 'black',
      },
      scales: {
        x: createBand({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
          padding: 0.2,
        }),
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 1 / 3, 2 / 3],
        y: [0.6, 0.4, 0.2],
        y1: [1, 1, 1],
      },
      transforms: [transpose(), cartesian()],
    }).toHasAttributes({
      tagName: 'rect',
      stroke: 'black',
      fill: '#5B8FF9',
      x: '0',
      y: '0',
      width: '240',
      height: '100',
    });
  });

  test('rose for polar', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2],
      styles: {
        stroke: 'black',
      },
      scales: {
        x: createBand({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
          padding: 0.2,
        }),
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 1 / 3, 2 / 3],
        y: [0.6, 0.4, 0.2],
        y1: [1, 1, 1],
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 404 200 A 104 104 0 0 1 300 304 L 300 240 A 40 40 0 0 0 340 200 Z',
    });
  });

  test('donut for ring', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2],
      styles: {
        stroke: 'black',
      },
      scales: {
        x: createBand({ domain: [0], range: [0, 1], padding: 0 }),
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 0, 0],
        y: [0, 1 / 3, 2 / 3],
        y1: [1 / 3, 2 / 3, 1],
      },
      transforms: [
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
      get: (d) => d[0][1],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 300 5.684341886080802e-14 A 199.99999999999994 199.99999999999994 0 0 1 300 399.99999999999994 L 300 346.6666666666667 A 146.66666666666669 146.66666666666669 0 0 0 300 53.333333333333314 Z M 300 399.99999999999994 A 199.99999999999994 199.99999999999994 0 0 1 300 5.684341886080802e-14 L 300 53.333333333333314 A 146.66666666666669 146.66666666666669 0 0 0 300 346.6666666666667 Z',
    });
  });

  test('pie for transpose, polar', () => {
    plot({
      geometry: interval,
      index: [0, 1, 2],
      styles: {
        stroke: 'black',
      },
      scales: {
        x: createBand({ domain: [0], range: [0, 1], padding: 0 }),
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0, 0, 0],
        y: [0, 1 / 3, 2 / 3],
        y1: [1 / 3, 2 / 3, 1],
      },
      transforms: [
        transpose(),
        polar({ startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1 }),
        cartesian(),
      ],
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 200.00000000000009 26.794919243112236 A 199.99999999999997 199.99999999999997 0 0 1 499.99999999999994 199.99999999999994 L 340 200 A 40 40 0 0 0 280 165.35898384862244 Z',
    });
  });
});
