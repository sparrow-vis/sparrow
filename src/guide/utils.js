import { angle, sub, closeTo } from '../utils';

export function rotationOf(center, [x, y]) {
  const tickRotation = angle(sub([x, y], center));
  const textRotation = tickRotation < 0 ? Math.PI : 0;
  return { tickRotation: tickRotation - Math.PI / 2, textRotation };
}

export function unique(points) {
  const overlap = (a, b) => closeTo(a.x, b.x) && closeTo(a.y, b.y);
  return points.filter((d, index) => points.findIndex((p) => overlap(d, p)) === index);
}
