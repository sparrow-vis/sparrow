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

```js | dom "pin:false"
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/3df5a34b-9141-453b-b1c9-5dd0eba32273.json"
  );
  const data = await response.json();
  const keys = ["id", "title"];
  return sp.plot({
    data,
    type: "layer",
    width: 900,
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
      y: { type: "band", padding: 0 },
      x: { domain: ["index", ...keys], padding: 0 },
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

```js | dom "pin: false"
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/188bb992-7a9b-4e0e-a036-d1d0e4269738.json"
  );
  const data = await response.json();
  const keys = ["id", "name", "type", "points"];
  return sp.plot({
    data,
    type: "layer",
    width: 900,
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
      y: { type: "band", padding: 0 },
      x: { domain: ["index", ...keys], padding: 0 },
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

```js | dom "pin: false"
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/61a39597-9564-4f7e-9eb3-3bdd2280061d.json"
  );
  const data = await response.json();
  const keys = ["from", "to", "type"];
  return sp.plot({
    data,
    type: "layer",
    width: 900,
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
      y: { type: "band", padding: 0 },
      x: { domain: ["index", ...keys], padding: 0 },
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

## Distribution

```js | dom
(async () => {
  const response = await fetch(
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json"
  );
  const data = await response.json();
  return sp.plot({
    data,
    transforms: [
      (data) =>
        data.map((d) => ({
          born: +new Date(d.lifespan[0], 0, 1),
          age: d.lifespan[1] - d.lifespan[0],
          name: d.name,
        })),
    ],
    type: "point",
    paddingTop: 30,
    guides: {
      x: {
        formatter: (d) => {
          const year = new Date(d).getFullYear();
          return ((year / 50) | 0) * 50;
        },
      },
    },
    encodings: {
      x: "born",
      y: "age",
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
  const computedWords = await new Promise((resolve) =>
    d3.layout
      .cloud()
      .size([width, height])
      .words(words)
      .padding(2)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize((d) => d.value * 2)
      .on("end", resolve)
      .start()
  );

  return sp.plot({
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
})();
```

## Structure

```js | dom
(async () => {
  // request data
  const URLS = [
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json",
    "https://gw.alipayobjects.com/os/bmw-prod/3df5a34b-9141-453b-b1c9-5dd0eba32273.json",
    "https://gw.alipayobjects.com/os/bmw-prod/188bb992-7a9b-4e0e-a036-d1d0e4269738.json",
    "https://gw.alipayobjects.com/os/bmw-prod/61a39597-9564-4f7e-9eb3-3bdd2280061d.json",
  ];
  const [people, questions, schools, relations] = await Promise.all(
    URLS.map(async (url) => {
      const response = await fetch(url);
      return await response.json();
    })
  );

  // flatten data to nested data
  const qidPid = d3.group(
    relations.filter((d) => d.type === "1"),
    (d) => +d.from
  );
  const pidData = d3.group([...people, ...schools], (d) => +d.id);
  const data = {
    name: "永恒的问题",
    children: questions
      .filter(({ id }) => qidPid.has(id))
      .map(({ title, id }) => ({
        name: title,
        children: Array.from(qidPid.get(id)).map((d) => {
          const [people] = pidData.get(+d.to);
          return {
            name: people.name,
          };
        }),
      })),
  };

  // nested data to visual data
  const root = d3.hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();
  await new Promise((resolve) =>
    d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("end", resolve)
  );

  return sp.plot({
    type: "layer",
    children: [
      {
        type: "link",
        data: links,
        encodings: {
          x: (d) => d.source.x,
          y: (d) => d.source.y,
          x1: (d) => d.target.x,
          y1: (d) => d.target.y,
        },
      },
      {
        type: "point",
        data: nodes,
        encodings: {
          x: "x",
          y: "y",
          r: 3.5,
        },
      },
    ],
  });
})();
```
