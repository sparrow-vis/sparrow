import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { text as shapeText } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  fontWeight: createChannel({ name: 'fontWeight' }),
  text: createChannel({ name: 'text', optional: false, scale: 'identity' }),
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {
    rotate: 0,
    fontSize: 14,
    fontWeight: 'normal',
  };
  const { x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [], fontWeight: FW = [] } = values;
  return Array.from(I, (i) => shapeText(renderer, coordinate, {
    ...directStyles,
    ...channelStyles(i, values),
    x: X[i],
    y: Y[i],
    rotate: R[i] || defaults.rotate,
    fontSize: FS[i] || defaults.fontSize,
    fontWeight: FW[i] || defaults.fontWeight,
    text: T[i],
  }));
}

export const text = createGeometry(channels, render);
