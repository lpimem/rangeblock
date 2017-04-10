export declare class RangeMeta {
    private m_anchorUPath;
    private m_startNodeUPath;
    private m_endNodeUPath;
    private m_startCharIndex;
    private m_endCharIndex;
    private m_text;
    constructor([anchorUPath, startNodeUPath, endNodeUPath, text]: string[], [startCharIndex, endCharIndex]: number[]);
    readonly anchorUPath: string;
    readonly startNodeUPath: string;
    readonly endNodeUPath: string;
    readonly startCharIndex: number;
    readonly endCharIndex: number;
    readonly text: string;
}
