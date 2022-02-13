import { createViews } from '../../src/view/view';
import { createRenderer } from '../../src/renderer/renderer';
import { mount, createDiv } from '../utils';

function renderViews(views, width = 640, height = 480) {
  const renderer = createRenderer(width, height);
  mount(createDiv(), renderer.node());
  return views.map(([{ x, y, width, height }]) => renderer.rect({ x, y, width, height, stroke: 'black', fill: 'none' }));
}

describe('createViews', () => {
  test('basic container', () => {
    const views = createViews({});
    renderViews(views);

    expect(views.length).toBe(1);
    const [[view, [node]]] = views;
    expect(view).toEqual({ x: 30, y: 40, width: 540, height: 320 });
    expect(node).toEqual({});
  });

  test('layer container', () => {
    const views = createViews({
      type: 'layer',
      children: [{}, {}],
    });
    renderViews(views);

    expect(views.length).toBe(1);
    const [[view, nodes]] = views;
    expect(view).toEqual({ x: 30, y: 40, width: 540, height: 320 });
    expect(nodes.length).toBe(3);
  });

  test('row container', () => {
    const views = createViews({
      type: 'row',
      children: [{}, {}],
    });
    renderViews(views);
    expect(views.length).toBe(3);

    const [, [view, [node]]] = views;
    expect(view).toEqual({ height: 320, width: 250, x: 30, y: 40 });
    expect(node).toEqual({});
  });

  test('col container', () => {
    const views = createViews({
      type: 'col',
      padding: 20,
      flex: [1, 2, 1],
      children: [
        {}, {}, {},
      ],
    });
    renderViews(views);

    expect(views.length).toBe(4);

    const [, [view, [node]]] = views;
    expect(view).toEqual({ height: 70, width: 540, x: 30, y: 40 });
    expect(node).toEqual({});
  });

  test('flex container', () => {
    const views = createViews({
      type: 'row',
      children: [
        {},
        { type: 'col', children: [{}, {}] },
      ],
    });
    renderViews(views);

    expect(views.length).toBe(5);
    const [, , , [view, [node]]] = views;
    expect(view).toEqual({ height: 140, width: 250, x: 320, y: 40 });
    expect(node).toEqual({});
  });

  test('facet container with specified x', () => {
    const data = [
      { sex: 'male', skin: 'white' },
      { sex: 'male', skin: 'black' },
      { sex: 'female', skin: 'white' },
      { sex: 'female', skin: 'yellow' },
    ];
    const views = createViews({
      type: 'facet',
      encodings: {
        x: 'sex',
      },
      data,
      children: [{}],
    });
    renderViews(views);

    expect(views.length).toBe(3);
    const [, [view, [node]]] = views;
    const { transform, ...rest } = view;
    expect(rest).toEqual({ height: 240, width: 210, x: 70, y: 80 });
    expect(node).toEqual({});
    expect(transform(data)).toEqual([
      { sex: 'male', skin: 'white' },
      { sex: 'male', skin: 'black' },
    ]);
  });

  test('facet container with specified y', () => {
    const data = [
      { sex: 'male', skin: 'white' },
      { sex: 'male', skin: 'black' },
      { sex: 'female', skin: 'white' },
      { sex: 'female', skin: 'yellow' },
    ];
    const views = createViews({
      type: 'facet',
      encodings: {
        y: 'skin',
      },
      data,
      children: [{}, {}],
    });
    renderViews(views);

    expect(views.length).toBe(4);
    const [, [view, [node]]] = views;
    const { transform, ...rest } = view;
    expect(rest).toEqual({ height: 53.333333333333336, width: 460, x: 70, y: 80 });
    expect(node).toEqual({});
    expect(transform(data)).toEqual([
      { sex: 'male', skin: 'white' },
      { sex: 'female', skin: 'white' },
    ]);
  });

  test('facet container', () => {
    const data = [
      { sex: 'male', skin: 'white' },
      { sex: 'male', skin: 'black' },
      { sex: 'female', skin: 'white' },
      { sex: 'female', skin: 'yellow' },
    ];
    const views = createViews({
      type: 'facet',
      encodings: {
        x: 'sex',
        y: 'skin',
      },
      data,
      padding: 30,
      children: [{}, {}],
    });
    renderViews(views);

    expect(views.length).toBe(7);
    const [, [view, [node]]] = views;
    const { transform, ...rest } = view;
    expect(rest).toEqual({ height: 66.66666666666667, width: 225, x: 60, y: 70 });
    expect(node).toEqual({});
    expect(transform(data)).toEqual([
      { sex: 'male', skin: 'white' },
    ]);
  });
});
