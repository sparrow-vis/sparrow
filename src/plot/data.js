export function valuesOf(data, encodes, channels) {
  const values = Array.from(encodes, (encode) => ({
    channel: encode.channel,
    value: valueOf(data, encode),
  }));

  const names = new Set(encodes.map((d) => d.channel));
  for (const [key, { optional }] of Object.entries(channels)) {
    if (!optional && !names.has(key)) {
      throw new Error(`Missing encoding for ${key}.`);
    }
  }
  return values;
}

export function valueOf(data, {
  channel, transform, value, field,
}) {
  if (field !== undefined) return Array.from(data, (d) => d[field]);
  if (transform !== undefined) return Array.from(data, transform);
  if (value !== undefined) {
    const v = Array.from(data, () => value);
    v.constant = true;
    return v;
  }
  throw new Error(`Bad encoding for channel ${channel}.`);
}
