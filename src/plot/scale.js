import {
  createBand, createIdentity, createLinear, createOrdinal,
} from '../scale';
import {
  unique, min, max, fromObject,
} from './utils';
import { colors } from './theme';
import { isPolar } from './coordinate';

export function createScales(values, channels, transforms, optionsA) {
  const optionsO = fromObject(optionsA, (d) => d.channel, ({ channel, ...rest }) => ({ ...rest }));
  const scaleDescriptors = values.map(({ value, channel: name }) => ({
    name,
    scale: channels[name].scale,
    ...inferScale(
      value,
      channels[name],
      transforms,
      optionsO[name],
    ),
  }));

  syncScales(scaleDescriptors);

  const scales = scaleDescriptors.reduce(
    (obj, { name, creator, options }) => {
      const { nice, tickCount = 5, ...rest } = options;
      const scale = creator(rest);
      if (nice && scale.nice) scale.nice(tickCount);
      obj[name] = scale;
      return obj;
    },
    {},
  );
  return [scaleDescriptors, scales];
}

export function applyScales(values, scales) {
  return values
    .reduce(
      (obj, { value, channel }) => ((obj[channel] = value.map(scales[channel])), obj),
      {},
    );
}

function inferScale(value, channel, transforms, options = {}) {
  switch (inferScaleType(value, channel, options)) {
    case 'band':
      return inferBand(value, channel, transforms, options);
    case 'linear':
      return inferLinear(value, channel, transforms, options);
    case 'ordinal':
      return inferOrdinal(value, channel, transforms, options);
    case 'identity':
      return inferIdentity(value, channel, transforms, options);
    default:
      throw new Error(`unknown scale type: ${options.type}`);
  }
}

function syncScales(scaleDescriptors) {
  const x = scaleDescriptors.filter(({ type, scale }) => type === 'quantitative' && scale === 'x');
  const y = scaleDescriptors.filter(({ type, scale }) => type === 'quantitative' && scale === 'y');
  if (x.length > 1) syncScaleQ(x);
  if (y.length > 1) syncScaleQ(y);
}

function syncScaleQ(scaleDescriptors) {
  const d0 = min(scaleDescriptors, ({ options: { domain } }) => domain[0]);
  const d1 = max(scaleDescriptors, ({ options: { domain } }) => domain[domain.length - 1]);
  const r0 = min(scaleDescriptors, ({ options: { range } }) => range[0]);
  const r1 = max(scaleDescriptors, ({ options: { range } }) => range[range.length - 1]);
  const nice = scaleDescriptors.some(({ options: { nice } }) => nice === true);
  for (const descriptor of scaleDescriptors) {
    descriptor.options.domain = [d0, d1];
    descriptor.options.range = [r0, r1];
    descriptor.options.nice = nice;
  }
}

function inferScaleType(value, channel, option) {
  const { constant } = value;
  const { scaleType, type, scale } = channel;
  const { type: customScaleType, domain, range } = option;
  if (constant && scale === 'color') return 'identity';
  if (scaleType) return scaleType;
  if (customScaleType) return customScaleType;
  if ((domain || range || []).length > 2) return asOrdinalType(type);
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(type);
    return 'linear';
  }
  if (isOrdinal(value)) return asOrdinalType(type);
  return 'linear';
}

function inferBand(
  value,
  channel,
  transforms,
  {
    domain = inferDomainO(value),
    range = [0, 1],
    padding = isPolar(transforms) ? 0 : 0.1,
  },
) {
  return {
    creator: createBand,
    type: 'ordinal',
    options: { domain, range, padding },
  };
}

function inferOrdinal(
  value,
  { scale },
  transforms,
  {
    domain = inferDomainO(value),
    range = scale === 'color' ? colors : undefined,
  },
) {
  return {
    creator: createOrdinal,
    type: 'ordinal',
    options: { domain, range },
  };
}

function inferLinear(
  value,
  { scale },
  transforms,
  {
    domain = inferDomainQ(value),
    range = scale === 'y' ? [1, 0] : [0, 1],
    ...rest
  },
) {
  return {
    creator: createLinear,
    type: 'quantitative',
    options: { domain, range, ...rest },
  };
}

function inferIdentity() {
  return {
    creator: createIdentity,
    type: 'identity',
    options: {},
  };
}

function inferDomainQ(value) {
  return [Math.min(...value), Math.max(...value)];
}

function inferDomainO(value) {
  return unique(value);
}

function asOrdinalType() {
  return 'ordinal';
}

function isOrdinal(value) {
  return value.some((d) => typeof d === 'string' || typeof d === 'boolean');
}
