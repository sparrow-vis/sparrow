import { identity } from '../utils';

export function legendSwatches(renderer, scale, coordinate, {
  x,
  y,
  width = 64,
  marginLeft = 6,
  swatchSize = 10,
  fontSize = 10,
  formatter = identity,
  domain,
  label,
}) {
  renderer.save();
  renderer.translate(x, y);

  if (label) {
    renderer.text({ text: label, x: 0, y: 0, fontWeight: 'bold', fontSize, textAnchor: 'start', dy: '1em' });
  }

  const legendY = label ? swatchSize * 2 : 0;
  for (const [i, t] of Object.entries(domain)) {
    const color = scale(t);
    const legendX = width * i;

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
    renderer.text({ text: formatter(t), x: textX, y: textY, fill: 'currentColor', fontSize });
  }
  renderer.restore();
}
