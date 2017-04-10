import { RangeCache } from './range_cache';
export declare class NodeContext {
    private m_parent;
    private m_nextSibling;
    private m_siblings;
    private m_index;
    private m_rangeCache;
    constructor(n: Node, rc?: RangeCache);
    readonly parent: Node;
    readonly nextSibling: Node;
    readonly siblings: Node[];
    readonly index: number;
    readonly rangeCache: RangeCache;
}
