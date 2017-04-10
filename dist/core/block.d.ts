import { RangeCache } from './range_cache';
import { Dimension } from './dimension';
import { RangeMeta } from "./range_meta";
export declare class Block {
    private m_id;
    private m_rangeCache;
    private m_dimensions;
    constructor(id: string, rangeCache: RangeCache, dimensions: Dimension[]);
    setId(id: string): void;
    readonly id: string;
    readonly rangeCache: RangeCache;
    readonly rangeMeta: RangeMeta;
    readonly dimensions: Dimension[];
    readonly text: string;
    recalculateDimension(): void;
    private rebuild();
}
