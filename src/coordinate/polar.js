import {
  translate, scale, reflectY, polar as transform,
} from './transforms';
import { curry } from '../utils/helper';

function coordinate(transformOptions, coordinateOptions) {
  const { width, height } = coordinateOptions;
  const aspect = width / height;
  const sx = aspect > 1 ? 1 / aspect : 1;
  const sy = aspect > 1 ? 1 : aspect;
  return [
    translate(0, -0.5),
    reflectY(),
    translate(0, 0.5),
    transform(transformOptions),
    scale(sx, sy),
    scale(0.5, 0.5),
    translate(0.5, 0.5),
  ];
}

export const polar = curry(coordinate);
