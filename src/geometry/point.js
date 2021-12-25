import { createChannel, createChannels } from './channel';
import { circle } from './shape';
import { channelStyles } from './style';

export function point(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {
    r: 3,
    fill: 'none',
  };
  const { x: X, y: Y, r: R = [] } = channels;
  return Array.from(I, (i) => {
    const r = R[i] || defaults.r;
    return circle(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, channels),
      cx: X[i],
      cy: Y[i],
      r,
    });
  });
}

point.channels = () => createChannels({
  r: createChannel({ name: 'r' }),
});
