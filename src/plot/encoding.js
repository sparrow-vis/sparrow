import { firstOf, map } from '../utils';
import { categoricalColors } from './theme';

export function inferEncodings(type, data, encodings) {
  const typedEncodings = map(encodings, (encoding, key) => ({
    type: inferType(data, encoding, key),
    value: encoding,
  }));

  switch (type) {
    case 'interval':
      return maybeFill(maybeZeroX(maybeZeroY1(typedEncodings)));
    case 'line':
      return maybeStroke(maybeGroup(typedEncodings));
    case 'area':
      return maybeFill(maybeIdentityX(maybeZeroY1(maybeGroup(typedEncodings))));
    case 'link':
      return maybeStroke(maybeIdentityX(typedEncodings));
    case 'point':
      return maybeZeroY(maybeStroke(typedEncodings));
    case 'rect':
      return maybeFill(maybeZeroX1(maybeZeroY1(typedEncodings)));
    case 'cell':
      return maybeFill(typedEncodings);
    default:
      break;
  }

  return typedEncodings;
}

export function valueOf(data, { type, value }) {
  if (type === 'transform') return data.map(value);
  if (type === 'value') return data.map(() => value);
  return data.map((d) => d[value]);
}

function inferType(data, encoding, name) {
  if (typeof encoding === 'function') return 'transform';
  if (typeof encoding === 'string') {
    if (data.length && firstOf(data)[encoding] !== undefined) return 'field';
    if (isStyle(name)) return 'constant';
  }
  return 'value';
}

function isStyle(type) {
  return type === 'fill' || type === 'stroke';
}

function maybeFill({ fill = color(), ...rest }) {
  return { fill, ...rest };
}

function maybeStroke({ stroke = color(), ...rest }) {
  return { stroke, ...rest };
}

function maybeZeroY1({ y1 = zero(), ...rest }) {
  return { y1, ...rest };
}

function maybeZeroX1({ x1 = zero(), ...rest }) {
  return { x1, ...rest };
}

function maybeZeroY({ y = zero(), ...rest }) {
  return { y, ...rest };
}

function maybeZeroX({ x = zero(), ...rest }) {
  return { x, ...rest };
}

function maybeIdentityX({ x, x1 = x, ...rest }) {
  return { x, x1, ...rest };
}

function maybeGroup({ fill, stroke, z, ...rest }) {
  if (z === undefined) z = maybeField(fill);
  if (z === undefined) z = maybeField(stroke);
  return { fill, stroke, z, ...rest };
}

function maybeField(encoding) {
  if (encoding === undefined || encoding.type !== 'field') return undefined;
  return encoding;
}

function zero() {
  return { type: 'value', value: 0 };
}

function color() {
  return { type: 'constant', value: categoricalColors[0] };
}
