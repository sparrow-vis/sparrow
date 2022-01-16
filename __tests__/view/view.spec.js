import { createViews } from '../../src/view/view';
import { createRenderer } from '../../src/renderer/renderer';
import { mount, createDiv } from '../utils';

function renderViews(views, width = 600, height = 400) {
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
    expect(view).toEqual({ x: 0, y: 0, width: 600, height: 400 });
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
    expect(view).toEqual({ x: 0, y: 0, width: 600, height: 400 });
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
    expect(view).toEqual({ height: 380, width: 285, x: 10, y: 10 });
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
    expect(view).toEqual({ height: 80, width: 560, x: 20, y: 20 });
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
    expect(view).toEqual({ height: 175, width: 265, x: 315, y: 20 });
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
    expect(rest).toEqual({ height: 380, width: 285, x: 10, y: 10 });
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
    expect(rest).toEqual({ height: 120, width: 580, x: 10, y: 10 });
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
    expect(rest).toEqual({ height: 93.33333333333333, width: 255, x: 30, y: 30 });
    expect(node).toEqual({});
    expect(transform(data)).toEqual([
      { sex: 'male', skin: 'white' },
    ]);
  });
});
