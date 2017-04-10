import { Dimension } from './dimension';

export interface LayoutCalculator{
  (doc: Document, el: HTMLElement): Dimension
}