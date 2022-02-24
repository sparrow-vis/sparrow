import { interval, line, area, text, link, cell, rect, point, path } from '../geometry';
import {
  createBand,
  createIdentity,
  createLinear,
  createLog,
  createOrdinal,
  createPoint,
  createQuantile,
  createQuantize,
  createThreshold,
  createTime,
} from '../scale';
import { axisX, axisY, legendRamp, legendSwatches } from '../guide';
import { cartesian, transpose, polar } from '../coordinate';
import { createBinX, createNormalizeY, createSymmetryY, createStackY } from '../statistic';

export function create(options) {
  if (typeof options === 'function') return options;
  const { type, ...rest } = options;

  // geometries
  if (type === 'interval') return interval;
  if (type === 'line') return line;
  if (type === 'area') return area;
  if (type === 'text') return text;
  if (type === 'link') return link;
  if (type === 'cell') return cell;
  if (type === 'rect') return rect;
  if (type === 'point') return point;
  if (type === 'path') return path;

  // facet
  if (type === 'facet') {
    const facet = () => {};
    facet.channels = () => ({
      x: { name: 'x', optional: true },
      y: { name: 'y', optional: true },
    });
    return facet;
  }

  // statistics
  if (type === 'stackY') return createStackY(rest);
  if (type === 'normalizeY') return createNormalizeY(rest);
  if (type === 'symmetryY') return createSymmetryY(rest);
  if (type === 'binX') return createBinX(rest);

  // coordinates
  if (type === 'cartesian') return cartesian(rest);
  if (type === 'transpose') return transpose(rest);
  if (type === 'polar') return polar(rest);

  // scales
  if (type === 'band') return createBand(rest);
  if (type === 'linear') return createScaleQ(createLinear, rest);
  if (type === 'time') return createScaleQ(createTime, rest);
  if (type === 'log') return createScaleQ(createLog, rest);
  if (type === 'identity') return createIdentity(rest);
  if (type === 'ordinal') return createOrdinal(rest);
  if (type === 'dot') return createPoint(rest);
  if (type === 'quantile') return createQuantile(rest);
  if (type === 'quantize') return createQuantize(rest);
  if (type === 'threshold') return createThreshold(rest);

  // guides
  if (type === 'axisX') return createGuide(axisX, rest);
  if (type === 'axisY') return createGuide(axisY, rest);
  if (type === 'legendSwatches') return createGuide(legendSwatches, rest);
  if (type === 'legendRamp') return createGuide(legendRamp, rest);

  throw new Error(`Unknown node type: ${options.type}`);
}

function createGuide(guide, options) {
  return (renderer, scale, coordinate) => guide(renderer, scale, coordinate, options);
}

function createScaleQ(ctor, options) {
  const { nice = true, tickCount = 10 } = options;
  const scale = ctor(options);
  if (nice) scale.nice(tickCount);
  return scale;
}
