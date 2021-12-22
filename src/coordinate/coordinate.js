import { compose } from '../utils';

export function createCoordinate({
  x, y, width, height,
  transforms: coordinates = [],
}) {
  const transforms = coordinates
    .map((coordinate) => coordinate({ x, y, width, height }))
    .flat();
  const types = transforms.map((d) => d.type());
  const output = compose(...transforms);

  output.isPolar = () => types.indexOf('polar') !== -1;
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);
  output.center = () => [x + width / 2, y + height / 2];

  return output;
}
