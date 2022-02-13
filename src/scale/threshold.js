import { bisect } from '../utils';

export function createThreshold({ domain, range }) {
  const n = Math.min(domain.length, range.length - 1);
  const scale = (x) => {
    const index = bisect(domain, x);
    return range[index === -1 ? n : index];
  };

  scale.thresholds = () => domain;
  return scale;
}
