import { RangeCache } from './range_cache';
import { asArray } from '../util/dom_helper';
/**
 * Store the context information of a node. This is useful if you
 * are about to temporarily take the node off the dom tree / fragment.
 */
export class NodeContext {
  private m_parent: Node;
  private m_nextSibling: Node;
  private m_siblings: Node[];
  private m_index: number;
  private m_rangeCache : RangeCache;

  constructor(n: Node, rc?: RangeCache) {
    this.m_parent = n.parentNode;
    this.m_nextSibling = n.nextSibling;
    this.m_siblings = asArray(n.parentNode.childNodes);
    this.m_rangeCache = rc;
    this.m_index = this.m_siblings.indexOf(n);
  }

  public get parent(): Node {
    return this.m_parent;
  }

  public get nextSibling(): Node {
    return this.m_nextSibling;
  }

  public get siblings(): Node[] {
    return this.m_siblings;
  }

  public get index(): number {
    return this.m_index;
  }

  public get rangeCache(): RangeCache{
    return this.m_rangeCache;
  }
}