import { transform } from './transform';

export function rotate(context, theta) {
  transform('rotate', context, theta);
}
