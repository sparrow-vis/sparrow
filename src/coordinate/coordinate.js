import { compose, identity } from './utils';

export function createCoordinate({
  transforms = [], ...options
}) {
  const coordinates = transforms
    .map((createTransform) => createTransform(options))
    .flat()
    .map((d) => d.transform);

  return coordinates.length ? compose(...coordinates) : identity;
}
