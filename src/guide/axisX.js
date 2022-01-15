import { identity, lastOf } from '../utils';
import { axisBottom, axisLeft, axisCircular } from './axis';
import { gridCircular, gridHorizontal, gridRay, gridVertical } from './grid';
import { labelDown, labelBottomRight } from './label';

export function axisX(renderer, scale, coordinate, {
  domain,
  label,
  tickCount = 5,
  formatter = identity,
  tickLength = 5,
  fontSize = 12,
  grid = false,
}) {
  const isTranspose = coordinate.isTranspose();
  const isPolar = coordinate.isPolar();
  const center = coordinate.center();

  const options = { tickLength, fontSize, center };
  const offset = scale.bandWidth ? scale.bandWidth() / 2 : 0;
  const values = scale.ticks ? scale.ticks(tickCount) : domain;
  const tick = (point) => (d) => {
    const [x, y] = coordinate(point(d));
    const text = formatter(d);
    return { x, y, text };
  };

  if (!isPolar && !isTranspose) {
    const ticks = values.map(tick((d) => [scale(d) + offset, 1]));
    if (grid) gridVertical(renderer, ticks, coordinate([0, 0]));
    axisBottom(renderer, ticks, options);
    if (label) labelBottomRight(renderer, label, lastOf(ticks), options);
    return;
  }

  if (!isPolar && isTranspose) {
    const ticks = values.map(tick((d) => [scale(d) + offset, 1]));
    if (grid) gridHorizontal(renderer, ticks, coordinate([0, 0]));
    axisLeft(renderer, ticks, options);
    if (label) labelDown(renderer, label, lastOf(ticks), options);
  }

  if (isPolar && !isTranspose) {
    const ticks = values.map(tick((d) => [scale(d) + offset, 0]));
    if (grid) gridRay(renderer, ticks, center);
    axisCircular(renderer, ticks, options);
    return;
  }

  if (isPolar && isTranspose) {
    const ticks = values.map(tick((d) => [scale(d) + offset, 1]));
    if (grid) gridCircular(renderer, ticks, center);
    axisLeft(renderer, ticks, options);
  }
}
