# Work With D3

- <a href="#d3-cloud">d3-cloud</a>

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
