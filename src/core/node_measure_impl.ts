import * as constants from '../options';
import { SameRowHFactor, SameRowVFactor } from '../options';
import * as dom_helper from '../util/dom_helper';
import { Dimension } from './dimension';
import { LayoutCalculator } from './layout_calculator';
import { NodeContext } from './node_context';
import { debug } from 'logez';


export function measureSpanToDim(
  s: HTMLSpanElement, doc: Document, calc: LayoutCalculator): Dimension[] {
  let cspans: HTMLElement[] = dom_helper.asArray(s.children);
  let dims: Dimension[] = [];
  for (let span of cspans) {
    let dim = calc(doc, span);
    dims.push(dim);
  }
  return dims;
}

export function mergeDimensions(dims: Dimension[]): Dimension[] {
  let merged: Dimension[] = [];
  let current: Dimension = null;
  let pre: Dimension = null;
  const maxIdx: number = dims.length - 1;
  for (let i in dims) {
    let d: Dimension = dims[i];
    if (current == null) {
      current = d;
      pre = d;
      continue;
    }
    const charW: number = pre.Width;
    const charH: number = pre.Height;
    if (isInsameRow(d, current, charW, charH)) {
      current = doMerge(d, current);
    } else {
      merged.push(current);
      current = d;
    }
    if (Number(i) == maxIdx) {
      merged.push(current);
    } else {
      pre = d;
    }
  }
  return merged;
}

export function isInsameRow(
  a: Dimension, b: Dimension, charW: number, charH: number): boolean {
  if (a.Left > b.Left) {
    [a, b] = [b, a]
  }
  const maxHGap = charW * SameRowHFactor();
  const maxVGap = charH * SameRowVFactor();
  let h_gap = b.Left - (a.Left + a.Width);
  let isInRangeHorizontal = h_gap <= maxHGap;
  let v_gap = Math.abs(a.Top - b.Top);
  let isInRangeVertical = v_gap <= maxVGap;
  return isInRangeHorizontal && isInRangeVertical;
}

export function doMerge(a: Dimension, b: Dimension): Dimension {
  if (a.Left > b.Left) {
    [a, b] = [b, a]
  }
  let top: number = Math.min(a.Top, b.Top);
  let height: number = Math.max(a.Top + a.Height - top, b.Top + b.Height - top);
  return new Dimension([a.Left, top, (b.Left + b.Width - a.Left), height]);
}

export function substitudeWithMeasureSpan(
  doc: Document, n: Node, ctx: NodeContext, start: number,
  end: number): HTMLSpanElement {
  // ignore non-text nodes.
  if (n.nodeType != Node.TEXT_NODE) {
    return;
  }
  removeFollowing(ctx.parent, ctx.index);
  let parent = ctx.parent;
  parent.removeChild(n);
  let preTextNode: Node = doc.createTextNode(n.textContent.substring(0, start));
  const selText = n.textContent.substring(start, end);
  let textNode: Node = doc.createTextNode(selText);
  let postTextNode: Node =
    doc.createTextNode(n.textContent.substring(end, n.textContent.length));
  parent.appendChild(preTextNode);
  let wrapper = wrapText(doc, textNode);
  parent.appendChild(wrapper);
  parent.appendChild(postTextNode);
  appendFollowing(parent, ctx.index, ctx.siblings);
  return wrapper;
}

export function restoreBeforeMeasureStatus(
  parent: Node, nodeIdx: number, siblings: Node[]) {
  removeFollowing(parent, nodeIdx - 1);
  appendFollowing(parent, nodeIdx - 1, siblings);
}

export function removeFollowing(parent: Node, startIdx: number) {
  let children = dom_helper.asArray(parent.childNodes);
  for (let i = children.length - 1; i > startIdx; i--) {
    parent.removeChild(children[i]);
  }
}

export function appendFollowing(
  parent: Node, nodeIdx: number, siblings: Node[]) {
  for (let i = nodeIdx + 1; i < siblings.length; i++) {
    parent.appendChild(siblings[i]);
  }
}

export function wrapText(doc: Document, textNode: Node): HTMLSpanElement {
  let span: HTMLSpanElement = doc.createElement('span');
  let text = textNode.textContent;
  for (let i = 0; i < text.length; i++) {
    let charSpan: HTMLSpanElement = doc.createElement('span');
    charSpan.className = constants.MeasureSpanClass();
    let charNode: Node = doc.createTextNode(text.charAt(i));
    charSpan.appendChild(charNode);
    adaptMeasureSpanLayout(charSpan);
    span.appendChild(charSpan);
  }
  adaptMeasureSpanLayout(span);
  return span;
}

function getContentOffsets(w: Window, doc: Document, e: HTMLElement): Dimension {
  let rect = e.getBoundingClientRect();
  let styles = w.getComputedStyle(e);
  let borderLeft = 0;
  let borderTop = 0;
  let boxSizing = dom_helper.getBoxSizing(w, e);
  if (boxSizing == dom_helper.BoxSizing.ContentBox) {
    borderLeft = dom_helper.getStyleNumber(styles, "borderLeftWidth");
    borderTop = dom_helper.getStyleNumber(styles, "borderTopWidth");
  }
  let fixed = false;
  let scrollY = w.pageYOffset;
  let scrollX = w.pageXOffset;
  if (styles.position == "fixed"){
    scrollX = 0;
    scrollY = 0;
    fixed = true;
  }
  let dim = new Dimension([
    rect.left + borderLeft + scrollX,
    rect.top + borderTop + scrollY,
    rect.width,
    rect.height]);
  if (fixed) {
    dim.setFixed();
  }
  return dim;
}

export function computeLayout(doc: Document, anchor: HTMLElement, e: HTMLElement): Dimension {
  let w = doc.defaultView;
  let eOffset = getContentOffsets(w, doc, e);
  let anchorStyles = w.getComputedStyle(anchor);
  if (anchorStyles.position == "relative" && !eOffset.Fixed){
    let anchorOffset = getContentOffsets(w, doc, anchor);
    return new Dimension([
      eOffset.Left - anchorOffset.Left,
      eOffset.Top - anchorOffset.Top,
      eOffset.Width,
      eOffset.Height
    ]);
  }
  return eOffset;
}

export function getElementOffsetLayout(
  doc: Document, el: HTMLElement): Dimension {
  return new Dimension(
    [el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight]);
}

export function adaptMeasureSpanLayout(
  sp: HTMLSpanElement, debug: boolean = true): void {
  sp.style.margin = '0';
  sp.style.padding = '0';
  sp.style.border = '0';
  sp.style.font = 'inherit';
  sp.style.fontSize = 'inherit';
  sp.style.verticalAlign = 'inherit';
  if (debug) {
    sp.style.backgroundColor = 'lightgreen';
  }
}
