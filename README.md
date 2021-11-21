# Sparrow

> Sparrow is still working in progress and will coming soon.

Sparrow is a tiny plot library based on the grammar of graphics for learning purpose. It aims at helping people to better understand visualization and making it easier for them to choose the the suitable visualization library for their analysis task.

![](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*romnSZgAWacAAAAAAAAAAAAAARQnAQ)

## Links

- [Tutorials in Chinese](https://juejin.cn/book/7031893648145186824)

## Features

- **Small**: The is around 1000 lines in total.
- **Simple**: The source code is easy to understand.
- **Complete**: It has the core features of a plot library.

## Get Started

```
$ npm i @sparrow-vis/sparrow
```

<!-- prettier-ignore -->
```js
import * as sp from "@sparrow-vis/sparrow";

const data = [
  { name: "questions", value: 17 },
  { name: "schools", value: 25 },
  { name: "philosophers", value: 35 },
];

const chart = sp
  .interval()
  .data(data)
  .encode(
    sp.x("name"), 
    sp.y("value"), 
    sp.color("name")
  )
  .plot();

document.getElementById("container").appendChild(chart);
```

## License

MIT
