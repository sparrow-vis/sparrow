import { interval } from '../geometry';

export function fromGeometry(type) {
  if (type === 'interval') return interval();
  throw new Error(`unknown interval type: ${type}`);
}
