import { createOrdinal } from './ordinal';

export function createBand(options) {
  const { bandRange, bandWidth, step } = band(options);
  const scale = createOrdinal({ ...options, range: bandRange });

  scale.bandWidth = () => bandWidth;
  scale.step = () => step;

  return scale;
}

function band({ domain, range, padding, margin = padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (margin * 2 + n - padding);
  const bandWidth = step * (1 - padding);
  const x = (_, i) => r0 + margin * step + step * i;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x),
  };
}
