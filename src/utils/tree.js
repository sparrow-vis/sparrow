export function descendants(root) {
  const nodes = [];
  const push = (d) => nodes.push(d);
  bfs(root, push);
  return nodes;
}

export function bfs(root, callback) {
  const discovered = [root];
  while (discovered.length) {
    const node = discovered.pop();
    callback(node);
    discovered.push(...(node.children || []));
  }
}
