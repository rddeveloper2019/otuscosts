export type DualRangeSliderProps = {
  width?: number;
  min?: number;
  max?: number;
  className?: string;
  leftValueText?: string;
  rightValueText?: string;
  onSlide: (data: SlideValues) => void;
};

export type SlideValues = {
  minValue: number;
  maxValue: number;
};
