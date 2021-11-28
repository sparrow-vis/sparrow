import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('plot', () => {
  test('stack', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .statistic(sp.stack())
      .guide(
        sp.axisX().display(false),
        sp.axisY().display(false),
      )
      .encode(
        sp.y().field('value'),
        sp.fill().field('name'),
        sp.label().field('value'),
      )
      .plot();

    mount(createDiv(), chart);
  });

  test('donut', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .statistic(sp.stack())
      .coordinate(
        sp.polar(),
      )
      .guide(
        sp.axisX().display(false),
        sp.axisY().display(false),
      )
      .encode(
        sp.y().field('value'),
        sp.fill().field('name'),
        sp.label().field('value'),
      )
      .plot();

    mount(createDiv(), chart);
  });

  test('pie', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .statistic(sp.stack())
      .coordinate(
        sp.transpose(),
        sp.polar(),
      )
      .guide(
        sp.axisX().display(false),
        sp.axisY().display(false),
      )
      .scale(
        sp.scale().channel('x').padding(0.2),
      )
      .encode(
        sp.y().field('value'),
        sp.fill().field('name'),
        sp.label().transform(sp.percentage(data, (d) => d.value)),
      )
      .style('labelFormatter', (d) => `${d.toFixed(1) * 100}%`)
      .style('labelFill', '#fff')
      .plot();

    mount(createDiv(), chart);
  });
});
