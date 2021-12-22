import {
  createCoordinate, cartesian, transpose,
} from '../../src/coordinate';

describe('transpose', () => {
  test('transpose()', () => {
    const c = createCoordinate({
      width: 200,
      height: 300,
      x: 0,
      y: 0,
      transforms: [transpose(), cartesian()],
    });

    expect(c([0.5, 1])).toEqual([0, 150]);
    expect(c([0.4, 1])).toEqual([0, 120]);
    expect(c.isPolar()).toBeFalsy();
    expect(c.isTranspose()).toBeTruthy();
  });
});
