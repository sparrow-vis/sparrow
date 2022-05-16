# View Composition

Compose views to build complex visualization.

## Layer

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/b45f3425-04bc-454a-8edd-26a0b4fc28d6.json"
  );
  const data = await response.json();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return sp.plot({
    type: "layer",
    data,
    width: 800,
    statistics: [{ type: "stackY" }],
    encodings: {
      y: "profit",
      x: (d) => month[d.month],
      fill: "territory",
    },
    scales: {
      x: { type: "band", padding: 0.5 },
    },
    guides: {
      color: { width: 80, formatter: (d) => d.split(" ").pop() },
      y: { formatter: (d) => `${(d / 1000) | 0}k` },
    },
    children: [
      {
        type: "area",
        styles: {
          fillOpacity: 0.7,
        },
      },
      {
        type: "interval",
      },
    ],
  });
})();
```

```js | dom
sp.plot({
  type: "layer",
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  encodings: {
    x: "genre",
    y: "sold",
  },
  children: [
    { type: "interval", fill: "genre" },
    {
      type: "text",
      encodings: { text: "sold", fontSize: 20 },
      styles: {
        dy: "-0.5em",
        dx: "1.5em",
      },
    },
  ],
});
```

```js | dom
sp.plot({
  type: "layer",
  encodings: {
    x: "month",
    y: "temperature",
    stroke: "city",
  },
  data: [
    { month: "Jan", city: "Tokyo", temperature: 7 },
    { month: "Jan", city: "London", temperature: 3.9 },
    { month: "Feb", city: "Tokyo", temperature: 6.9 },
    { month: "Feb", city: "London", temperature: 4.2 },
    { month: "Mar", city: "Tokyo", temperature: 9.5 },
    { month: "Mar", city: "London", temperature: 5.7 },
    { month: "Apr", city: "Tokyo", temperature: 14.5 },
    { month: "Apr", city: "London", temperature: 8.5 },
    { month: "May", city: "Tokyo", temperature: 18.4 },
    { month: "May", city: "London", temperature: 11.9 },
    { month: "Jun", city: "Tokyo", temperature: 21.5 },
    { month: "Jun", city: "London", temperature: 15.2 },
    { month: "Jul", city: "Tokyo", temperature: 25.2 },
    { month: "Jul", city: "London", temperature: 17 },
    { month: "Aug", city: "Tokyo", temperature: 26.5 },
    { month: "Aug", city: "London", temperature: 16.6 },
    { month: "Sep", city: "Tokyo", temperature: 23.3 },
    { month: "Sep", city: "London", temperature: 14.2 },
    { month: "Oct", city: "Tokyo", temperature: 18.3 },
    { month: "Oct", city: "London", temperature: 10.3 },
    { month: "Nov", city: "Tokyo", temperature: 13.9 },
    { month: "Nov", city: "London", temperature: 6.6 },
    { month: "Dec", city: "Tokyo", temperature: 9.6 },
    { month: "Dec", city: "London", temperature: 4.8 },
  ],
  scales: { y: { nice: true, label: "temp" } },
  children: [
    { type: "line" },
    {
      type: "point",
      encodings: {
        fill: "city",
      },
    },
  ],
});
```

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/9ae12ce8-8590-4bc4-b906-68c593cc460d.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "layer",
    data,
    children: [
      {
        type: "rect",
        guides: {
          x: { display: false },
          y: { display: false },
          color: { display: false },
        },
        encodings: {
          x: "x",
          y: "y",
          x1: "x1",
          y1: "y1",
          fill: "name",
        },
      },
      {
        type: "text",
        encodings: {
          x: (d) => (d.x + d.x1) / 2,
          y: (d) => (d.y + d.y1) / 2,
          text: "name",
        },
        styles: {
          dy: "0.5em",
          textAnchor: "middle",
        },
      },
    ],
  });
})();
```

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json"
  );
  const data = await response.json();
  const keys = ["id", "name", "country", "lifespan", "points"];
  return sp.plot({
    data,
    type: "layer",
    transforms: [
      (data) => data.filter((_, i) => i < 10),
      (data) =>
        data.map(({ lifespan, points, ...rest }) => ({
          ...rest,
          lifespan: `[${lifespan[0]}, ${lifespan[1]}]`,
          points: `[${points
            .slice(0, 2)
            .map((d) => d.slice(0, 2) + "...")
            .join(", ")}]`,
        })),
      (data) => {
        const ths = ["index", ...keys].map((key) => ({
          index: -1,
          key,
          value: key,
          header: true,
        }));
        const tds = data.flatMap((d, i) => {
          const cell = keys.map((key) => ({ index: i, key, value: d[key] }));
          return [...cell, { index: i, key: "index", value: i }];
        });
        return [...ths, ...tds].reverse();
      },
    ],
    scales: {
      y: { type: "band", padding: 0 },
      x: { domain: ["index", ...keys], padding: 0 },
      fontWeight: { type: "identity" },
    },
    width: 900,
    guides: {
      x: { display: false },
      y: { display: false },
    },
    encodings: {
      y: "index",
      x: "key",
    },
    children: [
      {
        type: "cell",
        encodings: {
          fill: "none",
          stroke: "#eee",
        },
      },
      {
        type: "text",
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        encodings: {
          text: (d) => (d.header ? d.value.toUpperCase() : d.value),
          fontWeight: (d) => (d.header ? "bold" : "normal"),
        },
        styles: {
          dx: "0.5em",
          dy: "-1em",
        },
      },
    ],
  });
})();
```

## Flex

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "row",
    data,
    scales: {
      y: { label: "count" },
    },
    padding: 10,
    width: 900,
    children: [
      {
        type: "rect",
        paddingTop: 30,
        statistics: [{ type: "binX", channel: "y" }],
        encodings: {
          x: "height",
        },
        paddingRight: 0,
      },
      {
        type: "rect",
        paddingTop: 30,
        statistics: [{ type: "binX", channel: "y" }],
        encodings: {
          x: "weight",
        },
      },
    ],
  });
})();
```

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "col",
    data,
    scales: {
      y: { label: "count" },
    },
    padding: 20,
    height: 640,
    children: [
      {
        type: "rect",
        paddingTop: 30,
        statistics: [{ type: "binX", channel: "y" }],
        encodings: {
          x: "height",
        },
        paddingBottom: 0,
      },
      {
        type: "rect",
        paddingTop: 30,
        statistics: [{ type: "binX", channel: "y" }],
        encodings: {
          x: "weight",
        },
      },
    ],
  });
})();
```

```js | dom
sp.plot({
  type: "row",
  width: 840,
  height: 600,
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  flex: [1.2, 1],
  padding: 10,
  children: [
    {
      type: "interval",
      paddingRight: 0,
      encodings: {
        x: "genre",
        y: "sold",
        fill: "steelblue",
      },
    },
    {
      type: "col",
      guides: {
        x: { display: false },
        y: { display: false },
        color: { label: "Genre" },
      },
      encodings: {
        y: "sold",
        fill: "genre",
      },
      children: [
        {
          type: "interval",
          paddingLeft: 0,
          coordinates: [{ type: "polar" }],
          encodings: { x: "genre" },
        },
        {
          type: "interval",
          paddingLeft: 0,
          coordinates: [{ type: "transpose" }, { type: "polar" }],
          statistics: [{ type: "stackY" }],
          transforms: [
            (data) => {
              const sum = data.reduce((total, d) => total + d.sold, 0);
              return data.map(({ genre, sold }) => ({
                genre,
                sold: sold / sum,
              }));
            },
          ],
          scales: {
            x: { padding: 0 },
          },
        },
      ],
    },
  ],
});
```

## Facet

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/49cfe4c4-192c-40c5-ad2c-133342c8b8c5.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "facet",
    data,
    encodings: {
      y: "sex",
    },
    paddingBottom: 0,
    height: 600,
    scales: {
      y: { label: null },
    },
    children: [
      {
        type: "rect",
        data,
        transforms: [(data) => data.filter((d) => d.height)],
        statistics: [{ type: "binX", channel: "y" }],
        scales: {
          y: { label: "count" },
          color: { domain: ["male", "female"] },
        },
        encodings: {
          x: "height",
          fill: "sex",
        },
      },
    ],
  });
})();
```

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json"
  );
  const data = await response.json();
  return sp.plot({
    data,
    type: "facet",
    width: 860,
    height: 860,
    encodings: {
      x: "cut",
      y: "clarity",
    },
    scales: {
      x: { label: null },
      y: { label: null },
    },
    padding: 15,
    paddingTop: 10,
    children: [
      {
        type: "point",
        data,
        encodings: {
          x: "carat",
          y: "price",
        },
        paddingTop: 0,
        paddingRight: 0,
        guides: {
          x: { tickCount: 3 },
          y: { tickCount: 3 },
        },
      },
    ],
  });
})();
```
