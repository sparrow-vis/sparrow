import { compose, identity } from '../utils';

export function createCoordinate({
  x, y, width, height,
  transforms: createTransforms,
}) {
  const coordinates = createTransforms
    .map((createTransform) => createTransform({
      x, y, width, height,
    }))
    .flat();

  const types = coordinates.map((d) => d.type);
  const transforms = coordinates.map((d) => d.transform);
  const output = transforms.length ? compose(...transforms) : identity;

  output.isPolar = () => types.indexOf('polar') !== -1;

  output.isTranspose = () => {
    const count = types.filter((d) => d === 'transpose').length;
    return count % 2 !== 0;
  };

  output.getCenter = () => {
    const cx = x + width / 2;
    const cy = y + height / 2;
    return [cx, cy];
  };

  return output;
}
