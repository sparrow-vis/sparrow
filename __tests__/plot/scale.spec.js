import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('plot', () => {
  test('scale', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .scale(
        sp.scale().channel('fill').range(['#00918E', '#4DD599', '#FFDC34']),
        sp.scale().channel('x').padding(0.5),
        sp.linear().channel('y').range([0.8, 0.2]).tickCount(3)
          .nice(true),
      )
      .encode(
        sp.x().field('name'),
        sp.y().field('value'),
        sp.fill().field('name'),
      )
      .plot();

    mount(createDiv(), chart);
  });
});
