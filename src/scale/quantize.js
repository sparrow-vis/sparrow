import { createThreshold } from './threshold';

export function createQuantize({ domain: [d0, d1], range, ...rest }) {
  const n = range.length - 1;
  const step = (d1 - d0) / (n + 1);
  const quantizeDomain = new Array(n).fill(0).map((_, i) => step * (i + 1));
  return createThreshold({ domain: quantizeDomain, range, ...rest });
}
