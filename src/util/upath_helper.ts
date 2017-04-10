import { asArray } from './dom_helper';

export function computeUniquePath(n: Node): string {
  let path = '';
  if (n.nodeType == Node.ELEMENT_NODE) {
    let e = n as HTMLElement;
    if (e.id) {
      return `#${e.id}`;
    }
  }
  if (n.nodeName == 'BODY') {
    return '/';
  }
  let siblings: Node[] = asArray(n.parentNode.childNodes);
  let idx = siblings.indexOf(n);
  return computeUniquePath(n.parentNode) + `/${idx}`;
}

export function getNodeByPath(doc: Document, uPath: string): Node {
  let n: Node = doc.body;
  let parts: string[] = uPath.split('/');
  for (let p of parts) {
    if (!p.trim()) {
      continue;
    }
    if (p.indexOf('#') == 0) {
      n = doc.getElementById(p.substring(1));
      continue;
    }
    n = n.childNodes[parseInt(p)];
  }
  return n;
}