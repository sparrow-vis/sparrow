export function band({ domain, range, padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding);
  const bandWidth = step * (1 - padding);
  const interval = step - bandWidth;
  const x = (_, i) => r0 + interval + step * i;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x),
  };
}

export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}

export function log(n, base) {
  return Math.log(n) / Math.log(base);
}

export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}
