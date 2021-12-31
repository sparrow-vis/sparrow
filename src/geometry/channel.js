export function createChannel({
  name,
  optional = true,
  ...rest
}) {
  return { name, optional, ...rest };
}

export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }),
    y: createChannel({ name: 'y', optional: false }),
    stroke: createChannel({ name: 'stroke' }),
    fill: createChannel({ name: 'fill' }),
    ...options,
  };
}
