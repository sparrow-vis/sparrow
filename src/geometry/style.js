export function channelStyles(index, channels) {
  const { stroke: S, fill: F } = channels;
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
}

export function groupChannelStyles([index], channels) {
  return channelStyles(index, channels);
}
