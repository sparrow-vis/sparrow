import { curry } from '../utils';
import { scale, translate } from './transforms';

function coordinate(transformOptions, coordinateOptions) {
  const {
    x, y, width, height,
  } = coordinateOptions;
  return [
    scale(width, height),
    translate(x, y),
  ];
}

export const cartesian = curry(coordinate);
