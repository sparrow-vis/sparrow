# Statistic

- <a href="#stacky">stackY</a>
- <a href="#normalizey">normalizeY</a>
- <a href="#symmetryy">symmetryY</a>
- <a href="#biny">binX</a>

## StackY

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
  guides: {
    y: { grid: true },
  },
  statistics: [{ type: "stackY" }],
  encodings: {
    x: "month",
    y: "rainfall",
    fill: "city",
  },
});
```

```js | dom
sp.plot({
  type: "area",
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
  statistics: [{ type: "stackY" }],
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

## NormalizeY

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
  guides: {
    y: { grid: true },
  },
  statistics: [{ type: "stackY" }, { type: "normalizeY" }],
  encodings: {
    x: "month",
    y: "rainfall",
    fill: "city",
  },
});
```

## SymmetryY

```js | dom
sp.plot({
  type: "area",
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
  paddingLeft: 60,
  transforms: [(data) => data.sort((a, b) => b.sold - a.sold)],
  statistics: [{ type: "symmetryY" }],
  coordinates: [{ type: "transpose" }],
  encodings: {
    x: "genre",
    y: "sold",
  },
});
```

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/49cfe4c4-192c-40c5-ad2c-133342c8b8c5.json"
  );
  const data = await response.json();
  return sp.plot({
    data,
    type: "point",
    width: 800,
    transforms: [(data) => data.filter((d) => d.height)],
    statistics: [{ type: "symmetryY" }],
    coordinates: [{ type: "transpose" }],
    guides: {
      y: { formatter: (d) => d + "m" },
    },
    paddingLeft: 120,
    encodings: {
      x: "sport",
      y: "height",
      stroke: "sex",
    },
  });
})();
```

## BinX

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/49cfe4c4-192c-40c5-ad2c-133342c8b8c5.json"
  );
  const data = await response.json();
  return sp.plot({
    data,
    type: "rect",
    transforms: [(data) => data.filter((d) => d.height)],
    statistics: [{ type: "binX", channel: "y" }],
    guides: {
      x: { formatter: (d) => d.toFixed(1) },
    },
    scales: { y: { label: "count" } },
    paddingTop: 30,
    encodings: {
      x: "height",
    },
  });
})();
```
