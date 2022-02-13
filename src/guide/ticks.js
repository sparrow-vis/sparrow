import { degree, angle, sub, unique } from '../utils';

export function ticksBottom(renderer, ticks, { tickLength, fontSize }) {
  for (const { x, y, text } of ticks) {
    const x2 = x;
    const y2 = y + tickLength;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' });
    renderer.text({ text, fontSize, x, y: y2, textAnchor: 'middle', dy: '1em', class: 'text' });
  }
}

export function ticksTop(renderer, ticks, { tickLength, fontSize }) {
  for (const { x, y, text } of ticks) {
    const x2 = x;
    const y2 = y - tickLength;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' });
    renderer.text({ text, fontSize, x, y: y2, textAnchor: 'middle', dy: '-0.3em', class: 'text' });
  }
}

export function ticksLeft(renderer, ticks, { tickLength, fontSize }) {
  for (const { x, y, text } of ticks) {
    const x2 = x - tickLength;
    const y2 = y;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' });
    renderer.text({ text, fontSize, x: x2, y, textAnchor: 'end', dy: '0.5em', dx: '-0.5em', class: 'text' });
  }
}

export function ticksCircular(renderer, ticks, { tickLength, fontSize, center }) {
  for (const { x, y, text } of unique(ticks, (d) => d.x, (d) => d.y)) {
    const { tickRotation, textRotation } = rotationOf(center, [x, y]);
    const [x2, y2] = [0, tickLength];
    const dy = textRotation === 0 ? '1.2em' : '-0.5em';

    renderer.save();
    renderer.translate(x, y);
    renderer.rotate(degree(tickRotation));

    renderer.line({
      x1: 0, y1: 0, x2, y2, stroke: 'currentColor', fill: 'currentColor', class: 'tick',
    });

    renderer.save();
    renderer.translate(x2, y2);
    renderer.rotate(degree(textRotation));

    renderer.text({
      text: `${text}`, x: 0, y: 0, textAnchor: 'middle', fontSize, fill: 'currentColor', dy, class: 'text',
    });
    renderer.restore();
    renderer.restore();
  }
}

function rotationOf(center, [x, y]) {
  const tickRotation = angle(sub([x, y], center));
  const textRotation = tickRotation < 0 ? Math.PI : 0;
  return { tickRotation: tickRotation - Math.PI / 2, textRotation };
}
