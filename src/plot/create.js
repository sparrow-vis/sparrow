export function create(options) {
  if (typeof options === 'function') return options;
  throw new Error(`Unknown node type: ${options.type}`);
}
