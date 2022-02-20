import { createBinX } from '../../src/statistic';

describe('binX', () => {
  test('createBinX', () => {
    const data = {
      index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      values: {
        x: [3, 6, 7, 12, 13, 12, 13, 13, 16, 17, 18, 23, 33, 30],
        y: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
    };
    const binX = createBinX({ channel: 'fill' });
    expect(binX(data)).toEqual({
      index: [0, 1, 2, 3, 4, 6],
      values: {
        x: [0, 5, 10, 15, 20, 25, 30],
        x1: [5, 10, 15, 20, 25, 30, 35],
        fill: [1, 2, 5, 3, 1, 0, 1],
        y: [1, 1, 1, 1, 1, undefined, 1],
      },
    });
  });
});
