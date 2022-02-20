import { createSymmetryY } from '../../src/statistic';

describe('symmetryY', () => {
  test('createSymmetryY', () => {
    const data = {
      index: [0, 1, 2],
      values: {
        x: [0, 1, 2],
        y1: [2, 4, 6],
        y: [8, 8, 8],
      },
    };

    const symmetryY = createSymmetryY();

    expect(symmetryY(data)).toEqual({
      index: [0, 1, 2],
      values: {
        x: [0, 1, 2],
        y1: [4, 5, 6],
        y: [10, 9, 8],
      },
    });
  });
});
