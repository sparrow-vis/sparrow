import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('plot', () => {
  test('plot with object', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const chart = sp.plot({
      view: {
        data,
        type: 'interval',
        encodings: {
          x: 'genre',
          y: 'sold',
          fill: 'steelblue',
        },
      },
    });

    mount(createDiv(), chart);
  });
});
