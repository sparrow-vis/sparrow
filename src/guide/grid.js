import { dist } from '../utils';

export function gridVertical(renderer, ticks, start) {
  const [, y2] = start;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2: x, y2, stroke: '#eee', class: 'grid' });
  }
}

export function gridHorizontal(renderer, ticks, end) {
  const [x2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2: y, stroke: '#eee', class: 'grid' });
  }
}

export function gridRay(renderer, ticks, center) {
  const [x2, y2] = center;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2, stroke: '#eee', class: 'grid' });
  }
}

export function gridCircular(renderer, ticks, center) {
  const [cx, cy] = center;
  for (const { x, y } of ticks) {
    const r = dist(center, [x, y]);
    renderer.circle({ fill: 'none', stroke: '#eee', cx, cy, r, class: 'grid' });
  }
}
