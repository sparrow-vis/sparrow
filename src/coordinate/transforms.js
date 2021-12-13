import { createLinear } from '../scale';

export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

export function polar(
  {
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
  },
) {
  const radius = createLinear({
    domain: [0, 1],
    range: [innerRadius, outerRadius],
  });
  const angle = createLinear({
    domain: [0, 1],
    range: [startAngle, endAngle],
  });
  return transform('polar', ([px, py]) => {
    const theta = angle(px);
    const r = radius(py);
    const vx = r * Math.cos(theta);
    const vy = r * Math.sin(theta);
    return [vx, vy];
  });
}

export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
}

export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
}

export function reflect() {
  return transform('reflect', (point) => scale(-1, -1)(point));
}

export function reflectX() {
  return transform('reflectX', (point) => scale(-1, 1)(point));
}

export function reflectY() {
  return transform('reflectY', (point) => scale(1, -1)(point));
}

function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}
