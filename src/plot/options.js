export function defineOptions(types) {
  return Object.entries(types).reduce((options, [key, type]) => {
    const $key = encodeKey(key);
    const { name, defaultValue } = type;
    options[$key] = defaultValue;
    options[key] = (...args) => {
      if (args.length === 0) return options[$key];
      if (name === 'array') {
        options[$key] = [...(options[$key] || []), ...args];
      } else if (name === 'object') {
        const [k, v] = args;
        options[$key][encodeKey(k)] = v;
      } else {
        const [v] = args;
        options[$key] = v;
      }
      return options;
    };
    options[key].$setter = true;
    return options;
  }, {});
}

export function useOptions(options) {
  if (options === undefined || options === null) return options;
  if (typeof options !== 'object') return options;
  if (Array.isArray(options)) return [...options.map(useOptions)];
  return Object
    .entries(options)
    .filter(([, value]) => typeof value !== 'function' || value.$setter !== true)
    .reduce((obj, [key, value]) => (obj[decodeKey(key)] = useOptions(value), obj), {});
}

function encodeKey(key) {
  return `$${key}`;
}

function decodeKey(key) {
  return key.startsWith('$') ? key.slice(1) : key;
}

export function item(defaultValue) {
  return {
    defaultValue,
    name: 'item',
  };
}

export function array(defaultValue = []) {
  return {
    defaultValue,
    name: 'array',
  };
}

export function object(defaultValue = {}) {
  return {
    defaultValue,
    name: 'object',
  };
}
