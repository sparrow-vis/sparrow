import { createBin } from '../../src/statistic';

describe('bin', () => {
  const data = [
    { age: 3, money: 1 },
    { age: 6, money: 3 },
    { age: 7, money: 4 },
    { age: 12, money: 8 },
    { age: 13, money: 2 },
    { age: 12, money: 5 },
    { age: 13, money: 3 },
    { age: 13, money: 9 },
    { age: 16, money: 2 },
    { age: 17, money: 5 },
    { age: 18, money: 10 },
    { age: 23, money: 12 },
    { age: 33, money: 7 },
    { age: 30, money: 2 },
  ];

  test('createBin with count', () => {
    const bin = createBin({ fields: ['age'], count: [5], aggregateType: 'count' });
    expect(bin(data)).toEqual([
      { age: 5, count: 1, money: 1 },
      { age: 10, count: 2, money: 3 },
      { age: 15, count: 5, money: 8 },
      { age: 20, count: 3, money: 2 },
      { age: 25, count: 1, money: 12 },
      { age: 35, count: 1, money: 7 },
      { age: 30, count: 1, money: 2 },
    ]);
  });

  test('createBin with sum', () => {
    const bin = createBin({ fields: ['age'], count: [5], aggregateType: 'sum', aggregateField: 'money' });
    expect(bin(data)).toEqual([
      { age: 5, sum: 1, money: 1 },
      { age: 10, sum: 7, money: 3 },
      { age: 15, sum: 27, money: 8 },
      { age: 20, sum: 17, money: 2 },
      { age: 25, sum: 12, money: 12 },
      { age: 35, sum: 7, money: 7 },
      { age: 30, sum: 2, money: 2 },
    ]);
  });

  test('createBin with x and y', () => {
    const bin = createBin({ fields: ['age', 'money'], count: [5, 3], aggregateType: 'count' });
    expect(bin(data)).toEqual([
      { age: 5, count: 1, money: 5 },
      { age: 10, count: 2, money: 5 },
      { age: 15, count: 2, money: 10 },
      { age: 15, count: 3, money: 5 },
      { age: 20, count: 2, money: 5 },
      { age: 20, count: 1, money: 10 },
      { age: 25, count: 1, money: 15 },
      { age: 35, count: 1, money: 10 },
      { age: 30, count: 1, money: 5 },
    ]);
  });
});
