import { getNodeByPath } from '../util/upath_helper';
import { NodeContext } from './node_context';
import { NodeVisitor } from './node_visitor';
import { RangeCache } from './range_cache';
import { RangeMeta } from './range_meta';
import { debug, error, warn } from 'logez';


/**
 * Iterate through nodes in a range in the following order:
 *   1. first child
 *   2. self
 *   3. next sibling
 *   4. parent's next sibling
 * , until last node in range is met.
 *
 * @param range is a cached object of range.
 *        You should use RangeCache.make(range) to create it.
 * @param visit is a function to be called when a node is visited.
 */
export function iterateRangeNodes(range: RangeCache, visit: NodeVisitor) {
  const endOffset = range.startContainer == range.endContainer ?
      range.endOffset :
      getNodeTextEndIdx(range.startContainer);
  let q: [Node, number, number][] =
      [[range.startContainer, range.startOffset, endOffset]];
  while (q.length > 0) {
    let [node, start, end]: [Node, number, number] = q.shift();
    if (node.hasChildNodes()) {
      let next = node.firstChild;
      let endOffset = next == range.endContainer ? range.endOffset :
                                                   getNodeTextEndIdx(next);
      q.push([next, 0, endOffset]);
      continue;
    }
    let ctx = new NodeContext(node, range);
    visit(node, ctx, start, end);
    if (node == range.endContainer || node == range.commonAncestorContainer) {
      return;
    }
    if (ctx.nextSibling) {
      let endOffset = ctx.nextSibling == range.endContainer ?
          range.endOffset :
          getNodeTextEndIdx(ctx.nextSibling);
      q.push([ctx.nextSibling, 0, endOffset]);
    } else {
      tracebackParentNodes(ctx.parent, range, q);
    }
  }
  error('lastChild', range.commonAncestorContainer.lastChild);
  error('endContainer', range.endContainer);
  error('startContainer', range.startContainer);
  error('commonAncestorContainer:', range.commonAncestorContainer);
  throw 'iterateRangeNodes: end of sub dom tree met.';
}

/**
 * Correct range if needed.
 * For example, make sure the range ends at a leaf node.
 * @param rc
 */
export function correctRange(rc: RangeCache): RangeCache {
  rc = correctEndNode(rc);
  return rc;
}

function correctEndNode(rc: RangeCache): RangeCache {
  if (rc.endContainer.nodeType == Node.ELEMENT_NODE && rc.endOffset == 0) {
    debug('range needs correct.');
    let newEnd = rc.endContainer.firstChild;
    let newEndOffset = 0;
    return new RangeCache(
        rc.document, rc.commonAncestorContainer, rc.startContainer, newEnd,
        rc.startOffset, newEndOffset, rc.meta);
  }
  return rc;
}

export function isRangeDetached(rc: RangeCache): boolean {
  return (!rc.commonAncestorContainer.parentNode) ||
      (!rc.startContainer.parentNode) || (!rc.endContainer.parentNode);
}

/**
 * A helper function to determin if the given object
 * is an instance of Range class.
 * @param r an instance of Range of RangeCache
 */
export function isRange(r: Range|RangeCache): r is Range {
  let asRange: Range = <Range>r;
  return asRange.collapse !== undefined && asRange.setStart !== undefined;
}

function getNodeTextEndIdx(node: Node): number {
  return node.textContent.length;
}

function tracebackParentNodes(
    parent: Node, range: RangeCache, q: [Node, number, number][]) {
  while (parent != range.commonAncestorContainer) {
    if (parent.nextSibling) {
      let next = parent.nextSibling;
      let endOffset = next == range.endContainer ? range.endOffset :
                                                   next.textContent.length;
      q.push([next, 0, endOffset]);
      break;
    } else {
      parent = parent.parentNode;
    }
  }
}

export function restoreRangeCache(doc: Document, meta: RangeMeta): RangeCache {
  let rangeAnchors: Node[] = [];
  for (let uPath of [meta.startNodeUPath, meta.endNodeUPath]) {
    try {
      let n = getNodeByPath(doc, uPath);
      rangeAnchors.push(n);
    } catch (e) {
      warn(e);
      return null;
    }
  }
  let r = doc.createRange();
  r.setStart(rangeAnchors[0], meta.startCharIndex);
  r.setEnd(rangeAnchors[1], meta.endCharIndex);
  let rc: RangeCache = RangeCache.make(doc, r, meta);
  return rc;
}