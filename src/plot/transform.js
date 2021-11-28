export function percentage(data, key) {
  const total = data.map(key).reduce((sum, d) => sum + d);
  return (d) => key(d) / total;
}
