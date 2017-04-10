import {debug, warn} from 'logez';

export function asArray(collection: any) {
  return Array.prototype.slice.apply(collection);
}

export function select(w: Window, r: Range) {
  let sel = w.getSelection();
  sel.removeAllRanges();
  sel.addRange(r);
}

export function getSelectedRange(w: Window): Range {
  try {
    return w.getSelection().getRangeAt(0);
  } catch (ignore) {
    return null;
  }
}

export function clearSelection(w: Window) {
  w.getSelection().removeAllRanges();
}

export function findPositionAnchor(w: Window, n: Node): HTMLElement {
  let e: HTMLElement = null;
  if (n.nodeType != Node.ELEMENT_NODE) {
    e = n.parentElement;
  } else {
    e = n as HTMLElement;
  }
  if (e == null) {
    throw 'no element parent found';
  }
  do {
    let stl = w.getComputedStyle(e);
    if (stl.position == 'relative' || stl.position == 'fixed') {
      return e;
    } else {
      e = e.parentElement;
    }
  } while (e);
  let b = w.document.body;
  warn(`no position anchor found, using body (${w.getComputedStyle(b).position
       }).`);
  return b;
}

export enum BoxSizing {
  ContentBox,
  BorderBox,
}

export function getBoxSizing(w: Window, e: HTMLElement): BoxSizing {
  let bs = w.getComputedStyle(e).boxSizing;
  if (bs == 'content-box') {
    return BoxSizing.ContentBox;
  } else if (bs = 'border-box') {
    return BoxSizing.BorderBox;
  } else {
    throw 'unknown box sizing option.';
  }
}

export function getStyleNumber(stl: CSSStyleDeclaration, name: string): number {
  let strVal = ((stl as any)[name] as string);
  let match = /\d+/.exec(strVal);
  if (match) {
    return Number(match[0]);
  }
  throw Error(`cannot parse number from style ${name}: ${strVal}`);
}

export function createStyleSheet(doc: Document, content: string): StyleSheet {
  let styleEl = doc.createElement('style');
  styleEl.innerHTML = content;
  doc.body.appendChild(styleEl);
  let idx = doc.styleSheets.length - 1;
  return doc.styleSheets.item(idx);
}