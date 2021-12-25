import { createChannel, createChannels, createXChannel, createYChannel } from './channel';
import { channelStyles } from './style';
import { rect } from './shape';

export function interval(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {};
  const { x, z } = scales;
  const { x: X, y: Y, y1: Y1, z: Z = [] } = channels;
  const groupWidth = x ? x.bandWidth() : 1;
  const intervalWidth = z ? z.bandWidth() : 1;
  const width = groupWidth * intervalWidth;
  return Array.from(I, (i) => {
    const offset = (Z[i] || 0) * groupWidth;
    const x1 = (X[i] || 0) + offset;
    return rect(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, channels),
      x1,
      y1: Y[i],
      x2: x1 + width,
      y2: Y1[i],
    });
  });
}

interval.channels = () => createChannels({
  x: createXChannel({ name: 'x', type: 'band', optional: false }),
  z: createChannel({ name: 'z', type: 'band' }),
  y1: createYChannel({ name: 'y1', optional: false }),
});
