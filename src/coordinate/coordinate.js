import { compose, identity } from './utils';

export function createCoordinate({
  transforms: createTransforms = [], ...options
}) {
  const coordinates = createTransforms
    .map((createTransform) => createTransform(options))
    .flat();

  const types = coordinates.map((d) => d.type);
  const transforms = coordinates.map((d) => d.transform);
  const output = transforms.length ? compose(...transforms) : identity;

  output.isPolar = () => types.indexOf('polar') !== -1;
  output.isTranspose = () => {
    const count = types.filter((d) => d === 'transpose').length;
    return count % 2 !== 0;
  };

  return output;
}
