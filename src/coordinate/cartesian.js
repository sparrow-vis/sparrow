import { createLinear } from '../scale';

export function cartesian() {
  return ({
    x, y, width, height,
  }) => transform(x, y, width, height);
}

function transform(x, y, width, height) {
  const tx = createLinear({ domain: [0, 1], range: [x, x + width] });
  const ty = createLinear({ domain: [0, 1], range: [y, y + height] });
  return {
    type: 'cartesian',
    transform: ([px, py]) => [tx(px), ty(py)],
  };
}
