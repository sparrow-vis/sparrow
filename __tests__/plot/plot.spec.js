import * as sp from '../../src/plot';
import { mount, createDiv } from '../utils';
import {
  heatmap,
  treemap,
  sports,
  rainfall,
  profit,
  line,
  countries,
  temperatures,
  users,
  facet,
  negative,
} from './data';

describe('plot', () => {
  test('interval with field encoding', () => {
    const chart = sp.plot({
      type: 'interval',
      data: sports,
      encodings: {
        x: 'genre',
        y: 'sold',
        fill: 'genre',
      },
    });
    mount(createDiv(), chart);
  });

  test('binned rect', () => {
    const chart = sp.plot({
      type: 'rect',
      data: rainfall,
      scales: {
        y: { nice: true, label: 'count' },
      },
      guides: {
        x: { grid: true },
        y: { grid: true },
      },
      statistics: [{ type: 'binX', channel: 'y', count: 5 }],
      encodings: {
        x: 'rainfall',
      },
    });

    mount(createDiv(), chart);
  });

  test('interval in polar', () => {
    const chart = sp.plot({
      type: 'interval',
      data: sports,
      coordinates: [{ type: 'polar' }],
      guides: {
        x: { display: false },
        y: { grid: true, tick: false },
        color: { label: 'Genre' },
      },
      encodings: {
        x: 'genre',
        y: 'sold',
        fill: 'genre',
      },
    });

    mount(createDiv(), chart);
  });

  test('symmetried interval', () => {
    const chart = sp.plot({
      type: 'interval',
      data: sports,
      paddingLeft: 60,
      transforms: [(data) => data.sort((a, b) => b.sold - a.sold)],
      statistics: [{ type: 'symmetryY' }],
      coordinates: [{ type: 'transpose' }],
      encodings: {
        x: 'genre',
        y: 'sold',
      },
    });
    mount(createDiv(), chart);
  });

  test('stacked interval in polar', () => {
    const chart = sp.plot({
      type: 'interval',
      data: sports,
      transforms: [
        (data) => {
          const sum = data.reduce((total, d) => total + d.sold, 0);
          return data.map(({ genre, sold }) => ({ genre, sold: sold / sum }));
        },
      ],
      coordinates: [{ type: 'transpose' }, { type: 'polar' }],
      statistics: [{ type: 'stackY' }],
      scales: {
        x: { padding: 0 },
      },
      guides: {
        x: { display: false },
        y: { display: false },
      },
      encodings: {
        y: 'sold',
        fill: 'genre',
      },
      styles: {
        stroke: '#000',
        strokeWidth: 2,
      },
    });
    mount(createDiv(), chart);
  });

  test('interval with negative values', () => {
    const chart = sp.plot({
      type: 'interval',
      data: negative,
      scales: {
        y: { nice: true },
      },
      encodings: {
        x: 'a',
        y: 'b',
      },
    });
    mount(createDiv(), chart);
  });

  test('col and row', () => {
    const chart = sp.plot({
      type: 'row',
      width: 840,
      height: 600,
      data: sports,
      flex: [1.2, 1],
      children: [
        {
          type: 'interval',
          paddingRight: 0,
          encodings: {
            x: 'genre',
            y: 'sold',
            fill: 'steelblue',
          },
        },
        {
          type: 'col',
          guides: {
            x: { display: false },
            y: { display: false },
            color: { label: 'Genre' },
          },
          encodings: {
            y: 'sold',
            fill: 'genre',
          },
          children: [
            {
              type: 'interval',
              paddingLeft: 0,
              coordinates: [{ type: 'polar' }],
              encodings: { x: 'genre' },
            },
            {
              type: 'interval',
              paddingLeft: 0,
              coordinates: [{ type: 'transpose' }, { type: 'polar' }],
              statistics: [{ type: 'stackY' }],
              scales: {
                x: { padding: 0 },
              },
            },
          ],
        },
      ],
    });

    mount(createDiv(), chart);
  });

  test('grouped interval', () => {
    const chart = sp.plot({
      type: 'interval',
      data: rainfall,
      paddingLeft: 60,
      scales: {
        y: { nice: true },
        color: { range: ['steelblue', 'orange'] },
      },
      guides: {
        y: { grid: true },
      },
      encodings: {
        x: 'month',
        y: 'rainfall',
        fill: 'city',
        z: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  test('pyramid interval with transform encoding', () => {
    const chart = sp.plot({
      type: 'interval',
      data: rainfall,
      paddingLeft: 60,
      scales: {
        y: { nice: true },
        color: { range: ['steelblue', 'orange'] },
      },
      guides: {
        y: { grid: true },
      },
      coordinates: [{ type: 'transpose' }],
      encodings: {
        x: 'month',
        y: (d) => (d.city === 'London' ? d.rainfall : -d.rainfall),
        fill: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  test('normalized interval', () => {
    const chart = sp.plot({
      type: 'interval',
      data: rainfall,
      paddingLeft: 60,
      scales: {
        y: { nice: true },
        color: { range: ['steelblue', 'orange'] },
      },
      guides: {
        y: { grid: true },
      },
      statistics: [{ type: 'stackY' }, { type: 'normalizeY' }],
      encodings: {
        x: 'month',
        y: 'rainfall',
        fill: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  test('layerd text and interval with y and y1 encoded', () => {
    const chart = sp.plot({
      type: 'layer',
      data: profit,
      encodings: {
        x: 'month',
        y: 'start',
      },
      width: 800,
      children: [
        {
          type: 'interval',
          paddingLeft: 80,
          encodings: {
            y1: 'end',
            fill: (d) => (d.month === 'Total'
              ? 'Total'
              : d.profit > 0
                ? 'Increase'
                : 'Decrease'),
          },
        },
        {
          type: 'text',
          encodings: {
            text: (d) => (d.profit > 0 ? `+${d.profit}` : d.profit),
            y: (d) => (d.profit > 0 ? d.end : d.start),
            fontSize: 10,
          },
          styles: {
            dy: '-0.5em',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  test('line', () => {
    const chart = sp.plot({
      type: 'line',
      data: line,
      scales: {
        y: { nice: true },
        x: { nice: true },
      },
      guides: {
        x: { formatter: (d) => d.getFullYear(), grid: true },
        y: { grid: true },
      },
      encodings: {
        x: 'year',
        y: 'value',
      },
    });

    mount(createDiv(), chart);
  });

  test('grouped line', () => {
    const chart = sp.plot({
      type: 'line',
      data: temperatures,
      scales: { y: { nice: true, label: 'temp' } },
      encodings: {
        x: 'month',
        y: 'temperature',
        stroke: 'city',
      },
    });

    mount(createDiv(), chart);
  });

  test('layered line and point', () => {
    const chart = sp.plot({
      type: 'layer',
      encodings: {
        x: 'month',
        y: 'temperature',
        stroke: 'city',
      },
      data: temperatures,
      scales: { y: { nice: true, label: 'temp' } },
      children: [
        { type: 'line' },
        {
          type: 'point',
          encodings: {
            fill: 'city',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  test('rowed line and point', () => {
    const chart = sp.plot({
      type: 'row',
      width: 840,
      height: 300,
      padding: 0,
      scales: { y: { nice: true, label: 'temp' } },
      encodings: {
        x: 'month',
        y: 'temperature',
        stroke: 'city',
      },
      data: temperatures,
      children: [
        { type: 'line', paddingRight: 0 },
        {
          type: 'point',
          paddingLeft: 30,
          encodings: { fill: 'city' },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  test('coled line and point', () => {
    const chart = sp.plot({
      type: 'col',
      height: 840,
      padding: 0,
      data: temperatures,
      scales: { y: { nice: true, label: 'temp' } },
      encodings: {
        x: 'month',
        y: 'temperature',
        stroke: 'city',
      },
      children: [
        { type: 'line' },
        {
          type: 'point',
          encodings: {
            fill: 'city',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  test('stacked point', () => {
    const chart = sp.plot({
      data: countries,
      type: 'point',
      statistics: [{ type: 'stackY' }],
      scales: {
        y: { nice: true },
      },
      encodings: {
        x: 'year',
        y: 'value',
        stroke: 'country',
      },
    });
    mount(createDiv(), chart);
  });

  test('point with x encoded', () => {
    const chart = sp.plot({
      data: countries,
      type: 'point',
      height: 150,
      encodings: {
        x: 'year',
      },
    });
    mount(createDiv(), chart);
  });

  test('point with interpolated log scale', () => {
    const chart = sp.plot({
      data: countries,
      type: 'point',
      scales: {
        y: { nice: true, zero: false, type: 'log' },
        r: {
          range: [3, 20],
          interpolate: (t, a, b) => Math.sqrt(a * a * (1 - t) + b * b * t),
        },
      },
      guides: {
        y: { formatter: (d) => d | 0 },
      },
      encodings: {
        x: 'year',
        y: 'value',
        stroke: 'country',
        r: 'value',
      },
      styles: {
        strokeWidth: 2,
      },
    });

    mount(createDiv(), chart);
  });

  test('link', () => {
    const chart = sp.plot({
      type: 'link',
      data: profit,
      paddingLeft: 80,
      transforms: [(data) => data.filter((d) => d.month !== 'Total')],
      scales: {
        color: { type: 'identity' },
        y: { nice: true },
      },
      encodings: {
        x: 'month',
        y: 'start',
        y1: 'end',
        stroke: (d) => (d.profit > 0 ? 'red' : 'green'),
      },
      styles: {
        strokeWidth: 2,
      },
    });

    mount(createDiv(), chart);
  });

  test('stacked and symmetried area', () => {
    const chart = sp.plot({
      type: 'area',
      data: countries,
      guides: {
        y: { grid: true },
      },
      statistics: [{ type: 'stackY' }, { type: 'symmetryY' }],
      encodings: {
        x: 'year',
        y: 'value',
        fill: 'country',
      },
      styles: {
        fillOpacity: 0.8,
      },
    });

    mount(createDiv(), chart);
  });

  test('area and point in polar', () => {
    const chart = sp.plot({
      type: 'layer',
      data: users,
      coordinates: [{ type: 'polar' }],
      guides: {
        y: { grid: true },
        x: { grid: true },
        color: { width: 50 },
      },
      encodings: {
        x: 'item',
        y: 'score',
        stroke: 'user',
        fill: 'user',
      },
      styles: {
        fillOpacity: 0.4,
        strokeOpacity: 0.4,
      },
      children: [{ type: 'area' }, { type: 'point' }],
    });

    mount(createDiv(), chart);
  });

  test('cell', () => {
    const chart = sp.plot({
      type: 'cell',
      data: heatmap,
      width: 800,
      paddingTop: 60,
      guides: {
        color: { width: 150 },
      },
      encodings: {
        x: 'x',
        y: 'y',
        fill: 'color',
      },
    });

    mount(createDiv(), chart);
  });

  test('cell with quantile scale', () => {
    const chart = sp.plot({
      type: 'cell',
      data: heatmap,
      width: 800,
      scales: {
        color: { type: 'quantile' },
      },
      guides: {
        color: { formatter: (d) => d | 0 },
      },
      encodings: {
        x: 'x',
        y: 'y',
        fill: 'color',
      },
    });

    mount(createDiv(), chart);
  });

  test('cell with quantize scale', () => {
    const chart = sp.plot({
      type: 'cell',
      data: heatmap,
      width: 800,
      scales: {
        color: { type: 'quantize' },
      },
      guides: {
        color: { formatter: (d) => d | 0 },
      },
      encodings: {
        x: 'x',
        y: 'y',
        fill: 'color',
      },
    });

    mount(createDiv(), chart);
  });

  test('cell with threshold scale', () => {
    const chart = sp.plot({
      type: 'cell',
      data: heatmap,
      width: 800,
      scales: {
        color: { type: 'threshold', domain: [10, 30] },
      },
      guides: {
        color: { formatter: (d) => d | 0 },
      },
      encodings: {
        x: 'x',
        y: 'y',
        fill: 'color',
      },
    });

    mount(createDiv(), chart);
  });

  test('rect and text', () => {
    const chart = sp.plot({
      type: 'layer',
      children: [
        {
          type: 'rect',
          data: treemap,
          guides: {
            x: { display: false },
            y: { display: false },
            color: { display: false },
          },
          encodings: {
            x: 'x',
            y: 'y',
            x1: 'x1',
            y1: 'y1',
            fill: 'name',
          },
        },
        {
          type: 'text',
          data: treemap,
          encodings: {
            x: (d) => (d.x + d.x1) / 2,
            y: (d) => (d.y + d.y1) / 2,
            text: 'name',
          },
          styles: {
            dy: '0.5em',
            textAnchor: 'middle',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  test('facet', () => {
    const chart = sp.plot({
      type: 'facet',
      data: facet,
      encodings: {
        y: 'city',
        x: 'type',
      },
      paddingLeft: 80,
      scales: {
        y: { label: null },
        x: { label: null },
      },
      children: [
        {
          type: 'interval',
          data: facet,
          scales: {
            x: { nice: true },
            y: { nice: true },
          },
          guides: {
            color: { width: 100 },
          },
          encodings: {
            x: 'month',
            y: 'rainfall',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  test.skip('facet', () => {
    fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    ).then((response) => response.json())
      .then((data) => {
        const chart = sp.plot({
          data,
          type: 'facet',
          width: 900,
          height: 900,
          encodings: {
            x: 'cut',
            y: 'clarity',
          },
          scales: {
            x: { label: null },
            y: { label: null },
          },
          padding: 15,
          children: [
            {
              type: 'point',
              data,
              encodings: {
                x: 'carat',
                y: 'price',
              },
              paddingTop: 0,
              guides: {
                x: { tickCount: 3 },
                y: { tickCount: 3 },
              },
            },
          ],
        });
        mount(createDiv(), chart);
      });
  });

  test.skip('ribbon', () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/b45f3425-04bc-454a-8edd-26a0b4fc28d6.json',
    ).then((response) => response.json()).then((data) => {
      const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const chart = sp.plot({
        type: 'layer',
        data,
        width: 800,
        statistics: [{ type: 'stackY' }],
        encodings: {
          y: 'profit',
          x: (d) => month[d.month],
          // x: 'month',
          fill: 'territory',
        },
        scales: {
          x: { type: 'band', padding: 0.5 },
        },
        guides: {
          color: { width: 80, formatter: (d) => d.split(' ').pop() },
          y: { formatter: (d) => `${(d / 1000) | 0}k` },
        },
        children: [
          {
            type: 'area',
            styles: {
              fillOpacity: 0.7,
            },
          },
          {
            type: 'interval',
          },
        ],
      });
      mount(createDiv(), chart);
    });
  });
});
