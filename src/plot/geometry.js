import { compose, indexOf } from '../utils';
import { inferEncodings, valueOf } from './encoding';
import { create } from './create';

export function initialize({
  data,
  type,
  encodings: E = {},
  statistics: statisticsOptions = [],
  transforms: transformsOptions = [],
  styles,
}) {
  // apply transform
  const transform = compose(...transformsOptions.map(create));
  const transformedData = transform(data);
  const index = indexOf(transformedData);

  // apply valueOf
  const encodings = inferEncodings(type, transformedData, E);
  const constants = {};
  const values = {};
  for (const [key, e] of Object.entries(encodings)) {
    if (e) {
      const { type, value } = e;
      if (type === 'constant') constants[key] = value;
      else values[key] = valueOf(transformedData, e);
    }
  }

  // apply statistics
  const statistic = compose(...statisticsOptions.map(create));
  const { values: transformedValues, index: I } = statistic({ index, values });

  // create channels
  const geometry = create({ type });
  const channels = {};
  for (const [key, channel] of Object.entries(geometry.channels())) {
    const values = transformedValues[key];
    const { optional } = channel;
    if (values) {
      channels[key] = createChannel(channel, values, encodings[key]);
    } else if (!optional) {
      throw new Error(`Missing values for channel: ${key}`);
    }
  }

  return { index: I, geometry, channels, styles: { ...styles, ...constants } };
}

function createChannel(channel, values, encoding = {}) {
  const { type, value } = encoding;
  return {
    ...channel,
    ...(type === 'field' && { field: value }),
    values,
  };
}
