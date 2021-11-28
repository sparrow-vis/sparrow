import {
  axisBottomOptions, axisLeftOptions, ticksOf, axis, showTitle, titleOf,
} from './axis';

export function axisX({
  renderer, scale, values, coordinate, title, tickLength = 5,
}) {
  const y = coordinate.isPolar() ? 0 : 1;
  const ticks = ticksOf(values, scale, coordinate, false, y);
  const isCircular = coordinate.isPolar() && !coordinate.isTranspose();
  const isVertical = coordinate.isTranspose();
  const axisOptions = isVertical
    ? axisLeftOptions(tickLength)
    : axisBottomOptions(tickLength);

  axis({
    renderer,
    ticks,
    values,
    coordinate,
    isCircular,
    isVertical,
    ...axisOptions,
  });

  if (showTitle(title, coordinate)) {
    const direction = isVertical ? 'down' : 'right';
    const [point, text] = titleOf([1, y], coordinate, title, direction);
    const {
      x2, y2, horizontalDy, verticalDy,
    } = axisOptions;
    const dy = isVertical ? verticalDy : horizontalDy;

    renderer.text({
      x: point[0] + x2,
      y: point[1] + y2,
      text,
      fontSize: 12,
      textAnchor: 'end',
      dy: `${dy + 1}em`,
    });
  }
}
