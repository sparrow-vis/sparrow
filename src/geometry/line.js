import { createChannel, createChannels } from './channel';
import { groupChannels } from './style';
import { line as shapeLine } from './shape';
import { group } from '../utils';

export function line(renderer, I, scales, channels, directStyles, coordinate) {
  const defaults = {};
  const { x: X, y: Y, z: Z } = channels;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(series, (I) => shapeLine(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    ...groupChannels(I, channels),
    X,
    Y,
    I,
    fill: 'none',
  }));
}

line.channels = () => createChannels({
  z: createChannel({ name: 'z' }),
});
