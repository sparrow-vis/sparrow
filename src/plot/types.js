import {
  item, array, object,
} from './options';

export const Chart = {
  data: item(),
  element: item(),
  encode: array(),
  coordinate: array(),
  scale: array(),
  guide: array(),
  width: item(),
  height: item(),
  style: object(),
  statistic: array(),
  renderer: item(),
};

export const Encode = {
  channel: item(), field: item(), transform: item(), value: item(),
};

export const Polar = {
  type: item('polar'),
  startAngle: item(-Math.PI / 2),
  endAngle: item((Math.PI / 2) * 3),
  innerRadius: item(0),
  outerRadius: item(1),
};

export const Transpose = {
  type: item('transpose'),
};

const ScaleBase = {
  domain: item(),
  range: item(),
  channel: item(),
};

export const Linear = {
  ...ScaleBase,
  tickCount: item(5),
  nice: item(false),
};

export const Band = {
  ...ScaleBase,
  padding: item(),
};

export const Ordinal = {
  ...ScaleBase,
  domain: item(),
  range: item(),
};

export const Scale = {
  ...Linear,
  ...Band,
  ...Ordinal,
};

export const Stack = {
  type: item('stack'),
  x: item(),
  y: item(),
  y1: item(),
};

export const AxisX = {
  display: item(true),
  channel: item('x'),
  title: item(),
};

export const AxisY = {
  display: item(true),
  channel: item('y'),
  title: item(),
};
