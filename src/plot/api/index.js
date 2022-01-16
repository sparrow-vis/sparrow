import { defineOptions, useOptions } from './options';
import { plot } from '../plot';
import {
  Linear, Polar, Scale, Transpose, Encode, Chart, Band, Ordinal, Stack, AxisX, AxisY,
} from './types';

export function interval() {
  return chart().element('interval');
}

function chart() {
  const options = defineOptions(Chart);
  options.plot = () => plot(useOptions(options));
  return options;
}

export function x() {
  return defineOptions(Encode).channel('x');
}

export function y() {
  return defineOptions(Encode).channel('y');
}

export function y1() {
  return defineOptions(Encode).channel('y1');
}

export function fill() {
  return defineOptions(Encode).channel('fill');
}

export function stroke() {
  return defineOptions(Encode).channel('stroke');
}

export function label() {
  return defineOptions(Encode).channel('label');
}

export function polar() {
  return defineOptions(Polar);
}

export function transpose() {
  return defineOptions(Transpose);
}

export function scale() {
  return defineOptions(Scale);
}

export function linear() {
  return defineOptions(Linear);
}

export function band() {
  return defineOptions(Band);
}

export function ordinal() {
  return defineOptions(Ordinal);
}

export function stack() {
  return defineOptions(Stack);
}

export function axisX() {
  return defineOptions(AxisX);
}

export function axisY() {
  return defineOptions(AxisY);
}
