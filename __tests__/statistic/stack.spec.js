import { createStackY } from '../../src/statistic';

describe('stack', () => {
  test('createStack', () => {
    const data = {
      index: [0, 1, 2],
      values: {
        x: [0, 0, 0],
        y: [1, 2, 3],
      },
    };
    const stack = createStackY();
    expect(stack(data)).toEqual({
      index: [0, 1, 2],
      values: {
        x: [0, 0, 0],
        y1: [0, 1, 3],
        y: [1, 3, 6],
      },
    });
  });
});
