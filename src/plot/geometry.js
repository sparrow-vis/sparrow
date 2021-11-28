import { createInterval } from '../geometry';

export function fromGeometry(type) {
  if (type === 'interval') return createInterval();
  throw new Error(`unknown interval type: ${type}`);
}
