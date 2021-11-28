import { createRenderer } from '../renderer';
import { createCoordinate } from '../coordinate';
import { createScales, applyScales } from './scale';
import { fromTransform } from './coordinate';
import { fromGeometry } from './geometry';
import { valuesOf } from './data';
import { calcDimensions } from './dimension';
import { range } from './utils';
import { patchEncode } from './encode';
import { applyStatistics } from './statistic';
import { createGuides } from './guide';

export function plot({
  element: geometryType,
  data = [],
  scale: scaleOptions = [],
  coordinate: transformDescriptors = [],
  encode = [],
  statistic: statisticDescriptors = [],
  guide: guidesDescriptors = [],
  style = {},
  ...options
}) {
  const index = range(data);
  const geometry = fromGeometry(geometryType);
  const channels = geometry.channels();
  const encodes = patchEncode(geometryType, encode);
  const values = valuesOf(data, encodes, channels);
  const transformedValues = applyStatistics(index, values, geometryType, statisticDescriptors);
  const [scaleDescriptors, scales] = createScales(
    transformedValues,
    channels,
    transformDescriptors,
    scaleOptions,
  );
  const scaledValues = applyScales(transformedValues, scales);
  const [guides, ticks, titles] = createGuides(
    guidesDescriptors,
    scaleDescriptors,
    scales,
    encodes,
  );
  const {
    width, height, marginTop, marginLeft, chartHeight, chartWidth,
  } = calcDimensions(ticks, titles, transformDescriptors, options);
  const coordinate = createCoordinate({
    x: marginLeft,
    y: marginTop,
    width: chartWidth,
    height: chartHeight,
    transforms: fromTransform(transformDescriptors),
  });
  const renderer = createRenderer(width, height);

  geometry({
    index, renderer, values: scaledValues, scales, coordinate, directStyles: style,
  });

  for (const [key, guide] of Object.entries(guides)) {
    guide({
      renderer, scale: scales[key], values: ticks[key], coordinate, title: titles[key],
    });
  }

  return renderer.node();
}
