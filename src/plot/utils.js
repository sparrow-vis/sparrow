import { identity } from '../utils';

export function map(object, transform = identity) {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = transform(value, key);
    return obj;
  }, {});
}
