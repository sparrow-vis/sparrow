import { createStack } from '../../src/statistic';

describe('stack', () => {
  test('stack', () => {
    const index = [0, 1, 2];
    const values = {
      x: [0, 0, 0],
      y: [1, 2, 3],
    };
    const stack = createStack({ x: 'x', y: 'y', y1: 'y1' });
    const [, stackedValues] = stack([index, values]);
    expect(stackedValues).toEqual({
      x: [0, 0, 0],
      y: [1, 3, 6],
      y1: [0, 1, 3],
    });
  });
});
