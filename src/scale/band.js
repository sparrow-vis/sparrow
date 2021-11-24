import { createOrdinal } from './ordinal';

export function createBand(options) {
  const { bandRange, bandWidth, step } = band(options);
  const scale = createOrdinal({ ...options, range: bandRange });

  scale.getBandWidth = () => bandWidth;
  scale.getStep = () => step;

  return scale;
}

function band({ domain, range, padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding);
  const bandWidth = step * (1 - padding);
  const interval = step - bandWidth;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map((_, i) => r0 + interval + step * i),
  };
}
