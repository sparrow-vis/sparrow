export function patchEncode(type, encode) {
  if (type === 'interval') return inferInterval(encode);
  return encode;
}

function inferInterval(encode) {
  const patchEncode = [...encode];
  if (!has(encode, 'y1')) patchEncode.push({ channel: 'y1', value: 0 });
  if (!has(encode, 'x')) patchEncode.push({ channel: 'x', value: 0 });
  return patchEncode;
}

function has(encode, channel) {
  return encode.findIndex((d) => d.channel === channel) !== -1;
}
