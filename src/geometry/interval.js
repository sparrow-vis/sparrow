import { createColorChannel, createXChannel, createYChannel } from './channel';
import {
  colline, dist, arcPath, sub,
} from './utils';

export function interval({
  renderer, context, index, values, directStyles, scales, coordinate,
}) {
  const {
    fill: F, stroke: S, x: X, y: Y, y1: Y1,
  } = values;
  const { x } = scales;
  const width = x ? x.bandWidth() : 1;
  return index.map((i) => {
    const vx = X[i] || 0;
    const styles = {
      ...directStyles,
      ...(S && { stroke: S[i] }),
      ...(F && { fill: F[i] }),
    };
    if (coordinate.isPolar()) {
      const c = coordinate.getCenter();
      const v0 = [vx, Y[i]];
      const v1 = [v0[0] + width, v0[1]];
      const v2 = [v1[0], Y1[i]];
      const v3 = [v0[0], Y1[i]];
      const ps = [v0, v1, v2, v3].map(coordinate);

      if (colline(...ps)) {
        const r = dist(c, ps[0]);
        return renderer.circle(context, {
          ...styles,
          cx: c[0],
          cy: c[1],
          r,
        });
      }
      const d = arcPath(c, ...ps);
      return renderer.path(context, {
        ...styles,
        d,
      });
    }
    const v0 = [vx, Y[i]];
    const v2 = [vx + width, Y1[i]];
    const [p0, p2] = [v0, v2].map(coordinate);
    const [w, h] = sub(p2, p0);
    return renderer.rect(context, {
      ...styles,
      x: p0[0],
      y: p0[1],
      width: w,
      height: h,
    });
  });
}

interval.channels = () => ({
  x: createXChannel({ name: 'x', scaleType: 'band', optional: false }),
  y: createYChannel({ name: 'y', optional: false }),
  y1: createYChannel({ name: 'y1' }),
  fill: createColorChannel({ name: 'fill' }),
  stroke: createColorChannel({ name: 'stroke' }),
});
