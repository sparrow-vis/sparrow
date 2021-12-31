import { createChannels, createChannel } from './channel';
import { createGeometry } from './geometry';
import { rect } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  x: createChannel({ name: 'x', scale: 'band', optional: false }),
  y: createChannel({ name: 'y', scale: 'band', optional: false }),
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {};
  const { x, y } = scales;
  const { x: X, y: Y } = values;
  const width = x.bandWidth();
  const height = y.bandWidth();
  return Array.from(I, (i) => rect(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...channelStyles(i, values),
    x1: X[i],
    y1: Y[i],
    x2: X[i] + width,
    y2: Y[i] + height,
  }));
}

export const cell = createGeometry(channels, render);
