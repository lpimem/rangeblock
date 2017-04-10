/**
 * Measurements of a rectangular block.
 */
export class Dimension {
  private m_x: number;
  private m_y: number;
  private m_width: number;
  private m_height: number;
  private m_fixed: boolean;

  constructor([x, y, w, h]: number[]) {
    [this.m_x, this.m_y, this.m_width, this.m_height] = [x, y, w, h];
    this.m_fixed = false;
  }

  get Left(): number {
    return this.m_x;
  }
  get Top(): number {
    return this.m_y;
  }
  get Width(): number {
    return this.m_width;
  }
  get Height(): number {
    return this.m_height;
  }

  setFixed(): void {
    this.m_fixed = true;
  }

  get Fixed(): boolean{
    return this.m_fixed;
  }

  toString(): string {
    let d = this;
    return `{(${d.Left}, ${d.Top}), ${d.Width} x ${d.Height}}`;
  }
}