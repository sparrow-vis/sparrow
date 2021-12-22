import {
  createCoordinate,
} from '../../src/coordinate';

describe('coordinate', () => {
  test('createCoordinate(options) returns a identity function without transforms', () => {
    const c = createCoordinate({
      transforms: [],
    });

    expect(c(1)).toBe(1);
    expect(c(2)).toBe(2);
  });
});
