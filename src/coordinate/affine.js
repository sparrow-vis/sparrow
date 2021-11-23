export function translate(tx = 0, ty = 0) {
  return {
    type: 'translate',
    transform: ([px, py]) => [px + tx, py + ty],
  };
}

export function reflect() {
  return {
    type: 'reflect',
    transform: ([px, py]) => [px * -1, py * -1],
  };
}

export function reflectX() {
  return {
    type: 'reflectX',
    transform: ([px, py]) => [px * -1, py],
  };
}

export function reflectY() {
  return {
    type: 'reflectY',
    transform: ([px, py]) => [px, py * -1],
  };
}

export function scale(sx = 1, sy = 1) {
  return {
    type: 'scale',
    transform:
    ([px, py]) => [px * sx, py * sy],
  };
}
