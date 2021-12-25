import { createChannel, createChannels } from './channel';
import { text as shapeText } from './shape';
import { channelStyles } from './style';

export function text(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {
    rotate: 0,
    fontSize: 14,
  };
  const { x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [] } = channels;
  return Array.from(I, (i) => shapeText(renderer, coordinate, {
    ...directStyles,
    ...channelStyles(i, channels),
    x: X[i],
    y: Y[i],
    rotate: R[i] || defaults.rotate,
    fontSize: FS[i] || defaults.fontSize,
    text: T[i],
  }));
}

text.channels = () => createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  text: createChannel({ name: 'text', optional: false }),
});
