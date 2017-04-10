export declare class Dimension {
    private m_x;
    private m_y;
    private m_width;
    private m_height;
    private m_fixed;
    constructor([x, y, w, h]: number[]);
    readonly Left: number;
    readonly Top: number;
    readonly Width: number;
    readonly Height: number;
    setFixed(): void;
    readonly Fixed: boolean;
    toString(): string;
}
