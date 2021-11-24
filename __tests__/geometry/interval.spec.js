import {
  cartesian, createCoordinate, polar, transpose,
} from '../../src/coordinate';
import { createInterval } from '../../src/geometry';
import { createRenderer } from '../../src/renderer';
import { mount } from '../../src/renderer/utils';
import { createBand } from '../../src/scale';
import { createDiv, getAttributes } from '../utils';

describe('Test interval', () => {
  const width = 600;
  const height = 400;
  const index = [0, 1, 2];
  const directStyles = {
    stroke: 'black',
  };
  const scales = {
    x: createBand({
      domain: ['a', 'b', 'c'],
      range: [0, 1],
      padding: 0.2,
    }),
  };
  const values = {
    fill: ['red', 'blue', 'yellow'],
    x: [0, 1 / 3, 2 / 3],
    y: [0.6, 0.4, 0.2],
    y1: [1, 1, 1],
  };
  const interval = createInterval();

  test('channels', () => {
    const channels = interval.channels();
    expect(channels).toEqual({
      x: {
        name: 'x', type: 'position', optional: false, scaleType: 'band', scale: 'x',
      },
      y: {
        name: 'y', type: 'position', optional: false, scale: 'y',
      },
      y1: {
        name: 'y1', type: 'position', optional: true, scale: 'y',
      },
      fill: {
        name: 'fill', type: 'color', optional: true, scale: 'color',
      },
      stroke: {
        name: 'stroke', type: 'color', optional: true, scale: 'color',
      },
    });
  });

  test('cartesian', () => {
    const renderer = createRenderer(width, height);
    const coordinate = createCoordinate({
      width,
      height,
      x: 0,
      y: 0,
      transforms: [cartesian()],
    });

    const rects = interval({
      renderer,
      index,
      coordinate,
      directStyles,
      values,
      scales,
    });

    mount(createDiv(), renderer.node());

    const attributes = ['fill', 'x', 'y', 'stroke', 'width', 'height'];
    const r0 = rects[0];
    expect(r0.tagName).toBe('rect');
    expect(getAttributes(r0, attributes)).toEqual({
      stroke: 'black',
      fill: 'red',
      x: '0',
      y: '240',
      width: '150',
      height: '160',
    });
  });

  test('transpose', () => {
    const renderer = createRenderer(width, height);
    const coordinate = createCoordinate({
      width,
      height,
      x: 0,
      y: 0,
      transforms: [transpose(), cartesian()],
    });
    const rects = interval({
      renderer,
      index,
      coordinate,
      directStyles,
      values,
      scales,
    });
    const r0 = rects[0];
    expect(r0.tagName).toBe('rect');
    const attributes = ['fill', 'x', 'y', 'stroke', 'width', 'height'];
    expect(getAttributes(r0, attributes)).toEqual({
      stroke: 'black',
      fill: 'red',
      x: '0',
      y: '0',
      width: '240',
      height: '100',
    });
    mount(createDiv(), renderer.node());
  });

  test('polar', () => {
    const renderer = createRenderer(width, height);
    const coordinate = createCoordinate({
      width,
      height,
      x: 0,
      y: 0,
      transforms: [polar({
        startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1,
      }), cartesian()],
    });
    const paths = interval({
      renderer,
      index,
      coordinate,
      directStyles,
      values,
      scales,
    });
    const p0 = paths[0];

    const attributes = ['fill', 'stroke', 'd'];
    expect(p0.tagName).toBe('path');
    expect(getAttributes(p0, attributes)).toEqual({
      stroke: 'black',
      fill: 'red',
      d: 'M 404 200 A 104 104 0 0 1 300 304 L 300 240 A 40 40 0 0 0 340 200 Z',
    });

    mount(createDiv(), renderer.node());
  });

  test('donut', () => {
    const renderer = createRenderer(width, height);
    const coordinate = createCoordinate({
      width,
      height,
      x: 0,
      y: 0,
      transforms: [polar({
        startAngle: 0, endAngle: Math.PI * 2, innerRadius: 0.2, outerRadius: 1,
      }), cartesian()],
    });
    const circles = interval({
      renderer,
      index,
      coordinate,
      directStyles,
      values: {
        ...values,
        x: [0, 0, 0],
        y: [0, 1 / 3, 2 / 3],
        y1: [1 / 3, 2 / 3, 1],
      },
      scales: {},
    });

    const attributes = ['fill', 'stroke', 'cx', 'cy', 'r'];
    const c0 = circles[0];
    expect(c0.tagName).toBe('circle');
    expect(getAttributes(c0, attributes)).toEqual({
      stroke: 'black',
      fill: 'red',
      cx: '300',
      cy: '200',
      r: '199.99999999999994',
    });

    mount(createDiv(), renderer.node());
  });
});
