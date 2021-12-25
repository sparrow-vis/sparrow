export function group(array, key = (d) => d) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}
