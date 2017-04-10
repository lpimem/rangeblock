import { Dimension } from './dimension';
import { LayoutCalculator } from './layout_calculator';
import { NodeContext } from './node_context';
export declare function measureSpanToDim(s: HTMLSpanElement, doc: Document, calc: LayoutCalculator): Dimension[];
export declare function mergeDimensions(dims: Dimension[]): Dimension[];
export declare function isInsameRow(a: Dimension, b: Dimension, charW: number, charH: number): boolean;
export declare function doMerge(a: Dimension, b: Dimension): Dimension;
export declare function substitudeWithMeasureSpan(doc: Document, n: Node, ctx: NodeContext, start: number, end: number): HTMLSpanElement;
export declare function restoreBeforeMeasureStatus(parent: Node, nodeIdx: number, siblings: Node[]): void;
export declare function removeFollowing(parent: Node, startIdx: number): void;
export declare function appendFollowing(parent: Node, nodeIdx: number, siblings: Node[]): void;
export declare function wrapText(doc: Document, textNode: Node): HTMLSpanElement;
export declare function computeLayout(doc: Document, anchor: HTMLElement, e: HTMLElement): Dimension;
export declare function getElementOffsetLayout(doc: Document, el: HTMLElement): Dimension;
export declare function adaptMeasureSpanLayout(sp: HTMLSpanElement, debug?: boolean): void;
