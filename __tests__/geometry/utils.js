import {
  cartesian, createCoordinate,
} from '../../src/coordinate';
import { createRenderer } from '../../src/renderer';
import { createDiv, mount } from '../utils';

export function plot({
  index,
  width = 600,
  height = 400,
  scales,
  channels,
  styles,
  geometry,
  transforms = [cartesian()],
  get = (d) => d[0],
}) {
  const renderer = createRenderer(width, height);
  const coordinate = createCoordinate({
    width,
    height,
    x: 0,
    y: 0,
    transforms,
  });
  const shapes = geometry(renderer, index, scales, channels, styles, coordinate);
  mount(createDiv(), renderer.node());
  const shape = get(shapes);
  return {
    toHasAttributes(expectedAttributes) {
      const keys = Object.keys(expectedAttributes);
      const renderedAttributes = keys.reduce(
        (obj, key) => (obj[key] = shape.getAttribute(key), obj),
        {},
      );
      if (keys.indexOf('tagName') !== -1) {
        renderedAttributes.tagName = shape.tagName;
      }
      expect(renderedAttributes).toEqual(expectedAttributes);
    },
  };
}
