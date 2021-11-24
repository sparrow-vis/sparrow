import { translate, scale, reflectY } from './affine';
import { createLinear } from '../scale';

export function polar(options) {
  return ({ width, height }) => {
    const aspect = width / height;
    const sx = aspect > 1 ? 1 / aspect : 1;
    const sy = aspect > 1 ? 1 : aspect;
    return [
      translate(0, -0.5),
      reflectY(),
      translate(0, 0.5),
      transform(options),
      scale(sx, sy),
      scale(0.5, 0.5),
      translate(0.5, 0.5),
    ];
  };
}

function transform(
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
  return {
    type: 'polar',
    transform: ([px, py]) => {
      const theta = angle(px);
      const r = radius(py);
      const vx = r * Math.cos(theta);
      const vy = r * Math.sin(theta);
      return [vx, vy];
    },
  };
}
