import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('plot', () => {
  test('plot with styles', () => {
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
        sp.stroke().value('#aaa'),
      )
      .style('strokeWidth', 10)
      .style('stroke', '#000')
      .style('fill', 'red')
      .plot();

    mount(createDiv(), chart);
  });
});
