import { curry } from '../utils';
import { scale, translate } from './transform';

function coordinate(transformOptions, canvasOptions) {
  const { x, y, width, height } = canvasOptions;
  return [
    scale(width, height),
    translate(x, y),
  ];
}

export const cartesian = curry(coordinate);
