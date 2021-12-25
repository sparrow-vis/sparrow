import { createChannels, createXChannel, createYChannel } from './channel';
import { rect as shapeRect } from './shape';
import { channelStyles } from './style';

export function rect(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {};
  const { x: X, y: Y, x1: X1, y1: Y1 } = channels;
  return Array.from(I, (i) => shapeRect(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...channelStyles(i, channels),
    x1: X[i],
    y1: Y[i],
    x2: X1[i],
    y2: Y1[i],
  }));
}

rect.channels = () => createChannels({
  x1: createXChannel({ name: 'x1', optional: false }),
  y1: createYChannel({ name: 'y1', optional: false }),
});
