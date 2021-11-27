import {
  colline, dist, arcPath, sub,
} from './utils';

export function rect(renderer, [v0, v1, v2, v3], styles, coordinate) {
  if (!coordinate.isPolar()) {
    const [p0, p2] = [v0, v2].map(coordinate);
    const [w, h] = sub(p2, p0);
    return renderer.rect({
      ...styles,
      x: p0[0],
      y: p0[1],
      width: w,
      height: h,
    });
  }

  const center = coordinate.getCenter();
  const vs = coordinate.isTranspose()
    ? [v3, v0, v1, v2]
    : [v0, v1, v2, v3];
  const ps = vs.map(coordinate);

  if (!colline(...ps)) {
    const d = arcPath(center, ...ps);
    return renderer.path({
      ...styles,
      d,
    });
  }

  const r = dist(center, ps[0]);
  const r1 = dist(center, ps[2]);
  return cirque(renderer, center[0], center[1], r, r1, styles);
}

function cirque(renderer, x, y, r, r1, styles) {
  const { stroke, strokeWidth, fill } = styles;
  const innerStroke = renderer.circle({
    fill: 'transparent',
    stroke,
    strokeWidth,
    cx: x,
    cy: y,
    r: r1,
  });
  const ring = renderer.circle({
    ...styles,
    strokeWidth: r - r1 - (strokeWidth || 1),
    stroke: fill,
    fill: 'transparent',
    cx: x,
    cy: y,
    r: r1 + (r - r1) / 2,
  });
  const outerStroke = renderer.circle({
    fill: 'transparent',
    stroke,
    strokeWidth,
    cx: x,
    cy: y,
    r,
  });

  return [innerStroke, ring, outerStroke];

  // return renderer.circle();
}
