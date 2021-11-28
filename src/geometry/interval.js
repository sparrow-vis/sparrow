import {
  createColorChannel, createLabelChannel, createXChannel, createYChannel,
} from './channel';
import { fromStyles, rect, rectLabel } from './utils';

export function createInterval() {
  const render = ({
    renderer, index, values, directStyles, scales, coordinate,
  }) => {
    const {
      fill: F, stroke: S, x: X, y: Y, y1: Y1, label: L,
    } = values;
    const { x } = scales;
    const width = x ? x.bandWidth() : 1;
    return index.map((i) => {
      const vx = X[i] || 0;
      const label = L && L[i];
      const styles = {
        ...directStyles,
        ...(S && { stroke: S[i] }),
        ...(F && { fill: F[i] }),
      };
      const [geometryStyles, labelStyles] = fromStyles(styles);
      const v0 = [vx, Y[i]];
      const v1 = [v0[0] + width, v0[1]];
      const v2 = [v1[0], Y1[i]];
      const v3 = [v0[0], Y1[i]];
      const points = [v0, v1, v2, v3];
      const rects = rect(renderer, points, coordinate, geometryStyles);
      if (label !== undefined) rectLabel(renderer, label, points, coordinate, labelStyles);
      return rects;
    });
  };

  render.channels = () => ({
    x: createXChannel({ name: 'x', scaleType: 'band', optional: false }),
    y: createYChannel({ name: 'y', optional: false }),
    y1: createYChannel({ name: 'y1', optional: false }),
    fill: createColorChannel({ name: 'fill' }),
    stroke: createColorChannel({ name: 'stroke' }),
    label: createLabelChannel({ name: 'label' }),
  });

  return render;
}
