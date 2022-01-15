export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
}

export function interpolateColor(t, d0, d1) {
  const [r0, g0, b0] = hexToRgb(d0);
  const [r1, g1, b1] = hexToRgb(d1);
  const r = interpolateNumber(t, r0, r1);
  const g = interpolateNumber(t, g0, g1);
  const b = interpolateNumber(t, b0, b1);
  return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
}

function hexToRgb(hex) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
  }
  return rgb;
}

function rgbToHex(r, g, b) {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`;
}
