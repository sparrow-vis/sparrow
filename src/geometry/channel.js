export function createChannel({ optional = true, ...rest }) {
  return { optional, ...rest };
}

export function createPositionChannel(options) {
  return createChannel({ type: 'position', ...options });
}

export function createXChannel(options) {
  return createPositionChannel({ scale: 'x', ...options });
}

export function createYChannel(options) {
  return createPositionChannel({ scale: 'y', ...options });
}

export function createColorChannel(options) {
  return createChannel({ scale: 'color', ...options, type: 'color' });
}
