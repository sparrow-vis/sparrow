export function identity(x) {
  return x;
}

export function compose(...fns) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity);
}

export function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
}

export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

export function floor(n, base) {
  return base * Math.floor(n / base);
}

export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}

export function log(n, base) {
  return Math.log(n) / Math.log(base);
}

export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

export function map(object, transform = identity) {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = transform(value, key);
    return obj;
  }, {});
}

export function assignDefined(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) target[key] = value;
  }
}

export function random(a = 0, b = 1) {
  return a + (b - a) * Math.random();
}

export function defined(d) {
  return d !== undefined && !Number.isNaN(d);
}
