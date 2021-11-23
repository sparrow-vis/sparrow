import { reflectX, translate } from './affine';

export function transpose() {
  return () => [
    transform(),
    translate(-0.5, -0.5),
    reflectX(),
    translate(0.5, 0.5),
  ];
}

function transform() {
  return {
    type: 'transpose',
    transform: ([px, py]) => [py, px],
  };
}
