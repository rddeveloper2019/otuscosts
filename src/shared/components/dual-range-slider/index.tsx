import styles from './dual-range-slider.module.scss';
import cn from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';
import { DualRangeSliderProps } from '@/shared/components/dual-range-slider/types.ts';
import { useResizeObserver } from '@/shared/hooks/useResizeObserver.ts';

export const DualRangeSlider: FC<DualRangeSliderProps> = ({
  leftValueText,
  rightValueText,
  onSlide,
  width = 500,
  min = 0,
  max = 1000,
  className,
}) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const initialLeft = useRef(25);
  const initialRight = useRef(width - 25);

  const [leftWidth, setLeftWidth] = useState(initialLeft.current);
  const [rightWidth, setRightWidth] = useState(initialRight.current);

  const leftCursor = useRef<HTMLDivElement>(null);
  const rightCursor = useRef<HTMLDivElement>(null);

  const percent = (width - 50) / 100;
  const range = max - min;

  useEffect(() => {
    onSlide({ minValue, maxValue });
  }, [minValue, maxValue]);

  const handleLeft = (entry: ResizeObserverEntry) => {
    if (entry.target === leftCursor.current) {
      if (
        entry.contentRect.width <= initialRight.current &&
        entry.contentRect.width >= initialLeft.current
      ) {
        const movedInPercent =
          (entry.contentRect.width - initialLeft.current) / percent;
        const value = (range / 100) * movedInPercent;
        setMinValue(Math.round(min + value));

        setLeftWidth(entry.contentRect.width);
      }
    }
  };

  const handleRight = (entry: ResizeObserverEntry) => {
    if (entry.target === rightCursor.current) {
      if (
        entry.contentRect.width >= initialLeft.current &&
        entry.contentRect.width <= initialRight.current
      ) {
        const movedInPercent =
          (initialRight.current - entry.contentRect.width) / percent;
        const value = (range / 100) * movedInPercent;

        setMaxValue(Math.round(max - value));
        setRightWidth(entry.contentRect.width);
      }
    }
  };

  useResizeObserver(leftCursor, handleLeft);
  useResizeObserver(rightCursor, handleRight);

  return (
    <div style={{ width }} className={cn(className)}>
      <div className={cn(styles['slider'])}>
        <div
          ref={leftCursor}
          className={cn(styles['left'])}
          style={{
            width: leftWidth,
            maxWidth: rightWidth - 10,
            minWidth: initialLeft.current,
          }}
        />
        <p className={styles['left-value']}>{leftValueText || minValue}</p>
        <div
          ref={rightCursor}
          className={cn(styles['right'])}
          style={{
            width: rightWidth,
            maxWidth: initialRight.current,
            minWidth: leftWidth + 10,
          }}
        />
        <p className={styles['right-value']}>{rightValueText || maxValue}</p>
      </div>
    </div>
  );
};
