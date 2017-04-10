import { Block } from './block';
import { RangeMeta } from './range_meta';
export declare function extractSelectedBlock(win: Window, doc: Document, id?: string): Block;
export declare function restoreBlock(win: Window, doc: Document, meta: RangeMeta, id?: string): Block;
