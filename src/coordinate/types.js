export function isPolar(transforms) {
  const types = transforms
    .map((createTransform) => createTransform())
    .flat()
    .map((d) => d.type);
  return types.indexOf('polar') !== -1;
}

export function isTranspose(transforms) {
  const types = transforms
    .map((createTransform) => createTransform())
    .flat()
    .map((d) => d.type);
  const count = types.filter((d) => d === 'transpose').length;
  return count % 2 !== 0;
}
