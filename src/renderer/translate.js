import { transform } from './transform';

export function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}
