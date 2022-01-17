import { group } from '../utils';

export function computeFacetViews(box, { data, encodings = {}, padding = 40 }) {
  const { x, y } = encodings;
  const cols = x ? Array.from(group(data, (d) => d[x]).keys()) : [undefined];
  const rows = y ? Array.from(group(data, (d) => d[y]).keys()) : [undefined];
  const n = cols.length;
  const m = rows.length;
  const views = [];
  const boxWidth = (box.width - padding * (n + 1)) / n;
  const boxHeight = (box.height - padding * (m + 1)) / m;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      const transform = (data) => {
        const inRow = (d) => d[x] === cols[i] || cols[i] === undefined;
        const inCol = (d) => d[y] === rows[j] || rows[j] === undefined;
        return data.filter((d) => inRow(d) && inCol(d));
      };
      views.push({
        x: box.x + padding * (i + 1) + i * boxWidth,
        y: box.y + padding * (j + 1) + j * boxHeight,
        width: boxWidth,
        height: boxHeight,
        transform,
      });
    }
  }
  return views;
}
