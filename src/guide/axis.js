import { identity } from '../utils';

export function createAxis(components, labelOf) {
  return (renderer, scale, coordinate, {
    domain,
    label,
    tickCount = 5,
    formatter = identity,
    tickLength = 5,
    fontSize = 12,
    grid = false,
  }) => {
    const offset = scale.bandWidth ? scale.bandWidth() / 2 : 0;
    const values = scale.ticks ? scale.ticks(tickCount) : domain;

    const center = coordinate.center();
    const type = `${+coordinate.isPolar()}${+coordinate.isTranspose()}`;
    const options = { tickLength, fontSize, center };

    const { grid: Grid, ticks: Ticks, label: Label, start, end } = components[type];
    const ticks = values.map((d) => {
      const [x, y] = coordinate(start(d, scale, offset));
      const text = formatter(d);
      return { x, y, text };
    });

    if (grid && Grid) Grid(renderer, ticks, end(coordinate));
    Ticks(renderer, ticks, options);
    if (label && Label) Label(renderer, label, labelOf(ticks), options);
  };
}
