export function equal([x0, y0], [x1, y1]) {
  return closeTo(x0, x1) && closeTo(y0, y1);
}

export function closeTo(x, y, tol = 1e-5) {
  return Math.abs(x - y) < tol;
}

export function dist([x0, y0], [x1 = 0, y1 = 0] = []) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

export function sub([x1, y1], [x0, y0]) {
  return [x1 - x0, y1 - y0];
}

export function angleBetween(v0, v1) {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a0 < a1) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
}

export function angle([x, y]) {
  const theta = Math.atan2(y, x);
  return theta;
}

export function degree(radian) {
  return (radian * 180) / Math.PI;
}

export function unique(points, x = (d) => d[0], y = (d) => d[1]) {
  const overlap = (a, b) => closeTo(x(a), x(b)) && closeTo(y(a), y(b));
  return points.filter((d, index) => points.findIndex((p) => overlap(d, p)) === index);
}
