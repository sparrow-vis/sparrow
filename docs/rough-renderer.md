# Rough Renderer

- <a href="#rough-interval">Rough Interval</a>
- <a href="#rough-cell">Rough Cell</a>
- <a href="#rough-line">Rough Line</a>
- <a href="#rough-point">Rough Point</a>
- <a href="#rough-area">Rough Area</a>
- <a href="#rough-path">Rough Path</a>
- <a href="#rough-mix">Rough Mix</a>

## Rough Interval

```js | dom
sp.plot({
  type: "interval",
  renderer: r2.createPlugin(),
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

## Rough Cell

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "cell",
    data,
    renderer: r2.createPlugin(),
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

## Rough Line

```js | dom
sp.plot({
  type: "line",
  renderer: r2.createPlugin(),
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

## Rough Point

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json"
  );
  const data = await response.json();
  return sp.plot({
    type: "point",
    data,
    renderer: r2.createPlugin(),
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

## Rough Area

```js | dom
sp.plot({
  type: "area",
  renderer: r2.createPlugin(),
  data: [
    { country: "Europe", year: "1750", value: 163 },
    { country: "Europe", year: "1800", value: 203 },
    { country: "Europe", year: "1850", value: 276 },
    { country: "Europe", year: "1900", value: 628 },
    { country: "Europe", year: "1950", value: 547 },
    { country: "Europe", year: "1999", value: 729 },
    { country: "Europe", year: "2050", value: 408 },
    { country: "Oceania", year: "1750", value: 200 },
    { country: "Oceania", year: "1800", value: 200 },
    { country: "Oceania", year: "1850", value: 200 },
    { country: "Oceania", year: "1900", value: 460 },
    { country: "Oceania", year: "1950", value: 230 },
    { country: "Oceania", year: "1999", value: 300 },
    { country: "Oceania", year: "2050", value: 300 },
    { country: "Africa", year: "1750", value: 106 },
    { country: "Africa", year: "1800", value: 107 },
    { country: "Africa", year: "1850", value: 111 },
    { country: "Africa", year: "1900", value: 1766 },
    { country: "Africa", year: "1950", value: 221 },
    { country: "Africa", year: "1999", value: 767 },
    { country: "Africa", year: "2050", value: 133 },
    { country: "Asia", year: "1750", value: 502 },
    { country: "Asia", year: "1800", value: 635 },
    { country: "Asia", year: "1850", value: 809 },
    { country: "Asia", year: "1900", value: 5268 },
    { country: "Asia", year: "1950", value: 4400 },
    { country: "Asia", year: "1999", value: 3634 },
    { country: "Asia", year: "2050", value: 947 },
  ],
  guides: {
    y: { grid: true },
  },
  statistics: [{ type: "stackY" }, { type: "symmetryY" }],
  encodings: {
    x: "year",
    y: "value",
    fill: "country",
  },
  styles: {
    fillOpacity: 0.8,
  },
});
```

## Rough Path

```js | dom
(() => {
  const svg = sp.plot({
    type: "path",
    renderer: r2.createPlugin(),
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
    styles: {
      fill: "black",
    },
  });
  svg.setAttribute("viewBox", [0, 0, 1024, 1024]);
  return svg;
})();
```

## Rough Mix

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
    renderer: r2.createPlugin(),
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
