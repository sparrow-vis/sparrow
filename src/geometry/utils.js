export function colline(p0, p1, p2, p3) {
  return equal(p0, p1) && equal(p2, p3);
}

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

export function arcPath(c, p0, p1, p2, p3) {
  const r = dist(c, p0);
  const r1 = dist(c, p2);
  return [
    ['M', p0[0], p0[1]],
    ['A', r, r, 0, 0, 1, p1[0], p1[1]],
    ['L', p2[0], p2[1]],
    ['A', r1, r1, 0, 0, 0, p3[0], p3[1]],
    ['Z'],
  ];
}
