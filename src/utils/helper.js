export function identity(x) {
  return x;
}

export function compose(fn, ...rest) {
  return rest.reduce((total, cur) => (x) => cur(total(x)), fn);
}

export function curry(fn) {
  return function curried(...args) {
    if (args.length === 0) args = [undefined];
    if (args.length >= fn.length) return fn(...args);
    return (...rest) => curried(...args, ...rest);
  };
}
