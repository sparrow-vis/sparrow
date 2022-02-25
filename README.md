# 🦜 Sparrow

Sparrow is a tiny plot library based on the grammar of graphics for learning purpose. It aims at helping people to better understand visualization and making it easier for them to choose the the suitable visualization library for their analysis task.

![](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*pLBGQoXodSoAAAAAAAAAAAAAARQnAQ)

![](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*romnSZgAWacAAAAAAAAAAAAAARQnAQ)

## 📎 Links

- [Introduction](https://sparrow-vis.github.io/)
- [Tutorials in Chinese](https://juejin.cn/book/7031893648145186824)

## ✨ Features

The name **sparrow** comes from an old Chinese proverb: "Though sparrow is small, but it has all organs". As its name, Sparrow has the following features:

- **Small**: The code is less than 2000 lines in total **with zero dependencies**.
- **Elegant**: It can plot in both normal and sketchy, hand-drawn-like, style.
- **Complete**: It can plot most of charts in common use.

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
  type: "interval",
  encodings: {
    x: "genre",
    y: "sold",
    fill: "genre",
  },
});

document.getElementById("container").appendChild(chart);
```

![example](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*y8rbTKLcnfMAAAAAAAAAAAAAARQnAQ)

- Plot in a sketchy, hand-drawn-like, style.([@sparrow-vis/rough-renderer](https://github.com/sparrow-vis/rough-renderer))

```
$ npm i @sparrow-vis/rough-renderer
```

```js
import { plot } from "@sparrow-vis/sparrow";
import { createPlugin } from "@sparrow-vis/rough-renderer";

const data = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
];

const chart = plot({
  data,
  type: "interval",
  renderer: createPlugin(),
  encodings: {
    x: 'genre',
    y: 'sold',
    fill: 'genre'
  },
});

document.getElementById("container").appendChild(chart);
```

![](https://gw.alipayobjects.com/mdn/rms_38d0f7/afts/img/A*sq8vSp37hIQAAAAAAAAAAAAAARQnAQ)

## 😝 Thanks

The API design is inspired by the following awesome projects [G2](https://github.com/antvis/G2), [Vega-Lite API](https://github.com/vega/vega-lite-api) and [Observable Plot](https://github.com/observablehq/plot).

## 📄 License

MIT
