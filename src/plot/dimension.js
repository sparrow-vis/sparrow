import { isPolar, isTranspose } from './coordinate';
import { measureTextByDOM } from './text';

export function calcDimensions({ x: xTicks, y: yTicks }, { x: xTitle, y: yTitle }, transforms, {
  width = 640,
  height = 480,
  marginLeft = 30,
  marginRight = 30,
  marginBottom = 40,
  marginTop = 40,
} = {}) {
  if (!isPolar(transforms)) {
    const ticks = isTranspose(transforms) ? xTicks : yTicks;
    const title = isTranspose(transforms) ? xTitle : yTitle;
    const texts = showTitle(title) ? [...ticks, title] : ticks;
    if (texts) marginLeft = calcMarginLeft(texts);
  }

  return {
    width,
    height,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    chartWidth: width - marginLeft - marginRight,
    chartHeight: height - marginTop - marginBottom,
  };
}

function calcMarginLeft(ticks) {
  const widths = ticks.map((d) => measureTextByDOM(d)[0]);
  return Math.max(...widths) + 20;
}

function showTitle(title) {
  return title !== undefined && title !== false;
}
