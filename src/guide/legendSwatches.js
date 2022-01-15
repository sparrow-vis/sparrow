import { identity } from '../utils';

export function legendSwatches(renderer, scale, coordinate, {
  x,
  y,
  width = 48,
  marginLeft = 12,
  swatchSize = 10,
  fontSize = 12,
  formatter = identity,
  domain,
}) {
  renderer.save();
  renderer.translate(x, y);
  for (const [i, label] of Object.entries(domain)) {
    const color = scale(label);
    const legendX = width * i + marginLeft;
    const legendY = y - swatchSize;
    renderer.rect({
      x: legendX,
      y: legendY,
      width: swatchSize,
      height: swatchSize,
      stroke: color,
      fill: color,
    });
    const textX = legendX + marginLeft + swatchSize;
    renderer.text({ text: formatter(label), x: textX, y, fill: 'currentColor', fontSize });
  }
  renderer.restore();
}
