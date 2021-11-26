import { group } from './utils';

export function createStack({ x, y, y1 }) {
  return ([index, values]) => {
    const X = values[x];
    const Y = values[y];
    const stacks = Array.from(group(index, (i) => X[i]).values());
    const newY = new Array(index.length);
    const newY1 = new Array(index.length);
    for (const stack of stacks) {
      let py = 0;
      for (const i of stack) {
        newY1[i] = py;
        newY[i] = py + Y[i];
        py = newY[i];
      }
    }
    return [
      index,
      { ...values, [y]: newY, [y1]: newY1 },
    ];
  };
}
