import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('plot', () => {
  test('plot with api', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .encode(
        sp.x().field('genre'),
        sp.y().field('sold'),
        sp.fill().field('genre'),
      )
      .plot();

    mount(createDiv(), chart);
  });

  test('plot with object', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const chart = sp.plot({
      data,
      element: 'interval',
      encode: [
        { channel: 'x', field: 'genre' },
        { channel: 'y', field: 'sold' },
        { channel: 'fill', value: 'steelblue' },
      ],
    });

    mount(createDiv(), chart);
  });
});
