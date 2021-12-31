export function createOrdinal({ domain, range }) {
  const key = JSON.stringify;
  const indexMap = new Map(domain.map((d, i) => [key(d), i]));
  return (x) => {
    const index = indexMap.get(key(x));
    return range[index % range.length];
  };
}
