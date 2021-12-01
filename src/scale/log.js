import { createLinear } from './linear';
import { ticks, nice, log } from './utils';

export function createLog({ domain, base, ...rest }) {
  const transform = (x) => Math.log(x);
  let linear = createLinear({ domain: domain.map(transform), ...rest });
  const scale = (x) => linear(transform(x));

  scale.ticks = (tickCount) => {
    const [min, max] = domain.map((x) => log(x, base));
    return ticks(min, max, tickCount).map((x) => base ** x);
  };

  scale.nice = () => {
    domain = nice(domain, {
      floor: (x) => base ** Math.floor(log(x, base)),
      ceil: (x) => base ** Math.ceil(log(x, base)),
    });
    linear = createLinear({ domain: domain.map(transform), ...rest });
  };

  return scale;
}
