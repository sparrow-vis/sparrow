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
    expect(view).toEqual({ x: 0, y: 0, width: 640, height: 480 });
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
    expect(view).toEqual({ x: 0, y: 0, width: 640, height: 480 });
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
    expect(view).toEqual({ height: 480, width: 300, x: 0, y: 0 });
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
    expect(view).toEqual({ height: 110, width: 640, x: 0, y: 0 });
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
    expect(view).toEqual({ height: 220, width: 300, x: 340, y: 0 });
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
    expect(rest).toEqual({ height: 375, width: 275, x: 45, y: 45 });
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
    expect(rest).toEqual({ height: 125, width: 550, x: 45, y: 45 });
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
      padding: 20,
      children: [{}, {}],
    });
    renderViews(views);

    expect(views.length).toBe(7);
    const [, [view, [node]]] = views;
    const { transform, ...rest } = view;
    expect(rest).toEqual({ height: 111.66666666666667, width: 265, x: 45, y: 45 });
    expect(node).toEqual({});
    expect(transform(data)).toEqual([
      { sex: 'male', skin: 'white' },
    ]);
  });
});
