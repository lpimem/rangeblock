import { findPositionAnchor } from '../util/dom_helper';
import { computeUniquePath } from '../util/upath_helper';
import { RangeMeta } from './range_meta';


/**
 * DOM Range object will change if DOM tree changed.
 * RangeCache will not.
 * You should use RangeCache.make(doc, range) method to creat an
 * intance.
 */
export class RangeCache {
  private m_cac: Node;
  private m_start: Node;
  private m_end: Node;
  private m_startOffset: number;
  private m_endOffset: number;
  private m_document: Document;
  private m_meta: RangeMeta;

  constructor(
      doc: Document, cac: Node, start: Node, end: Node, startOffset: number,
      endOffset: number, meta?: RangeMeta) {
    [this.m_document, this.m_cac, this.m_start, this.m_end, this.m_startOffset,
     this.m_endOffset] = [doc, cac, start, end, startOffset, endOffset];
    this.setMeta(meta);
  }

  /**
   * A range expires when the dom sub tree is destroyed.
   */
  isExpired(): boolean {
    for (let n of [this.m_cac, this.m_start, this.m_end]) {
      if (!n || !n.parentNode) {
        return true;
      }
    }
    return false;
  }

  toRange(doc: Document): Range {
    let r = doc.createRange();
    r.setStart(this.m_start, this.m_startOffset);
    r.setEnd(this.m_end, this.m_endOffset);
    return r;
  }

  get document(): Document {
    return this.m_document;
  }

  get commonAncestorContainer(): Node {
    return this.m_cac;
  }

  get startContainer(): Node {
    return this.m_start;
  }

  get endContainer(): Node {
    return this.m_end;
  }

  get startOffset(): number {
    return this.m_startOffset;
  }

  get endOffset(): number {
    return this.m_endOffset;
  }

  get meta(): RangeMeta {
    return this.m_meta;
  }

  private setMeta(meta: RangeMeta) {
    if (!meta || !meta.text) {
      let anchor: Node =
          findPositionAnchor(this.m_document.defaultView, this.m_cac);
      this.m_meta = new RangeMeta(
          [
            computeUniquePath(anchor), computeUniquePath(this.m_start),
            computeUniquePath(this.m_end),
            this.toRange(this.m_document).toString()
          ],
          [this.m_startOffset, this.m_endOffset]);
    } else {
      this.m_meta = meta;
    }
  }

  static make: (doc: Document, r: Range, meta?: RangeMeta) => RangeCache =
      function(doc: Document, r: Range, meta?: RangeMeta): RangeCache {
    return new RangeCache(
        doc, r.commonAncestorContainer, r.startContainer, r.endContainer,
        r.startOffset, r.endOffset, meta);
  };
}