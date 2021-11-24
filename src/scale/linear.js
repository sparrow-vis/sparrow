import {
  interpolateNumber, normalize, tickStep, nice, floor, ceil, ticks,
} from './utils';

export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}) {
  const scale = (x) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };

  scale.ticks = (tickCount) => ticks(d0, d1, tickCount);

  return scale;
}

export function linearNice([min, max], tickCount) {
  const step = tickStep(min, max, tickCount);
  return nice([min, max], {
    floor: (x) => floor(x, step),
    ceil: (x) => ceil(x, step),
  });
}
