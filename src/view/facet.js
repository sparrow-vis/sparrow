import { group } from '../utils';

export function computeFacetViews(box, { data, x, y, padding = 10 }) {
  const cols = x ? Array.from(group(data, (d) => d[x]).keys()) : [undefined];
  const rows = y ? Array.from(group(data, (d) => d[y]).keys()) : [undefined];
  const views = [];
  const boxWidth = (box.width - padding * (cols.length + 1)) / cols.length;
  const boxHeight = (box.height - padding * (rows.length + 1)) / rows.length;
  for (let i = 0; i < cols.length; i += 1) {
    for (let j = 0; j < rows.length; j += 1) {
      const transform = (data) => {
        const inRow = (d) => d[x] === cols[i] || cols[i] === undefined;
        const inCol = (d) => d[y] === rows[j] || rows[j] === undefined;
        return data.filter((d) => inRow(d) && inCol(d));
      };
      views.push({
        x: padding * (i + 1) + i * boxWidth,
        y: padding * (j + 1) + j * boxHeight,
        width: boxWidth,
        height: boxHeight,
        transform,
      });
    }
  }
  return views;
}
