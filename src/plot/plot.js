import { createViews } from '../view';
import { createRenderer } from '../renderer';
import { createCoordinate } from '../coordinate';
import { create } from './create';
import { valueOf } from './value';
import { infer } from './infer';
import { resolve } from './resolve';
import { computeDimension } from './dimension';
import { identity, compose, indicesOf } from '../utils';
import { map } from './utils';

export function plot({ view, width = 640, height = 480 }) {
  const views = createViews(view, { width, height });
  const renderer = createRenderer(width, height);
  for (const [view, nodes] of Object.entries(views)) {
    const { transform = identity, ...size } = view;
    const partialOptions = nodes.map((node) => ({
      ...node,
      ...size,
      transforms: [transform, ...(node.transforms || [])],
    }));
    const completeOptions = partialOptions.map(infer);
    const syncedOptions = resolve(completeOptions);
    for (const options of syncedOptions) {
      plotView(renderer, options);
    }
  }
  return renderer.node();
}

export function plotView(renderer, {
  data,
  encodings,
  type,
  styles,
  coordinates: coordinateOptions,
  scales: scalesOptions,
  transforms: transformsOptions,
  guides: guidesOptions,
  ...dimensions
}) {
  const transform = compose(transformsOptions.map(create));
  const scales = map(scalesOptions, create);
  const guides = map(guidesOptions, create);
  const geometry = create({ type });
  const coordinate = createCoordinate({
    ...computeDimension(dimensions, scales, guides),
    transforms: coordinateOptions.map(create),
  });

  const I = indicesOf(data);
  const transformedData = transform(data);
  const values = map(encodings, (value, key) => {
    const scale = scales[key];
    return valueOf(transformedData, value).map(scale);
  });

  // render geometry
  geometry(renderer, I, scales, values, styles, coordinate);

  // render axis, legend
  for (const [key, guide] of Object.entries(guides)) {
    const scale = scales[key];
    guide(renderer, scale, coordinate);
  }
}
