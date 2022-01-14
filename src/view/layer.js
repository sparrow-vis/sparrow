export function computeLayerViews(box, node) {
  const { children = [] } = node;
  return new Array(children.length).fill(0).map(() => ({ ...box }));
}
