import { cartesian, polar, transpose } from '../coordinate';

export function fromTransform(options) {
  const transforms = options.map(({ type, ...options }) => creator(type)(options));
  transforms.push(cartesian());
  return transforms;
}

export function isPolar(transforms) {
  return transforms.some((d) => d.type === 'polar');
}

export function isTranspose(transforms) {
  const count = transforms.filter((d) => d.type === 'transpose').length;
  return count % 2 === 1;
}

function creator(type) {
  const typeCreator = {
    polar,
    transpose,
  };
  const c = typeCreator[type];
  if (c) return c;
  throw new Error(`unknown coordinate type: ${type}`);
}
