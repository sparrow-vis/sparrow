export function range(data) {
  return data.map((_, i) => i);
}

export function fromObject(array, key, value) {
  return array.reduce((obj, item) => (obj[key(item)] = value(item), obj), {});
}

export function unique(array) {
  return array.filter(
    (d, index) => array.findIndex((a) => equal(d, a)) === index,
  );
}

export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function min(array, accessor) {
  return Math.min(...array.map(accessor));
}

export function max(array, accessor) {
  return Math.max(...array.map(accessor));
}
