# Coordinate

- <a href="#polar">Polar</a>
- <a href="#transpose">Transpose</a>
- <a href="#mix">Mix</a>

## Polar

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
  coordinates: [{ type: "polar" }],
  guides: { y: { display: false } },
  paddingLeft: 10,
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
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  transforms: [
    (data) => {
      const sum = data.reduce((total, d) => total + d.sold, 0);
      return data.map(({ genre, sold }) => ({ genre, sold: sold / sum }));
    },
  ],
  coordinates: [{ type: "transpose" }, { type: "polar" }],
  statistics: [{ type: "stackY" }],
  paddingLeft: 10,
  scales: {
    x: { padding: 0 },
  },
  guides: {
    x: { display: false },
    y: { display: false },
  },
  encodings: {
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
  guides: {
    x: { display: false },
  },
  statistics: [{ type: "stackY" }, { type: "normalizeY" }],
  coordinates: [{ type: "transpose" }, { type: "polar" }],
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
    { item: "Design", user: "a", score: 70 },
    { item: "Design", user: "b", score: 30 },
    { item: "Development", user: "a", score: 60 },
    { item: "Development", user: "b", score: 70 },
    { item: "Marketing", user: "a", score: 50 },
    { item: "Marketing", user: "b", score: 60 },
    { item: "Users", user: "a", score: 40 },
    { item: "Users", user: "b", score: 50 },
    { item: "Test", user: "a", score: 60 },
    { item: "Test", user: "b", score: 70 },
    { item: "Language", user: "a", score: 70 },
    { item: "Language", user: "b", score: 50 },
    { item: "Technology", user: "a", score: 50 },
    { item: "Technology", user: "b", score: 40 },
    { item: "Support", user: "a", score: 30 },
    { item: "Support", user: "b", score: 40 },
    { item: "Sales", user: "a", score: 60 },
    { item: "Sales", user: "b", score: 40 },
    { item: "UX", user: "a", score: 50 },
    { item: "UX", user: "b", score: 60 },
  ],
  coordinates: [{ type: "polar" }],
  paddingLeft: 10,
  guides: {
    y: { grid: true, tickCount: 5 },
    x: { grid: true },
    color: { width: 50 },
  },
  encodings: {
    x: "item",
    y: "score",
    stroke: "user",
    fill: "user",
  },
  styles: {
    fillOpacity: 0.4,
    strokeOpacity: 0.4,
  },
});
```

## Transpose

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
  coordinates: [{ type: "transpose" }],
  paddingLeft: 80,
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
  guides: {
    y: { grid: true, formatter: d => Math.abs(d) },
  },
  coordinates: [{ type: "transpose" }],
  encodings: {
    x: "month",
    y: (d) => (d.city === "London" ? d.rainfall : -d.rainfall),
    fill: "city",
  },
});
```

## Mix

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
  coordinates: [{ type: "transpose" }, { type: "polar", endAngle: Math.PI }],
  scales: { x: { padding: 0 } },
  paddingLeft: 10,
  encodings: {
    x: "genre",
    y: "sold",
    fill: "genre",
  },
});
```
