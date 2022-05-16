# Geometry

Visual representation for data.

## Point

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "point",
    data,
    encodings: {
      x: "height",
      y: "weight",
      stroke: "gender",
    },
  });
})();
```

## Interval

```js | dom
sp.plot({
  type: "interval",
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
    fill: "genre",
  },
});
```

```js | dom
sp.plot({
  type: "interval",
  data: [
    { city: "London", month: "Jan.", rainfall: 18.9 },
    { city: "London", month: "Feb.", rainfall: 28.8 },
    { city: "London", month: "Mar.", rainfall: 39.3 },
    { city: "London", month: "Apr.", rainfall: 81.4 },
    { city: "London", month: "May", rainfall: 47 },
    { city: "London", month: "Jun.", rainfall: 20.3 },
    { city: "London", month: "Jul.", rainfall: 24 },
    { city: "London", month: "Aug.", rainfall: 35.6 },
    { city: "Berlin", month: "Jan.", rainfall: 12.4 },
    { city: "Berlin", month: "Feb.", rainfall: 23.2 },
    { city: "Berlin", month: "Mar.", rainfall: 34.5 },
    { city: "Berlin", month: "Apr.", rainfall: 99.7 },
    { city: "Berlin", month: "May", rainfall: 52.6 },
    { city: "Berlin", month: "Jun.", rainfall: 35.5 },
    { city: "Berlin", month: "Jul.", rainfall: 37.4 },
    { city: "Berlin", month: "Aug.", rainfall: 42.4 },
  ],
  paddingLeft: 60,
  encodings: {
    x: "month",
    y: "rainfall",
    fill: "city",
    z: "city",
  },
});
```

```js | dom
sp.plot({
  type: "interval",
  data: [
    { month: "Jan.", profit: 387264, start: 0, end: 387264 },
    { month: "Feb.", profit: 772096, start: 387264, end: 1159360 },
    { month: "Mar.", profit: 638075, start: 1159360, end: 1797435 },
    { month: "Apr.", profit: -211386, start: 1797435, end: 1586049 },
    { month: "May", profit: -138135, start: 1586049, end: 1447914 },
    { month: "Jun", profit: -267238, start: 1447914, end: 1180676 },
    { month: "Jul.", profit: 431406, start: 1180676, end: 1612082 },
    { month: "Aug.", profit: 363018, start: 1612082, end: 1975100 },
    { month: "Sep.", profit: -224638, start: 1975100, end: 1750462 },
    { month: "Oct.", profit: -299867, start: 1750462, end: 1450595 },
    { month: "Nov.", profit: 607365, start: 1450595, end: 2057960 },
    { month: "Dec.", profit: 1106986, start: 2057960, end: 3164946 },
    { month: "Total", start: 0, end: 3164946 },
  ],
  guides: {
    y: { formatter: (d) => ((d / 1000) | 0) + "k" },
  },
  encodings: {
    x: "month",
    y: "start",
    y1: "end",
    fill: (d) =>
      d.month === "Total" ? "Total" : d.profit > 0 ? "Increase" : "Decrease",
  },
});
```

## Cell

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "cell",
    data,
    transforms: [(data) => data.map((d) => ({ salary: d }))],
    width: 900,
    height: 320,
    scales: { color: { range: ["#ffffff", "#ff0000"] } },
    guides: {
      color: { width: 200, formatter: (d) => `${(d / 1000) | 0} k` },
    },
    encodings: {
      y: (_, i) => (i % 5) + 1,
      x: (_, i) => ((i / 5) | 0) + 1,
      fill: "salary",
      stroke: "black",
    },
  });
})();
```

## Rect

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "rect",
    data,
    scales: {
      y: { label: "count" },
    },
    paddingTop: 30,
    statistics: [{ type: "binX", channel: "y" }],
    encodings: {
      x: "height",
    },
  });
})();
```

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/9ae12ce8-8590-4bc4-b906-68c593cc460d.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "rect",
    data,
    guides: {
      x: { display: false },
      y: { display: false },
      color: { display: false },
    },
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    encodings: {
      x: "x",
      y: "y",
      x1: "x1",
      y1: "y1",
      fill: "name",
      stroke: "black",
    },
  });
})();
```

## Line

```js | dom
sp.plot({
  type: "line",
  data: [
    { year: "1991", value: 15468 },
    { year: "1992", value: 16100 },
    { year: "1993", value: 15900 },
    { year: "1994", value: 17409 },
    { year: "1995", value: 17000 },
    { year: "1996", value: 31056 },
    { year: "1997", value: 31982 },
    { year: "1998", value: 32040 },
    { year: "1999", value: 33233 },
  ],
  paddingTop: 10,
  encodings: {
    x: "year",
    y: "value",
  },
});
```

```js | dom
sp.plot({
  type: "line",
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
  scales: { y: { label: "temp" } },
  encodings: {
    x: "month",
    y: "temperature",
    stroke: "city",
  },
});
```

## Area

```js | dom
sp.plot({
  type: "area",
  paddingTop: 10,
  data: [
    { year: "1991", value: 15468 },
    { year: "1992", value: 16100 },
    { year: "1993", value: 15900 },
    { year: "1994", value: 17409 },
    { year: "1995", value: 17000 },
    { year: "1996", value: 31056 },
    { year: "1997", value: 31982 },
    { year: "1998", value: 32040 },
    { year: "1999", value: 33233 },
  ],
  encodings: {
    x: "year",
    y: "value",
  },
});
```

```js | dom
sp.plot({
  type: "area",
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
  scales: { y: { label: "temp" } },
  encodings: {
    x: "month",
    y: "temperature",
    fill: "city",
  },
  styles: {
    fillOpacity: "0.3",
  },
});
```

## Link

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/94ff125b-cec5-449f-9471-7d1cd4c92636.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "link",
    data,
    scales: {
      x: { type: "log", label: "Population" },
      y: { label: "Inequality" },
    },
    paddingLeft: 60,
    paddingTop: 30,
    guides: {
      x: { formatter: (d) => `${(d / 1000) | 0} k` },
    },
    encodings: {
      x: "POP_1980",
      y: "R90_10_1980",
      x1: "POP_2015",
      y1: "R90_10_2015",
      stroke: "black",
    },
  });
})();
```

## Text

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/49cfe4c4-192c-40c5-ad2c-133342c8b8c5.json"
  );
  const data = await response.json();
  const keys = ["id", "name", "nationality", "sex"];
  return sp.plot({
    data,
    type: "text",
    transforms: [
      (data) => data.filter((_, i) => i < 10),
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
      y: { type: "band" },
      x: { domain: ["index", ...keys] },
      fontWeight: { type: "identity" },
    },
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    guides: {
      x: { display: false },
      y: { display: false },
    },
    encodings: {
      y: "index",
      x: "key",
      text: (d) => (d.header ? d.value.toUpperCase() : d.value),
      fontWeight: (d) => (d.header ? "bold" : "normal"),
    },
    styles: {
      textAnchor: "middle",
      dy: "-0.5em",
    },
  });
})();
```

## Path

```js | dom
(() => {
  const svg = sp.plot({
    type: "path",
    data: [
      {
        d: "M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z",
      },
    ],
    width: 512,
    height: 512,
    encodings: {
      d: "d",
    },
  });
  svg.setAttribute("viewBox", [0, 0, 1024, 1024]);
  return svg;
})();
```
