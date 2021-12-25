import { curry } from '../utils';
import { reflectX, translate, transpose as transposeT } from './transform';

// eslint-disable-next-line no-unused-vars
function coordinate(transformOptions, canvasOptions) {
  return [
    transposeT(),
    translate(-0.5, -0.5),
    reflectX(),
    translate(0.5, 0.5),
  ];
}

export const transpose = curry(coordinate);
