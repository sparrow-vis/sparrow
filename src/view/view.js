import { computeFlexViews } from './flex';
import { computeFacetViews } from './facet';
import { computeLayerViews } from './layer';
import { descendants } from './tree';
import { group } from '../utils';

export function createViews(root, { width = 600, height = 400 } = {}) {
  const nodes = descendants(root);
  const { paddingLeft = 30, paddingRight = 30, paddingBottom = 40, paddingTop = 40 } = root;
  const rootView = {
    x: paddingLeft,
    y: paddingTop,
    width: width - paddingLeft - paddingRight,
    height: height - paddingBottom - paddingTop,
  };
  const nodeView = new Map([[root, rootView]]);
  const computes = {
    layer: computeLayerViews,
    col: computeFlexViews,
    row: computeFlexViews,
    facet: computeFacetViews,
  };

  for (const node of nodes) {
    const view = nodeView.get(node);
    const { children = [], type } = node;
    const computeChildrenViews = computes[type];
    if (computeChildrenViews) {
      const childrenViews = computeChildrenViews(view, node);
      if (computeChildrenViews !== computeFacetViews) {
        for (const [i, child] of Object.entries(children)) {
          nodeView.set(child, childrenViews[i]);
        }
      } else {
        for (const child of children) {
          for (const view of childrenViews) {
            nodeView.set({ ...child }, view);
          }
        }
      }
    }
  }

  const key = (d) => `${d.x}-${d.y}-${d.width}-${d.height}`;
  const keyViews = group(Array.from(nodeView.entries()), ([, view]) => key(view));
  return Array.from(keyViews.values()).map((views) => {
    const view = views[0][1];
    const nodes = views.map((d) => d[0]);
    return [view, nodes];
  });
}
