import { applyAttributes, createSVGElement, mount } from './utils';

export function shape(type, context, attributes) {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);
  mount(group, el);
  return el;
}

export function line(context, attributes) {
  return shape('line', context, attributes);
}

export function rect(context, attributes) {
  return shape('rect', context, attributes);
}

export function path(context, attributes) {
  return shape('path', context, attributes);
}

export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

export function text(context, attributes) {
  return shape('text', context, attributes);
}
