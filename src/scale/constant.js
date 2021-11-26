export function createConstant({ domain: [d] }) {
  return () => d;
}
