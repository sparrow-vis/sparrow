# Visualize Sophie's World

## Data

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json"
  );
  const data = await response.json();
  const keys = ["id", "name", "country", "lifespan", "points"];
  return sp.plot({
    data,
    type: "text",
    transforms: [
      (data) => data.filter((_, i) => i < 10),
      (data) =>
        data.map(({ lifespan, points, ...rest }) => ({
          ...rest,
          lifespan: `[${lifespan[0]}, ${lifespan[1]}]`,
          points: `[${points
            .slice(0, 2)
            .map((d) => d.slice(0, 3) + "...")
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
      y: { type: "band" },
      x: { domain: ["index", ...keys] },
      fontWeight: { type: "identity" },
    },
    width: 900,
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

```js | dom "pin:false"
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/3df5a34b-9141-453b-b1c9-5dd0eba32273.json"
  );
  const data = await response.json();
  const keys = ["id", "title"];
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

```js | dom "pin: false"
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/188bb992-7a9b-4e0e-a036-d1d0e4269738.json"
  );
  const data = await response.json();
  const keys = ["id", "name", "type", "points"];
  return sp.plot({
    data,
    type: "text",
    transforms: [
      (data) => data.filter((_, i) => i < 10),
      (data) =>
        data.map(({ points, ...rest }) => ({
          ...rest,
          points: `[${points
            .slice(0, 2)
            .map((d) => d.slice(0, 3) + "...")
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

```js | dom "pin: false"
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/61a39597-9564-4f7e-9eb3-3bdd2280061d.json"
  );
  const data = await response.json();
  const keys = ["from", "to", "type"];
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

## Keywords

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json"
  );
  const data = await response.json();
  const words = data.flatMap((d) =>
    d.words.map(({ weight, word }) => ({
      value: weight,
      text: word,
      name: d.name,
    }))
  );

  const width = 640;
  const height = 480;

  return await new Promise((resolve) => {
    d3.layout
      .cloud()
      .size([width, height])
      .words(words)
      .padding(2)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize((d) => d.value * 2)
      .on("end", (computedWords) => {
        const chart = sp.plot({
          data: computedWords,
          type: "text",
          width,
          height,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          guides: {
            x: { display: false },
            y: { display: false },
            color: { display: false },
          },
          scales: {
            fontSize: { type: "identity" },
            rotate: { type: "identity" },
            y: { range: [0, 1] },
          },
          encodings: {
            x: "x",
            y: "y",
            rotate: "rotate",
            fontSize: "size",
            text: "text",
            fill: "name",
          },
          styles: {
            textAnchor: "middle",
          },
        });
        resolve(chart);
      })
      .start();
  });
})();
```
