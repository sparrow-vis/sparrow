import { createStack } from '../../src/statistic';

describe('stack', () => {
  test('createStack', () => {
    const data = [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ];
    const stack = createStack({
      fields: ['y'],
      as: ['y1', 'y2'],
      key: (d) => d.x,
    });
    const stackedData = stack(data);
    expect(stackedData).toEqual([
      { x: 0, y: 1, y1: 0, y2: 1 },
      { x: 0, y: 2, y1: 1, y2: 3 },
      { x: 0, y: 3, y1: 3, y2: 6 },
    ]);
  });
});
