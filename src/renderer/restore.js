export function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}
