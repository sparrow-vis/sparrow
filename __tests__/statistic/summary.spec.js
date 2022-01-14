import { createMin, createMax, createMean, createMedian, createCount, createSum } from '../../src/statistic';

describe('summary', () => {
  const data = [
    { sex: 'male', height: 170, weight: 120 },
    { sex: 'male', height: 180, weight: 140 },
    { sex: 'male', height: 175, weight: 140 },
    { sex: 'female', height: 165, weight: 95 },
    { sex: 'female', height: 160, weight: 90 },
  ];

  test('createMin', () => {
    const min = createMin({ fields: ['height', 'weight'], key: (d) => d.sex });
    expect(min(data)).toEqual([
      { sex: 'male', height: 170, weight: 120 },
      { sex: 'female', height: 160, weight: 90 },
    ]);
  });

  test('createMax', () => {
    const max = createMax({ fields: ['height'] });
    expect((max(data))).toEqual([{ sex: 'male', height: 180, weight: 120 }]);
  });

  test('createMean', () => {
    const mean = createMean({ fields: ['height'] });
    expect((mean(data))).toEqual([{ sex: 'male', height: 170, weight: 120 }]);
  });

  test('createMedian', () => {
    const median = createMedian({ fields: ['height'] });
    expect((median(data))).toEqual([{ sex: 'male', height: 170, weight: 120 }]);
  });

  test('createCount', () => {
    const count = createCount({ as: ['count'] });
    expect((count(data))).toEqual([{ sex: 'male', height: 170, weight: 120, count: 5 }]);
  });

  test('createSum', () => {
    const sum = createSum({ fields: ['height'] });
    expect((sum(data))).toEqual([{ sex: 'male', height: 850, weight: 120 }]);
  });

  // test('createMean', () => {
  //   const values = {
  //     value,
  //   };
  //   const mean = createMean({ fields: ['value'] });
  //   expect(summaryValue('mean', mean([index, values]))).toBe(2);
  // });

  // test('createMedian', () => {
  //   const values = {
  //     value,
  //   };
  //   const median = createMedian({ fields: ['value'] });
  //   expect(summaryValue('median', median([index, values]))).toBe(2);
});
