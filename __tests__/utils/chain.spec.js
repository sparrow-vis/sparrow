import { chain } from '../../src/utils';

describe('chain', () => {
  test('chain', () => {
    const add = ({ a, b }) => (scale) => (a + b) * scale;
    const chainAdd = chain(add, {
      a: 0,
      b: 0,
    });

    const adder = chainAdd();
    expect(adder(1)).toBe(0);
    expect(adder.a()).toBe(0);
    expect(adder.b()).toBe(0);

    const adder1 = chainAdd().a(1).b(2);
    expect(adder1(2)).toBe(6);
    expect(adder1.b()).toBe(2);
    expect(adder1.a()).toBe(1);
  });

  test('array params', () => {
    const add = ({ params }) => (scale) => (params[0] + params[1]) * scale;
    const chainAdd = chain(add, {
      params: [0, 0],
    });

    const adder = chainAdd();
    expect(adder(1)).toBe(0);
    expect(adder.params()).toEqual([0, 0]);

    const adder1 = chainAdd().params(1, 2);
    expect(adder1(2)).toBe(6);
    expect(adder1.params()).toEqual([1, 2]);
  });
});
