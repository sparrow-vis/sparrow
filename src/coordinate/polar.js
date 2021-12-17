import {
  translate, scale, reflectY, polar as polarT,
} from './transforms';
import { curry } from '../utils/helper';

function coordinate(transformOptions, canvasOptions) {
  const { width, height } = canvasOptions;
  const {
    innerRadius, outerRadius, startAngle, endAngle,
  } = transformOptions;
  const aspect = width / height;
  const sx = aspect > 1 ? 1 / aspect : 1;
  const sy = aspect > 1 ? 1 : aspect;
  return [
    translate(0, -0.5),
    reflectY(),
    translate(0, 0.5),
    scale(endAngle - startAngle, outerRadius - innerRadius),
    translate(startAngle, innerRadius),
    polarT(),
    scale(sx, sy),
    scale(0.5, 0.5),
    translate(0.5, 0.5),
  ];
}

export const polar = curry(coordinate);
