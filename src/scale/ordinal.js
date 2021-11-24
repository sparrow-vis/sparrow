import { equal } from './utils';

export function createOrdinal({ domain, range }) {
  return (x) => {
    const index = domain.findIndex((d) => equal(d, x));
    return range[index % range.length];
  };
}
