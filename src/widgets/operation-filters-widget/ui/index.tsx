import styles from './operations-filter-widget.module.scss';
import { FC, useEffect, useState } from 'react';
import { getMinMax, getMinMaxDates } from '@/shared/utils/getMinMax.ts';
import { SlideValues } from '@/shared/components/dual-range-slider';
import { dateHelper } from '@/shared/utils/dateHelper.ts';
import { FilterOperationsFeature } from '@/features';
import cn from 'clsx';
import { Operation } from '@/shared/api-types.ts';

type OperationsFilterWidgetProps = {
  operations: Operation[];
  onFilter: (operations: Operation[]) => void;
  className?: string;
};

export const OperationsFilterWidget: FC<OperationsFilterWidgetProps> = ({
  operations,
  onFilter,
  className,
}) => {
  const { min: minAmount, max: maxAmount } = getMinMax(operations, 'amount');
  const { min: minDate, max: maxDate } = getMinMaxDates(operations);

  const [amounts, setAmounts] = useState<SlideValues>({
    minValue: minAmount,
    maxValue: maxAmount,
  });

  const [dates, setDates] = useState<SlideValues>({
    minValue: dateHelper.dateToNumber(minDate),
    maxValue: dateHelper.dateToNumber(maxDate),
  });

  useEffect(() => {
    onFilter(operations);
  }, [dates, amounts]);

  return (
    <div className={cn(className, styles['filters-widget'])}>
      <FilterOperationsFeature
        min={minAmount}
        max={maxAmount}
        leftValueText={`${amounts.minValue} $`}
        rightValueText={`${amounts.maxValue} $`}
        onSlide={setAmounts}
      />
      <FilterOperationsFeature
        min={dates.minValue}
        max={dates.maxValue}
        leftValueText={dateHelper.numberToDateString(dates.minValue)}
        rightValueText={dateHelper.numberToDateString(dates.maxValue)}
        onSlide={setDates}
      />
    </div>
  );
};
