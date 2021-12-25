export function createChannel({ optional = true, ...rest }) {
  return { optional, ...rest };
}

export function createXChannel(options) {
  return createChannel({ scale: 'x', ...options });
}

export function createYChannel(options) {
  return createChannel({ scale: 'y', ...options });
}

export function createColorChannel(options) {
  return createChannel({ scale: 'color', ...options });
}

export function createChannels(options) {
  return {
    x: createXChannel({ name: 'x', optional: false }),
    y: createYChannel({ name: 'y', optional: false }),
    fill: createColorChannel({ name: 'fill' }),
    stroke: createColorChannel({ name: 'stroke' }),
    ...options,
  };
}
