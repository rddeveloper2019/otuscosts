import { FC } from 'react';
import {
  DualRangeSlider,
  SlideValues,
} from '@/shared/components/dual-range-slider';

export type FilterOperationsFeatureProps = {
  min: number;
  max: number;
  onSlide: (data: SlideValues) => void;
  leftValueText?: string;
  rightValueText?: string;
};
export const FilterOperationsFeature: FC<FilterOperationsFeatureProps> = ({
  min,
  max,
  onSlide,
  leftValueText,
  rightValueText,
}) => {
  return (
    <DualRangeSlider
      onSlide={onSlide}
      min={min}
      max={max}
      leftValueText={leftValueText}
      rightValueText={rightValueText}
    />
  );
};
