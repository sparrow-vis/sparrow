import { createNormalizeY } from '../../src/statistic';

describe('normalizeY', () => {
  test('createNormalizeY', () => {
    const data = {
      index: [0, 1, 2],
      values: {
        x: [0, 1, 2],
        y1: [2, 4, 6],
        y: [10, 10, 10],
      },
    };
    const normalizeY = createNormalizeY();
    expect(normalizeY(data)).toEqual({
      index: [0, 1, 2],
      values: {
        x: [0, 1, 2],
        y1: [0.2, 0.4, 0.6],
        y: [1, 1, 1],
      },
    });
  });
});
