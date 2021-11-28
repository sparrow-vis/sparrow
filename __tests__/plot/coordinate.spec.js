import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';

describe('coordinate', () => {
  test('rose chart', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .coordinate(sp.polar())
      .encode(
        sp.x().field('name'),
        sp.y().field('value'),
        sp.fill().field('name'),
      )
      .plot();

    mount(createDiv(), chart);
  });

  test('bar chart', () => {
    const data = [
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
      { name: 'philosophers', value: 35 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .coordinate(sp.transpose())
      .encode(
        sp.x().field('name'),
        sp.y().field('value'),
        sp.fill().field('name'),
      )
      .plot();

    mount(createDiv(), chart);
  });

  test('radical bar chart', () => {
    const data = [
      { name: 'philosophers', value: 35 },
      { name: 'questions', value: 17 },
      { name: 'schools', value: 25 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .coordinate(
        sp.transpose(),
        sp.polar(),
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
