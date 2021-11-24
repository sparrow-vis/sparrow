import {
  createCoordinate, cartesian, transpose, polar,
} from '../../src/coordinate';

describe('Test Coordinate', () => {
  test('createCoordinate(options) returns a identity function without transforms', () => {
    const c = createCoordinate({
      transforms: [],
    });

    expect(c(1)).toBe(1);
    expect(c(2)).toBe(2);
  });

  test('cartesian()', () => {
    const c = createCoordinate({
      width: 200,
      height: 300,
      x: 0,
      y: 0,
      transforms: [cartesian()],
    });
    expect(c([0.5, 0.5])).toEqual([100, 150]);
    expect(c.isPolar()).toBeFalsy();
    expect(c.isTranspose()).toBeFalsy();
  });

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

  test('polar()', () => {
    const c1 = createCoordinate({
      width: 300,
      height: 200,
      x: 0,
      y: 0,
      transforms: [polar(), cartesian()],
    });

    expect(c1([0, 1])).toEqual([150, 100]);
    expect(c1.isPolar()).toBeTruthy();
    expect(c1.isTranspose()).toBeFalsy();

    const c2 = createCoordinate({
      width: 200,
      height: 400,
      x: 0,
      y: 0,
      transforms: [
        polar(
          Math.PI / 2,
          (Math.PI * 3) / 2,
          0.2,
          0.8,
        ),
        cartesian(),
      ],
    });

    expect(c2([0, 0])).toEqual([100, 280]);
  });
});
