import { createChannel, createXChannel, createYChannel, createChannels } from './channel';
import { groupChannels } from './style';
import { area as shapeArea } from './shape';
import { group } from '../utils';

export function area(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {};
  const { x: X, y: Y, z: Z, x1: X1, y1: Y1 } = channels;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(series, (I) => shapeArea(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...groupChannels(I, channels),
    X1: X,
    Y1: Y,
    X2: X1,
    Y2: Y1,
    I,
  }));
}

area.channels = () => createChannels({
  x1: createXChannel({ name: 'x1', optional: false }),
  y1: createYChannel({ name: 'y1', optional: false }),
  z: createChannel({ name: 'z' }),
});
