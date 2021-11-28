export function measureTextByDOM(text, font = { fontSize: 12 }) {
  const span = createSpan();

  span.style.fontSize = `${font.fontSize}px`;
  span.style.fontFamily = font.fontFamily;
  span.style.fontWeight = font.fontWeight;
  span.style.fontStyle = font.fontStyle;
  span.style.fontVariant = font.fontVariant;

  span.innerHTML = text;

  return [span.clientWidth, span.clientHeight];
}

let measureTextSpan;
function createSpan() {
  if (measureTextSpan) return measureTextSpan;
  measureTextSpan = document.createElement('span');
  // 不显示在视窗
  measureTextSpan.style.visibility = 'hidden';
  measureTextSpan.style.position = 'absolute';
  measureTextSpan.style.display = 'inline';
  measureTextSpan.style.left = '-10000px';
  measureTextSpan.style.top = '-10000px';

  document.body.appendChild(measureTextSpan);

  return measureTextSpan;
}
