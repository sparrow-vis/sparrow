export function group(data, key) {
  const groups = new Map();
  for (const d of data) {
    const k = key(d);
    if (groups.has(k)) {
      const values = groups.get(k);
      values.push(d);
    } else {
      groups.set(k, [d]);
    }
  }
  return groups;
}
