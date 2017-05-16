import { NodeVisitor } from './node_visitor';
import { RangeCache } from './range_cache';
import { RangeMeta } from './range_meta';
export declare function iterateRangeNodes(range: RangeCache, visit: NodeVisitor): void;
export declare function correctRange(rc: RangeCache): RangeCache;
export declare function isRangeDetached(rc: RangeCache): boolean;
export declare function isRange(r: Range | RangeCache): r is Range;
export declare function restoreRangeCache(doc: Document, meta: RangeMeta, checkTextMatch?: boolean): RangeCache;
