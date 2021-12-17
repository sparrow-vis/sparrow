import {
  angle, sub, fromDegree, equal,
} from '../utils';

export function axis({
  renderer,
  ticks,
  values,
  coordinate,
  isCircular,
  isVertical,
  verticalDy,
  circularDy,
  horizontalDy,
  ...options
}) {
  for (let i = 0; i < ticks.length; i += 1) {
    const [x, y] = ticks[i];
    const label = values[i];
    const [tickRotation, textRotation] = isCircular ? rotationOf([x, y], coordinate) : [0, 0];
    const dy = isVertical
      ? verticalDy
      : isCircular && textRotation
        ? circularDy
        : horizontalDy;

    tick({
      renderer,
      x,
      y,
      dy,
      label,
      tickRotation,
      textRotation,
      ...options,
    });
  }
}

export function tick({
  renderer,
  x,
  y,
  x2,
  y2,
  dx = 0,
  dy = 0,
  label = '',
  textRotation = 0,
  tickRotation = 0,
  textAnchor = 'middle',
  fontSize = '12',
}) {
  renderer.save();
  renderer.translate(x, y);
  renderer.rotate(fromDegree(tickRotation));

  renderer.line({
    x1: 0, y1: 0, x2, y2, stroke: 'currentColor', fill: 'currentColor',
  });

  renderer.save();
  renderer.translate(x2, y2);
  renderer.rotate(fromDegree(textRotation));

  renderer.text({
    text: `${label}`, x: 0, y: 0, textAnchor, dy: `${dy}em`, dx: `${dx}em`, fontSize, fill: 'currentColor',
  });
  renderer.restore();
  renderer.restore();
}

export function ticksOf(values, scale, coordinate, isVertical, y) {
  const offset = scale.bandWidth ? scale.bandWidth() / 2 : 0;
  const points = values.map((d) => {
    const x = scale(d) + offset;
    return isVertical ? [y, x] : [x, y];
  });
  const ticks = points.map(coordinate);
  return ticks.filter(
    (d, index) => ticks.findIndex((a) => equal(d, a)) === index,
  );
}

export function titleOf([x, y], coordinate, title, direction) {
  const [tx, ty] = coordinate([x, y]);
  const formatter = (d) => {
    if (direction === 'up') return `↑ ${d}`;
    if (direction === 'right') return `${d} →`;
    return `↓ ${d}`;
  };
  return [[tx, ty], formatter(title)];
}

export function rotationOf([x, y], coordinate) {
  const center = coordinate.center();
  const tickRotation = angle(sub([x, y], center));
  const textRotation = tickRotation < 0 ? Math.PI : 0;
  return [tickRotation - Math.PI / 2, textRotation];
}

export function axisBottomOptions(tickLength) {
  return {
    textAnchor: 'middle',
    x2: 0,
    y2: tickLength,
    dx: 0,
    verticalDy: 0.3,
    horizontalDy: 1,
    circularDy: -0.6,
  };
}

export function axisLeftOptions(tickLength) {
  return {
    textAnchor: 'end',
    x2: -tickLength,
    y2: 0,
    dx: -0.3,
    verticalDy: 0.3,
    horizontalDy: 1,
    circularDy: 0.6,
  };
}

export function axisTopOptions(tickLength) {
  return {
    textAnchor: 'middle',
    x2: 0,
    y2: -tickLength,
    dx: 0,
    verticalDy: 0.3,
    horizontalDy: -0.2,
    circularDy: -0.6,
  };
}

export function showTitle(title, coordinate) {
  return title !== undefined && title && !coordinate.isPolar();
}

export function addEm(a, b) {
  return `${parseFloat(a) + parseFloat(b)}em`;
}
