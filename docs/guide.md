# Guide

Visualize scales to help comprehend visual marks.

## AxisX

```js | dom
sp.plot({
  type: "rect",
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
  scales: {
    y: { label: "count" },
  },
  guides: {
    x: { grid: true, type: "axisX" }, // The default type is already axisX.
    y: { grid: true },
  },
  statistics: [{ type: "binX", channel: "y", count: 5 }],
  encodings: {
    x: "rainfall",
  },
});
```

## AxisY

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
  coordinates: [{ type: "transpose" }, { type: "polar", endAngle: Math.PI }],
  guides: {
    x: { grid: true },
    y: { grid: true }, // The default type is already axisY.
  },
  encodings: {
    x: "month",
    y: "rainfall",
    fill: "city",
    z: "city",
  },
});
```

## LegendRamp

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
    scales: {
      color: { type: "quantile", range: ["#eee", "pink", "red"] },
    },
    coordinates: [
      {
        type: "polar",
        innerRadius: 0.2,
        outerRadius: 0.8,
        startAngle: 0,
        endAngle: (Math.PI / 2) * 3,
      },
    ],
    guides: {
      y: { display: false },
      color: {
        width: 250,
        formatter: (d) => `${(d / 1000) | 0} k`,
      },
    },
    paddingLeft: 10,
    encodings: {
      y: (_, i) => (i % 5) + 1,
      x: (_, i) => ((i / 5) | 0) + 1,
      fill: "salary",
      stroke: "black",
    },
  });
})();
```

## LegendSwatches

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "cell",
    data,
    height: 640,
    scales: {
      color: { type: "ordinal" },
      x: { padding: 0 },
      y: { padding: 0 },
    },
    guides: {
      // The default type is already legendSwatches.
      // Set swatches' width.
      color: { width: 30 },
      y: { display: false },
    },
    coordinates: [{ type: "polar" }],
    encodings: {
      x: "x",
      y: "y",
      fill: "index",
      stroke: "black",
    },
  });
})();
```
