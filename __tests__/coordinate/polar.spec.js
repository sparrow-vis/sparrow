import {
  createCoordinate, cartesian, polar,
} from '../../src/coordinate';

describe('polar', () => {
  test('polar()', () => {
    const c1 = createCoordinate({
      width: 300,
      height: 200,
      x: 0,
      y: 0,
      transforms: [polar({
        startAngle: -Math.PI / 2,
        endAngle: (Math.PI / 2) * 3,
        innerRadius: 0,
        outerRadius: 1,
      }), cartesian()],
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
          {
            startAngle: Math.PI / 2,
            endAngle: (Math.PI * 3) / 2,
            innerRadius: 0.2,
            outerRadius: 0.8,
          },
        ),
        cartesian(),
      ],
    });

    expect(c2([0, 0])).toEqual([100, 280]);
  });
});
