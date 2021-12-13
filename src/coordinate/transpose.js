import { curry } from '../utils';
import { reflectX, translate, transpose as transform } from './transforms';

// eslint-disable-next-line no-unused-vars
function coordinate(transformOptions, coordinateOptions) {
  return [
    transform(),
    translate(-0.5, -0.5),
    reflectX(),
    translate(0.5, 0.5),
  ];
}

export const transpose = curry(coordinate);
