import { compose } from '../utils';

export function createCoordinate({
  transforms: coordinates = [],
  ...canvasOptions
}) {
  const transforms = coordinates.flatMap((coordinate) => coordinate(canvasOptions));
  const types = transforms.map((d) => d.type());
  const output = compose(...transforms);
  const { x, y, width, height } = canvasOptions;

  output.isPolar = () => types.indexOf('polar') !== -1;
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);
  output.center = () => [x + width / 2, y + height / 2];

  return output;
}
