import {
  cartesian, isPolar, isTranspose, polar, transpose,
} from '../../src/coordinate';

describe('Test check types', () => {
  test('isPolar(transforms) returns true if contains polar transform', () => {
    expect(isPolar([cartesian()])).toBeFalsy();
    expect(isPolar([cartesian(), polar()])).toBeTruthy();
  });

  test('isTranspose(transforms) returns true if contains polar transform', () => {
    expect(isTranspose([cartesian()])).toBeFalsy();
    expect(isTranspose([cartesian(), transpose()])).toBeTruthy();
    expect(isTranspose([cartesian(), transpose(), transpose()])).toBeFalsy();
  });
});
