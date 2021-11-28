import { axisX, axisY } from '../guide';
import { fromObject } from './utils';

export function createGuides(
  guidesDescriptors,
  scaleDescriptors,
  scales,
  encodes,
) {
  const guides = {};
  const ticks = {};
  const titles = {};
  const descriptors = fromObject(
    guidesDescriptors,
    (d) => d.channel,
    ({ channel, ...rest }) => ({ ...rest }),
  );

  const fields = fromObject(encodes, (d) => d.channel, (d) => d.field);
  for (const { name, options } of scaleDescriptors) {
    const descriptor = descriptors[name];
    const scale = scales[name];
    const hideTitle = descriptor && descriptor.title === false;
    const title = descriptor ? descriptor.title : undefined;
    if (display('x', name, descriptor)) {
      guides[name] = axisX;
      ticks[name] = ticksOf(scale, options, descriptor);
      titles[name] = hideTitle ? false : (title || fields[name]);
    }
    if (display('y', name, descriptor)) {
      guides[name] = axisY;
      ticks[name] = ticksOf(scale, options, descriptor);
      titles[name] = hideTitle ? false : (title || fields[name]);
    }
  }

  return [guides, ticks, titles];
}

function display(target, channel, descriptor) {
  return channel === target && (!descriptor || descriptor.display === true);
}

function ticksOf(scale, { domain, tickCount = 5 }) {
  return scale.ticks ? scale.ticks(tickCount) : domain;
}
