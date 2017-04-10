import { RangeMeta } from './range_meta';
export declare class RangeCache {
    private m_cac;
    private m_start;
    private m_end;
    private m_startOffset;
    private m_endOffset;
    private m_document;
    private m_meta;
    constructor(doc: Document, cac: Node, start: Node, end: Node, startOffset: number, endOffset: number, meta?: RangeMeta);
    isExpired(): boolean;
    toRange(doc: Document): Range;
    readonly document: Document;
    readonly commonAncestorContainer: Node;
    readonly startContainer: Node;
    readonly endContainer: Node;
    readonly startOffset: number;
    readonly endOffset: number;
    readonly meta: RangeMeta;
    private setMeta(meta);
    static make: (doc: Document, r: Range, meta?: RangeMeta) => RangeCache;
}
