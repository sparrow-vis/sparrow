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
  label,
}) {
  renderer.save();
  renderer.translate(x, y);

  if (label) {
    renderer.text({ text: label, x: 0, y: 0, fontWeight: 'bold', fontSize, textAnchor: 'start', dy: '1em' });
  }

  for (const [i, label] of Object.entries(domain)) {
    const color = scale(label);
    const legendX = width * i;
    const legendY = label ? swatchSize * 2 : 0;

    renderer.rect({
      x: legendX,
      y: legendY,
      width: swatchSize,
      height: swatchSize,
      stroke: color,
      fill: color,
    });
    const textX = legendX + marginLeft + swatchSize;
    const textY = legendY + swatchSize;
    renderer.text({ text: formatter(label), x: textX, y: textY, fill: 'currentColor', fontSize });
  }
  renderer.restore();
}
