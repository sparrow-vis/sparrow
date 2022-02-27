# Work With D3

- <a href="#d3-cloud">d3-cloud</a>
- <a href="#d3-force">d3-force</a>
- <a href="#d3-hierarchy">d3-hierarchy</a>
- <a href="#d3-geo">d3-geo</a>

## d3-cloud

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

## d3-force

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
    type: "问题",
    children: questions
      .filter(({ id }) => qidPid.has(id))
      .map(({ title, id }) => ({
        name: title,
        type: "问题",
        children: Array.from(qidPid.get(id)).map((d) => {
          const [people] = pidData.get(+d.to);
          return {
            name: people.name,
            type: "哲学家",
          };
        }),
      })),
  };

  // nested data to visual data
  const root = d3.hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();
  const simulation = d3
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
    .stop();

  // @see https://bl.ocks.org/mbostock/1667139
  // compute a static force layout
  const n = Math.ceil(
    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
  );
  for (let i = 0; i < n; ++i) {
    simulation.tick();
  }

  // plot
  return sp.plot({
    type: "layer",
    guides: {
      x: { display: false },
      y: { display: false },
    },
    children: [
      {
        type: "link",
        data: links,
        encodings: {
          x: (d) => d.source.x,
          y: (d) => d.source.y,
          x1: (d) => d.target.x,
          y1: (d) => d.target.y,
          stroke: "#ddd",
        },
      },
      {
        type: "point",
        data: nodes,
        encodings: {
          x: "x",
          y: "y",
          r: 10,
          fill: (d) => d.data.type,
          stroke: (d) => d.data.type,
        },
        styles: {
          fillOpacity: 0.7,
        },
      },
    ],
  });
})();
```

## d3-hierarchy

```js | dom
(async () => {
  // request data
  const URLS = [
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json",
    "https://gw.alipayobjects.com/os/bmw-prod/188bb992-7a9b-4e0e-a036-d1d0e4269738.json",
    "https://gw.alipayobjects.com/os/bmw-prod/61a39597-9564-4f7e-9eb3-3bdd2280061d.json",
  ];
  const [people, schools, relations] = await Promise.all(
    URLS.map(async (url) => {
      const response = await fetch(url);
      return await response.json();
    })
  );

  // flatten data to nested data
  const sidPid = d3.group(
    relations.filter((d) => d.type === "0"),
    (d) => +d.from
  );
  const pidData = d3.group(people, (d) => +d.id);
  const name = (d) => {
    const { name } = d.data;
    return name.length > 4 ? name.slice(0, 3) + "..." : name;
  };
  const data = {
    name: "哲学家",
    children: schools
      .filter(({ id }) => sidPid.has(id))
      .map(({ name, id }) => ({
        name,
        children: Array.from(sidPid.get(id)).map((d) => {
          const [people] = pidData.get(+d.to);
          return {
            name: people.name,
          };
        }),
      })),
  };

  // compute visual data
  const width = 800;
  const height = 800;
  const margin = 5;
  const padding = 5;
  const root = d3.hierarchy(data);
  root.count();

  const descendants = root.descendants();
  d3
    .pack()
    .size([width - margin * 2, height - margin * 2])
    .padding(padding)(root);

  return sp.plot({
    type: "layer",
    data: descendants,
    width,
    height,
    guides: {
      x: { display: false },
      y: { display: false },
      color: { display: false },
    },
    scales: {
      r: { type: "identity" },
      x: { domain: [0, width - margin * 2] },
      y: { domain: [0, height - margin * 2], range: [0, 1] },
    },
    encodings: {
      x: "x",
      y: "y",
    },
    children: [
      {
        type: "point",
        paddingLeft: margin,
        paddingRight: margin,
        paddingBottom: margin,
        paddingTop: margin,
        encodings: {
          r: "r",
          stroke: "height",
          fill: "height",
        },
      },
      {
        type: "text",
        transforms: [(data) => data.filter((d) => d.height === 0)],
        encodings: {
          text: name,
        },
        styles: {
          textAnchor: "middle",
          dy: "0.5em",
        },
      },
    ],
  });
})();
```

## d3-geo

```js | dom
(async () => {
  //@see https://observablehq.com/@d3/world-airports?collection=@d3/d3-geo

  const URLS = [
    "https://gw.alipayobjects.com/os/bmw-prod/a51018d2-69ef-4e6b-8095-5d4f5815166e.json",
    "https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json",
    "https://gw.alipayobjects.com/os/bmw-prod/1070dc04-329e-4655-95b0-f1dc094206b1.json",
  ];
  const [world, people, country] = await Promise.all(
    URLS.map(async (url) => {
      const response = await fetch(url);
      return await response.json();
    })
  );

  const projection = d3.geoNaturalEarth1();

  // compute the height
  const outline = { type: "Sphere" };
  const width = 800;
  const height = (() => {
    const [[x0, y0], [x1, y1]] = d3
      .geoPath(projection.fitWidth(width, outline))
      .bounds(outline);
    const dy = Math.ceil(y1 - y0),
      l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
    return dy;
  })();

  // compute paths data
  const path = d3.geoPath(projection);
  const land = topojson.feature(world, world.objects.land);
  const graticule = d3.geoGraticule10();
  const paths = [
    { d: path(land), fill: "#ddd", stroke: "none" },
    { d: path(graticule), fill: "none", stroke: "#ddd" },
    { d: path(outline), fill: "none", stroke: "black" },
  ];

  // compute points data
  const countryCentroid = new Map(
    country.features
      .filter((d) => d.properties.name)
      .map((d) => [d.properties.name, d.properties.centroid])
  );
  const countryName = (d) => (d === "雅典" ? "希腊" : d);
  const countries = Array.from(
    d3.group(people, (d) => d.country),
    ([country, people]) => {
      const [x, y] = projection(countryCentroid.get(countryName(country)));
      return {
        country,
        count: people.length,
        x,
        y,
      };
    }
  );

  return sp.plot({
    type: "layer",
    width,
    height,
    children: [
      {
        type: "path",
        data: paths,
        scales: {
          color: { type: "identity" },
        },
        guides: { color: { display: false } },
        encodings: {
          d: "d",
          fill: "fill",
          stroke: "stroke",
        },
      },
      {
        type: "point",
        guides: { x: { display: false }, y: { display: false } },
        scales: {
          y: { range: [0, 1], domain: [0, height] },
          x: { domain: [0, width] },
          r: { range: [3, 6] },
        },
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        data: countries,
        encodings: {
          x: "x",
          y: "y",
          r: "count",
          fill: "steelblue",
          stroke: "steelblue",
        },
      },
    ],
  });
})();
```
