import { createChannels, createXChannel, createYChannel } from './channel';
import { rect } from './shape';
import { channelStyles } from './style';

export function cell(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {};
  const { x, y } = scales;
  const { x: X, y: Y } = channels;
  const width = x ? x.bandWidth() : 1;
  const height = y ? y.bandWidth() : 1;
  return Array.from(I, (i) => rect(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...channelStyles(i, channels),
    x1: X[i],
    y1: Y[i],
    x2: X[i] + width,
    y2: Y[i] + height,
  }));
}

cell.channels = () => createChannels({
  x: createXChannel({ name: 'x', type: 'band', optional: false }),
  y: createYChannel({ name: 'y', type: 'band', optional: false }),
});
