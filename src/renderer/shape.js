import { applyAttributes, createSVGElement, mount } from '../utils';

export function line(context, attributes) {
  return shape('line', context, attributes);
}

export function rect(context, attributes) {
  const { width, height, x, y } = attributes;

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

export function path(context, attributes) {
  const { d } = attributes;
  const path = Array.isArray(d) ? d.flat().join(' ') : d;
  return shape('path', context, { ...attributes, d: path });
}

export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
}

export function shape(type, context, attributes) {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);
  mount(group, el);
  return el;
}
