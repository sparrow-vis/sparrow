import { createChannel, createChannels } from './channel';
import { channelStyles } from './style';
import { rect } from './shape';
import { createGeometry } from './geometry';

const channels = createChannels({
  x: createChannel({ name: 'x', scale: 'band', optional: false }),
  z: createChannel({ name: 'z', scale: 'band' }),
  y1: createChannel({ name: 'y1', optional: false }),
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {
    z: 0,
    x: 0,
  };
  const { x, z } = scales;
  const { x: X, y: Y, y1: Y1, z: Z = [] } = values;
  const groupWidth = x.bandWidth();
  const intervalWidth = z && z.bandWidth ? z.bandWidth() : 1;
  const width = groupWidth * intervalWidth;
  return Array.from(I, (i) => {
    const { z: dz, x: dx, ...restDefaults } = defaults;
    const offset = (Z[i] || dz) * groupWidth;
    const x1 = (X[i] || dx) + offset;
    return rect(renderer, coordinate, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1,
      y1: Y[i],
      x2: x1 + width,
      y2: Y1[i],
    });
  });
}

export const interval = createGeometry(channels, render);
