# Scale

Map abstract data into visual attributes.

## Linear

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "point",
    data,
    scales: {
      y: { domain: [60, 85], label: "Life" },
      r: {
        range: [4, 45],
        interpolate: (t, a, b) => Math.sqrt(a * a * (1 - t) + b * b * t),
      },
    },
    encodings: {
      x: "GDP",
      y: "LifeExpectancy",
      r: "Population",
      fill: "continent",
      stroke: "continent",
    },
    styles: {
      fillOpacity: 0.8,
    },
  });
})();
```

## Log

```js | dom
sp.plot({
  type: "point",
  data: [
    { x: 95, y: 95, z: 13.8, name: "BE", country: "Belgium" },
    { x: 86.5, y: 102.9, z: 14.7, name: "DE", country: "Germany" },
    { x: 80.8, y: 91.5, z: 15.8, name: "FI", country: "Finland" },
    { x: 80.4, y: 102.5, z: 12, name: "NL", country: "Netherlands" },
    { x: 80.3, y: 86.1, z: 11.8, name: "SE", country: "Sweden" },
    { x: 78.4, y: 70.1, z: 16.6, name: "ES", country: "Spain" },
    { x: 74.2, y: 68.5, z: 14.5, name: "FR", country: "France" },
    { x: 73.5, y: 83.1, z: 10, name: "NO", country: "Norway" },
    { x: 71, y: 93.2, z: 24.7, name: "UK", country: "United Kingdom" },
    { x: 69.2, y: 57.6, z: 10.4, name: "IT", country: "Italy" },
    { x: 68.6, y: 20, z: 16, name: "RU", country: "Russia" },
    { x: 65.5, y: 126.4, z: 35.3, name: "US", country: "United States" },
    { x: 65.4, y: 50.8, z: 28.5, name: "HU", country: "Hungary" },
    { x: 63.4, y: 51.8, z: 15.4, name: "PT", country: "Portugal" },
    { x: 64, y: 82.9, z: 31.3, name: "NZ", country: "New Zealand" },
  ],
  paddingTop: 30,
  scales: {
    r: { range: [10, 40], type: "log" },
  },
  encodings: {
    x: "x",
    y: "y",
    r: "z",
  },
});
```

## Time

```js | dom
sp.plot({
  type: "line",
  data: [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ],
  paddingTop: 10,
  transforms: [
    (data) =>
      data.map(({ year, value }) => {
        const date = new Date();
        date.setFullYear(year);
        return { year: date, value };
      }),
  ],
  guides: {
    x: { formatter: (d) => d.getFullYear(), grid: true },
    y: { grid: true },
  },
  encodings: {
    x: "year",
    y: "value",
  },
});
```

## Ordinal

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
    },
    guides: {
      color: { width: 30 },
    },
    encodings: {
      x: "x",
      y: "y",
      fill: "index",
      stroke: "black",
    },
  });
})();
```

## Band

```js | dom
sp.plot({
  type: "interval",
  data: [
    { a: "A", b: -28 },
    { a: "B", b: 55 },
    { a: "C", b: -33 },
    { a: "D", b: 91 },
    { a: "E", b: 81 },
    { a: "F", b: 53 },
    { a: "G", b: -19 },
    { a: "H", b: 87 },
    { a: "I", b: 52 },
  ],
  encodings: {
    x: "a",
    y: "b",
  },
});
```

## Dot

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json"
  );
  const data = await response.json();
  return sp.plot({
    height: 120,
    type: "point",
    data,
    encodings: {
      x: "height",
    },
  });
})();
```

## Threshold

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
    scales: {
      color: {
        type: "threshold",
        domain: [10000, 100000],
        range: ["#eee", "pink", "red"],
      },
    },
    guides: {
      color: {
        width: 80,
        formatter: (d) => `${(d / 1000) | 0} k`,
      },
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

## Quantile

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
    scales: {
      color: { type: "quantile", range: ["#eee", "pink", "red"] },
    },
    guides: {
      color: {
        width: 250,
        formatter: (d) => `${(d / 1000) | 0} k`,
      },
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

## Quantize

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
    scales: {
      color: { type: "quantize", range: ["#eee", "pink", "red"] },
    },
    guides: {
      color: {
        width: 120,
        formatter: (d) => `${(d / 1000) | 0} k`,
      },
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
