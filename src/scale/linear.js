import {
  normalize, tickStep, nice, floor, ceil, ticks,
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
  scale.nice = (tickCount) => {
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };

  return scale;
}

export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
}
