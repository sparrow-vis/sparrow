import { link } from '../../src/geometry';
import { plot } from './utils';

describe('link', () => {
  test('link has expected defaults', () => {
    const channels = link.channels();
    expect(channels).toEqual({
      x: { name: 'x', optional: false },
      y: { name: 'y', optional: false },
      x1: { name: 'x1', optional: false },
      y1: { name: 'y1', optional: false },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
    });
  });

  test('link for x, y, x1, y1', () => {
    plot({
      geometry: link,
      index: [0, 1, 2],
      scales: {},
      styles: {
        stroke: 'black',
      },
      channels: {
        stroke: ['#5B8FF9', '#5AD8A6', '#5D7092'],
        x: [0.2, 0.5, 0.3],
        y: [0.1, 0.5, 0.5],
        x1: [0.4, 0.2, 1],
        y1: [0.5, 0.9, 1],
      },
    }).toHasAttributes({
      tagName: 'line',
      x1: '120',
      y1: '40',
      x2: '240',
      y2: '200',
      stroke: '#5B8FF9',
    });
  });
});
