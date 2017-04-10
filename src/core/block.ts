import { isRangeDetached, restoreRangeCache } from './range_helper';
import { RangeCache } from './range_cache';
import { Dimension } from './dimension';
import { computeDimentions } from './node_measure';
import { RangeMeta } from "./range_meta";

/**
 * A block of a text measured in one selection
 */
export class Block {
  private m_id: string;
  private m_rangeCache: RangeCache;
  private m_dimensions: Dimension[];

  constructor(id: string, rangeCache: RangeCache, dimensions: Dimension[]) {
    this.m_id = id;
    this.m_rangeCache = rangeCache;
    this.m_dimensions = dimensions;
  }

  public setId(id: string){
    this.m_id = id;
  }

  public get id(): string {
    return this.m_id;
  }

  get rangeCache(): RangeCache {
    return this.m_rangeCache;
  }

  get rangeMeta(): RangeMeta{
    return this.m_rangeCache.meta;
  }

  get dimensions(): Dimension[] {
    return this.m_dimensions;
  }

  get text(): string{
    return this.rangeMeta.text;
  }

  /**
   * recalculateDimension
   * Recalculate dimensions of the range again.
   */
  public recalculateDimension() {
    if (isRangeDetached(this.rangeCache)){
      this.rebuild();
    }
    this.m_dimensions =
        computeDimentions(this.m_rangeCache.document, this.m_rangeCache);
  }

  private rebuild(){
    this.m_rangeCache = restoreRangeCache(this.rangeCache.document, this.rangeCache.meta);
  }
}