import { transform } from './transform';

export function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}
