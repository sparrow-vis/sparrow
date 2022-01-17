import { bisect } from '../utils';

export function createThreshold({ domain, range }) {
  const n = Math.min(domain.length, range.length - 1);
  return (x) => {
    // const index = domain.findIndex((v) => x < v);
    const index = bisect(domain, x);
    return range[index === -1 ? n : index];
  };
}
