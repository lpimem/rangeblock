
let sclass = 'hlc_measure_span';
let same_row_h_factor = 8;
let same_row_v_factor = 0.25;

export function MeasureSpanClass(): string {
  return sclass;
}

export function SameRowHFactor(): number{
  return same_row_h_factor;
}

export function SameRowVFactor(): number{
  return same_row_v_factor;
}

export function setSameRowHFactor(value: number){
  same_row_h_factor = value;
}

export function setSameRowVFactor(value: number){
  same_row_v_factor = value;
}