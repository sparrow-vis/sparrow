import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('guide', () => {
  test('guide', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .guide(
        sp.axisY().title('count'),
        sp.axisX().title(false),
      )
      .encode(
        sp.x().field('name'),
        sp.y().field('value'),
        sp.fill().value('steelblue'),
      )
      .plot();

    mount(createDiv(), chart);
  });
});
