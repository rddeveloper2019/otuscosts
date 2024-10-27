import { FC } from 'react';
import { DualRangeSlider } from '@/shared/components/dual-range-slider';

export type FilterOperationsFeatureProps = {
  min: number;
  max: number;
};
export const FilterOperationsFeature: FC<FilterOperationsFeatureProps> = ({
  min,
  max,
}) => {
  console.log('(**)=> { min, max }: ', { min, max });

  return <DualRangeSlider onSlide={console.log} />;
};
