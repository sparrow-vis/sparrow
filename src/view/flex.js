export function computeFlexViews(box, node) {
  const { type, children, flex = children.map(() => 1), padding = 40 } = node;
  const mainStart = type === 'col' ? 'y' : 'x';
  const mainSize = type === 'col' ? 'height' : 'width';
  const crossSize = type === 'col' ? 'width' : 'height';
  const crossStart = type === 'col' ? 'x' : 'y';

  const sum = flex.reduce((total, value) => total + value);
  const totalSize = box[mainSize] - padding * (children.length - 1);
  const sizes = flex.map((value) => totalSize * (value / sum));

  let next = box[mainStart];

  return sizes.map((size) => {
    const childBox = {
      [mainStart]: next,
      [mainSize]: size,
      [crossStart]: box[crossStart],
      [crossSize]: box[crossSize],
    };
    next += size + padding;
    return childBox;
  });
}
