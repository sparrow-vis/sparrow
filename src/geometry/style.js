export function channelStyles(index, channels) {
  const { stroke: S, fill: F } = channels;
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
}

export function groupChannels([index], channels) {
  return channelStyles(index, channels);
}
