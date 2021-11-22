export function createOrdinal({ domain, range }) {
  return (x) => {
    const index = domain.findIndex((d) => equal(d, x));
    return range[index % range.length];
  };
}

export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
