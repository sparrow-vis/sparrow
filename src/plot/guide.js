export function inferGuides(scales, dimensions, options) {
  const { x: xScale, y: yScale, color: colorScale } = scales;
  const { x = {}, y = {}, color = {} } = options;
  const { display: dx = true } = x;
  const { display: dy = true } = y;
  const { display: dc = true } = color;

  return {
    ...(dx && xScale && { x: { ...merge(x, xScale), type: 'axisX' } }),
    ...(dy && yScale && { y: { ...merge(y, yScale), type: 'axisY' } }),
    ...(dc && colorScale && { color: {
      ...merge(color, colorScale),
      ...inferPosition(dimensions),
      type: inferLegendType(colorScale),
    } }),
  };
}

function merge(options, { domain, label }) {
  return { ...options, domain, label };
}

function inferLegendType({ type }) {
  switch (type) {
    case 'linear': case 'log': case 'time':
    case 'threshold': case 'quantile': case 'quantize':
      return 'legendRamp';
    default:
      return 'legendSwatches';
  }
}

function inferPosition({ x, y, paddingLeft }) {
  return { x: x + paddingLeft, y };
}
