# 🦜 Sparrow

> Sparrow is still working in progress.

Sparrow is a tiny plot library based on the grammar of graphics for learning purpose. It aims at helping people to better understand visualization and making it easier for them to choose the the suitable visualization library for their analysis task.

![](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*YLU0Q4RDo00AAAAAAAAAAAAAARQnAQ)

![](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*romnSZgAWacAAAAAAAAAAAAAARQnAQ)

## 📎 Links

- [Introduction](https://observablehq.com/@pearmini/sparrow)
- [Tutorials in Chinese](https://juejin.cn/book/7031893648145186824)

## ✨ Features

The name **sparrow** comes from an old Chinese proverb: "Though sparrow is small, but it has all organs". As its name, Sparrow has the following features:

- **Small**: The code is around 1500 lines in total.
- **Simple**: The source code is easy to understand.
- **Complete**: It has the core features of a plot library.

## 📦 Installation

```
$ npm i @sparrow-vis/sparrow
```

## 🔨 Get Started

- Specifies chart by **JavaScript Object**.

```js
import { plot } from "@sparrow-vis/sparrow";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

const chart = plot({
  data,
  element: "interval",
  encode: [
    { channel: "x", field: "genre" },
    { channel: "y", field: "sold" },
    { channel: "fill", field: "genre" },
  ],
});

document.getElementById("container").appendChild(chart);
```

- Specifies chart by **JavaScript API**.

<!-- prettier-ignore -->
```js
import * as sp from "@sparrow-vis/sparrow";

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = sp
  .interval()
  .data(data)
  .encode(
    sp.x().field('genre'),
    sp.y().field('sold'),
    sp.fill().field('genre'),
  )
  .plot();

document.getElementById("container").appendChild(chart);
```

![example](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*_TboQJxCmwEAAAAAAAAAAAAAARQnAQ)

## 😝 Thanks

The API design is inspired by the following awesome projects [G2](https://github.com/antvis/G2), [Vega-Lite API](https://github.com/vega/vega-lite-api) and [Observable Plot](https://github.com/observablehq/plot).

## 📄 License

MIT
