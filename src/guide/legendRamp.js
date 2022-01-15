import { createLinear } from '../scale';
import { identity } from '../utils';
import { axisBottom } from './axis';

export function legendRamp(renderer, scale, coordinate, {
  x,
  y,
  width = 120,
  height = 10,
  domain,
  tickCount = 5,
  tickLength = 5,
  marginTop = 5,
  formatter = identity,
  fontSize = 12,
}) {
  const value = createLinear({ domain: [0, width], range: domain });
  const position = createLinear({ domain, range: [0, width] });
  renderer.save();
  renderer.translate(x, y);

  for (let i = 0; i < width; i += 1) {
    const stroke = scale(value(i));
    renderer.line({ x1: i, y1: 0, x2: i, y2: height, stroke });
  }

  const axisY = height + marginTop;
  renderer.line({ x1: 0, y1: axisY, x2: width, y2: axisY, stroke: 'currentColor' });

  const values = position.ticks(tickCount);
  const ticks = values.map((d) => ({
    x: position(d),
    y: axisY,
    text: formatter(d),
  }));
  axisBottom(renderer, ticks, { fontSize, tickLength });

  renderer.restore();
}
