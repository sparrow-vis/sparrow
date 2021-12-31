import { createGeometry } from '../../src/geometry/geometry';

describe('createGeometry', () => {
  test('createGeometry checks required channels', () => {
    const channels = {
      x: { optional: false },
      y: { optional: true },
    };
    const render = () => {};
    const geometry = createGeometry(channels, render);
    expect(() => {
      geometry({}, {}, {}, {}, {}, {});
    }).toThrowError();
  });

  test('createGeometry checks required channels" scales', () => {
    const channels = {
      x: { optional: false, scale: 'band' },
    };
    const render = () => {};
    const geometry = createGeometry(channels, render);
    expect(() => {
      geometry({}, {}, {}, { x: [0, 1, 2] }, {}, {});
    }).toThrowError();
  });
});
