import { createAxis } from './axis';
import { ticksBottom, ticksLeft, ticksCircular } from './ticks';
import { gridCircular, gridHorizontal, gridRay, gridVertical } from './grid';
import { labelLeftDown, labelBottomRight } from './label';

const components = {
  '00': {
    start: (d, scale, offset) => [scale(d) + offset, 1],
    end: (coordinate) => coordinate([0, 0]),
    grid: gridVertical,
    ticks: ticksBottom,
    label: labelBottomRight,
  },
  '01': {
    start: (d, scale, offset) => [scale(d) + offset, 1],
    end: (coordinate) => coordinate([0, 0]),
    grid: gridHorizontal,
    ticks: ticksLeft,
    label: labelLeftDown,
  },
  10: {
    start: (d, scale, offset) => [scale(d) + offset, 0],
    grid: gridRay,
    ticks: ticksCircular,
    end: (coordinate) => coordinate.center(),
  },
  11: {
    start: (d, scale, offset) => [scale(d) + offset, 1],
    grid: gridCircular,
    ticks: ticksLeft,
    end: (coordinate) => coordinate.center(),
  },
};

export const axisX = createAxis(components);
