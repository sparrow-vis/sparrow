import { dist } from '../utils';

export function gridVertical(renderer, ticks, end) {
  const [, y2] = end;
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

export function gridRay(renderer, ticks, end) {
  const [x2, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2, stroke: '#eee', class: 'grid' });
  }
}

export function gridCircular(renderer, ticks, end) {
  const [cx, cy] = end;
  for (const { x, y } of ticks) {
    const r = dist(end, [x, y]);
    renderer.circle({ fill: 'none', stroke: '#eee', cx, cy, r, class: 'grid' });
  }
}
