import { path } from '../../src/geometry';
import { plot } from './utils';

describe('path', () => {
  test('path has expected defaults', () => {
    const channels = path.channels();
    expect(channels).toEqual({
      d: { name: 'd', optional: false, scale: 'identity' },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('path for d, fill', () => {
    plot({
      geometry: path,
      index: [0, 1],
      scales: {},
      styles: {
        stroke: 'black',
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6'],
        d: [
          'M 10 10 L 10 200 L 200 200 Z',
          [
            ['M', 250, 250],
            ['L', 250, 300],
            ['L', 300, 300],
            ['Z'],
          ],
        ],
      },
    }).toHasAttributes({
      tagName: 'path',
      d: 'M 10 10 L 10 200 L 200 200 Z',
    });
  });
});
