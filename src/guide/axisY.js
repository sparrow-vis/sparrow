import {
  axis, axisBottomOptions, axisLeftOptions, axisTopOptions, ticksOf, titleOf, showTitle,
} from './axis';

export function axisY({
  renderer, scale, values, coordinate, title, tickLength = 5,
}) {
  const ticks = ticksOf(values, scale, coordinate, true, 0);
  const isCircular = coordinate.isPolar() && coordinate.isTranspose();
  const isVertical = !coordinate.isTranspose();
  const axisOptions = isCircular
    ? axisBottomOptions(tickLength)
    : isVertical
      ? axisLeftOptions(tickLength)
      : axisTopOptions(tickLength);

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
    const direction = isVertical ? 'up' : 'right';
    const [point, text] = titleOf([0, 0], coordinate, title, direction);
    const {
      x2, y2, verticalDy, horizontalDy,
    } = axisOptions;
    const dy = isVertical ? verticalDy : horizontalDy;
    renderer.text({
      x: point[0] + x2,
      y: point[1] + y2,
      text,
      fontSize: 12,
      textAnchor: 'end',
      dy: `${dy - 1.5}em`,
    });
  }
}
