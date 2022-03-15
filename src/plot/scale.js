import { firstOf, group, lastOf, map, defined } from '../utils';
import { interpolateColor, interpolateNumber } from '../scale';
import { categoricalColors, ordinalColors } from './theme';

export function inferScales(channels, options) {
  const scaleChannels = group(channels.flatMap(Object.entries), ([name]) => scaleName(name));
  const scales = {};
  for (const [name, channels] of scaleChannels) {
    const channel = mergeChannels(name, channels);
    const o = options[name] || {};
    const type = inferScaleType(channel, o);
    scales[name] = {
      ...o,
      ...inferScaleOptions(type, channel, o),
      domain: inferScaleDomain(type, channel, o),
      range: inferScaleRange(type, channel, o),
      label: inferScaleLabel(type, channel, o),
      type,
    };
  }
  return scales;
}

export function applyScales(channels, scales) {
  return map(channels, ({ values, name }) => {
    const scale = scales[scaleName(name)];
    return values.map(scale);
  });
}

function scaleName(name) {
  if (name.startsWith('x')) return 'x';
  if (name.startsWith('y')) return 'y';
  if (isColor(name)) return 'color';
  return name;
}

function mergeChannels(name, channels) {
  const values = [];
  let scale;
  let field;
  for (const [, { values: v = [], scale: s, field: f }] of channels) {
    values.push(...v);
    if (!scale && s) scale = s;
    if (!field && f) field = f;
  }
  return { name, scale, values, field };
}

function inferScaleType({ name, scale, values }, { type, domain, range }) {
  if (scale) return scale;
  if (type) return type;
  if ((domain || range || []).length > 2) return asOrdinalType(name);
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    if (isTemporal(domain)) return 'time';
    return 'linear';
  }
  if (isOrdinal(values)) return asOrdinalType(name);
  if (isTemporal(values)) return 'time';
  if (isUnique(values)) return 'identity';
  return 'linear';
}

function inferScaleDomain(type, { values }, { domain, ...options }) {
  if (domain) return domain;
  switch (type) {
    case 'linear':
    case 'log':
    case 'quantize':
      return inferDomainQ(values, options);
    case 'ordinal':
    case 'dot':
    case 'band':
      return inferDomainC(values, options);
    case 'quantile':
      return inferDomainO(values, options);
    case 'time':
      return inferDomainT(values, options);
    default:
      return [];
  }
}

function inferScaleRange(type, { name }, { range }) {
  if (range) return range;
  switch (type) {
    case 'linear':
    case 'log':
    case 'time':
    case 'band':
    case 'dot':
      return inferRangeQ(name);
    case 'ordinal':
      return categoricalColors;
    case 'quantile':
    case 'quantize':
    case 'threshold':
      return ordinalColors;
    default:
      return [];
  }
}

function inferScaleOptions(type, { name }, { padding, interpolate, margin }) {
  switch (type) {
    case 'linear': case 'log':
      if (interpolate) return { interpolate };
      return { interpolate: name === 'color' ? interpolateColor : interpolateNumber };
    case 'band':
      return { padding: padding !== undefined ? padding : 0.1 };
    case 'dot':
      return { margin: margin !== undefined ? margin : 0.5 };
    default:
      return {};
  }
}

function inferScaleLabel(type, { field }, { label }) {
  if (label !== undefined) return label;
  return field;
}

function asOrdinalType(name) {
  if (isPosition(name)) return 'dot';
  return 'ordinal';
}

function isPosition(name) {
  return name === 'x' || name === 'y';
}

function isColor(name) {
  return name === 'fill' || name === 'stroke';
}

function isOrdinal(values) {
  return values.some((v) => {
    const type = typeof v;
    return type === 'string' || type === 'boolean';
  });
}

function isTemporal(values) {
  return values.some((v) => v instanceof Date);
}

function isUnique(values) {
  return Array.from(new Set(values)).length === 1;
}

function inferDomainQ(values, { zero = false } = {}) {
  const definedValues = values.filter(defined);
  if (definedValues.length === 0) return [];
  const min = Math.min(...definedValues);
  const max = Math.max(...definedValues);
  return [zero ? 0 : min, max];
}

function inferDomainC(values) {
  return Array.from(new Set(values.filter(defined)));
}

function inferDomainO(values, domain) {
  return inferDomainC(values, domain).sort();
}

function inferDomainT(values, domain) {
  return inferDomainQ(values, domain).map((d) => new Date(d));
}

function inferRangeQ(name) {
  if (name === 'y') return [1, 0];
  if (name === 'color') return [firstOf(ordinalColors), lastOf(ordinalColors)];
  return [0, 1];
}
