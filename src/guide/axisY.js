import { firstOf, identity } from '../utils';
import { axisTop, axisLeft, axisCircular } from './axis';
import { gridCircular, gridHorizontal, gridRay, gridVertical } from './grid';
import { labelTopRight, labelUp } from './label';

export function axisY(renderer, scale, coordinate, {
  domain,
  tickCount = 5,
  formatter = identity,
  tickLength = 5,
  fontSize = 12,
  label,
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
    const ticks = values.map(tick((d) => [0, scale(d) + offset]));
    if (grid) gridHorizontal(renderer, ticks, coordinate([1, 0]));
    axisLeft(renderer, ticks, options);
    if (label) labelUp(renderer, label, firstOf(ticks), options);
    return;
  }

  if (isPolar && !isTranspose) {
    const ticks = values.map(tick((d) => [0, scale(d) + offset]));
    if (grid) gridCircular(renderer, ticks, center);
    axisLeft(renderer, ticks, options);
    return;
  }

  if (isPolar && isTranspose) {
    const ticks = values.map(tick((d) => [0, scale(d) + offset]));
    if (grid) gridRay(renderer, ticks, center);
    axisCircular(renderer, ticks, options);
    return;
  }

  const ticks = values.map(tick((d) => [0, scale(d) + offset]));
  if (grid) gridVertical(renderer, ticks, coordinate([1, 0]));
  axisTop(renderer, ticks, options);
  if (label) labelTopRight(renderer, label, firstOf(ticks), options);
}
