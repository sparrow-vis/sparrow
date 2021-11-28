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
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    const chart = sp
      .interval()
      .data(data)
      .coordinate(sp.transpose(), sp.polar())
      .encode(sp.x().field('genre'), sp.y().field('sold'), sp.fill().field('genre'))
      .plot();

    mount(createDiv(), chart);
  });
});
