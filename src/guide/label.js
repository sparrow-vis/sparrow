export function labelLeftUp(renderer, label, tick, { fontSize }) {
  const { x, y } = tick;
  renderer.text({ text: `↑ ${label}`, x, y, fontSize, textAnchor: 'end', dy: '-1em', class: 'label' });
}

export function labelLeftDown(renderer, label, tick, { fontSize }) {
  const { x, y } = tick;
  renderer.text({ text: `↓ ${label}`, x, y, fontSize, textAnchor: 'end', dy: '2em', class: 'label' });
}

export function labelBottomRight(renderer, label, tick, { fontSize, tickLength }) {
  const { x, y } = tick;
  const ty = y + tickLength;
  renderer.text({ text: `${label} →`, x, y: ty, fontSize, textAnchor: 'end', dy: '2em', class: 'label' });
}

export function labelTopRight(renderer, label, tick, { fontSize, tickLength }) {
  const { x, y } = tick;
  const ty = y - tickLength;
  renderer.text({ text: `${label} →`, x, y: ty, fontSize, textAnchor: 'end', dy: '-1.2em', class: 'label' });
}
