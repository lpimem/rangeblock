export declare function asArray(collection: any): any;
export declare function select(w: Window, r: Range): void;
export declare function getSelectedRange(w: Window): Range;
export declare function clearSelection(w: Window): void;
export declare function findPositionAnchor(w: Window, n: Node): HTMLElement;
export declare enum BoxSizing {
    ContentBox = 0,
    BorderBox = 1,
}
export declare function getBoxSizing(w: Window, e: HTMLElement): BoxSizing;
export declare function getStyleNumber(stl: CSSStyleDeclaration, name: string): number;
export declare function createStyleSheet(doc: Document, content: string): StyleSheet;
