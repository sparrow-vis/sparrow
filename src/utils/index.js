export function identity(x) {
  return x;
}

export function compose(fn, ...rest) {
  return rest.reduce((total, cur) => (x) => cur(total(x)), fn);
}
