/**
 * RangeMeta stores UPath informations needed to store and restore a block.
 * UPath is a string used to uniquely locate a node in the dom tree.
 * It's grammar is defined as: 
 *    UPath = [<empty>|#<id>]([/<nodeIndex>])+
 */
export class RangeMeta {
  private m_anchorUPath: string;
  private m_startNodeUPath: string;
  private m_endNodeUPath: string;
  private m_startCharIndex: number;
  private m_endCharIndex: number;
  private m_text : string ;

  constructor([anchorUPath, startNodeUPath, endNodeUPath, text]: string[], 
  [ startCharIndex, endCharIndex ]: number[]) {
    [this.m_anchorUPath, this.m_startNodeUPath, this.m_endNodeUPath, this.m_text] =
        [anchorUPath, startNodeUPath, endNodeUPath, text];
    [this.m_startCharIndex, this.m_endCharIndex] =
        [startCharIndex, endCharIndex];
  }

  get anchorUPath(): string {
    return this.m_anchorUPath;
  }

  get startNodeUPath(): string {
    return this.m_startNodeUPath;
  }

  public get endNodeUPath(): string {
    return this.m_endNodeUPath;
  }

  public get startCharIndex(): number {
    return this.m_startCharIndex;
  }

  public get endCharIndex(): number {
    return this.m_endCharIndex;
  }

  public get text(): string{
    return this.m_text;
  }
}