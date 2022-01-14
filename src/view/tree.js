export function descendants(root) {
  const discovered = [root];
  const nodes = [];
  while (discovered.length) {
    const node = discovered.pop();
    nodes.push(node);
    discovered.push(...(node.children || []));
  }
  return nodes;
}
