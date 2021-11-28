import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('plot', () => {
  test('plot with api', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .encode(
        sp.x().field('name'),
        sp.y().field('value'),
        sp.fill().value('steelblue'),
      )
      .plot();

    mount(createDiv(), chart);
  });

  test('plot with object', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp.plot({
      data,
      element: 'interval',
      encode: [
        { channel: 'x', field: 'name' },
        { channel: 'y', field: 'value' },
        { channel: 'fill', value: 'steelblue' },
      ],
    });

    mount(createDiv(), chart);
  });
});
