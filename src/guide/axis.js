import { identity, lastOf } from '../utils';

export function createAxis(components) {
  return (
    renderer,
    scale,
    coordinate,
    {
      domain,
      label,
      tickCount = 10,
      formatter = identity,
      tickLength = 5,
      grid = false,
      tick = true,
    },
  ) => {
    if (domain.length === 0) return;
    const fontSize = 10;
    const isOrdinal = !!scale.bandWidth;
    const isQuantitative = !!scale.ticks;
    const offset = isOrdinal ? scale.bandWidth() / 2 : 0;
    const values = isQuantitative ? scale.ticks(tickCount) : domain;

    const center = coordinate.center();
    const type = `${+coordinate.isPolar()}${+coordinate.isTranspose()}`;
    const options = { tickLength, fontSize, center, isOrdinal };

    const { grid: Grid, ticks: Ticks, label: Label, start, end } = components[type];
    const ticks = values.map((d) => {
      const [x, y] = coordinate(start(d, scale, offset));
      const text = formatter(d);
      return { x, y, text };
    });
    const labelTick = (() => {
      if (!isOrdinal) return lastOf(ticks);
      const value = lastOf(values);
      const [x, y] = coordinate(start(value, scale, offset * 2));
      return { x, y };
    })();

    if (grid && Grid) Grid(renderer, ticks, end(coordinate));
    if (tick && Ticks) Ticks(renderer, ticks, options);
    if (label && Label) Label(renderer, label, labelTick, options);
  };
}
