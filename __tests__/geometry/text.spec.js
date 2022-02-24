import { text } from '../../src/geometry';
import { plot } from './utils';

describe('text', () => {
  test('text has expected defaults', () => {
    const channels = text.channels();
    expect(channels).toEqual({
      x: { name: 'x', optional: false },
      y: { name: 'y', optional: false },
      text: { name: 'text', optional: false, scale: 'identity' },
      fontSize: { name: 'fontSize', optional: true },
      rotate: { name: 'rotate', optional: true },
      fill: { name: 'fill', optional: true },
      stroke: { name: 'stroke', optional: true },
      fontWeight: {
        name: 'fontWeight',
        optional: true,
      },
    });
  });

  test('text for x, y, text, fontSize, rotate', () => {
    plot({
      geometry: text,
      index: [0, 1, 2, 3],
      scales: {},
      styles: {
        stroke: 'black',
        fontWeight: 600,
      },
      channels: {
        fill: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16'],
        text: ['Rust', 'C', 'JavaScript', 'Python'],
        rotate: [45, 180, 60, -30],
        fontSize: [40, 60, 20, 80],
        x: [0.2, 0.7, 0.7, 0.3],
        y: [0.4, 0.2, 0.6, 0.9],
      },
    }).toHasAttributes({
      tagName: 'text',
      x: '0',
      y: '0',
      stroke: 'black',
      fill: '#5B8FF9',
      'font-size': '40',
      'font-weight': 'normal',
    });
  });
});
