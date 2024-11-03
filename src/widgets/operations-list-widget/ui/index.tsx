import styles from './operations-list-widget.module.scss';
import { FC } from 'react';
import { OperationsListItemWidget } from '@/widgets';
import { Operation } from '@/shared/api-types.ts';
import { CardWithObserver } from '@/shared/components/card';

export type OperationsListPropsType = {
  operations?: Operation[];
  addMore?: () => void;
  isInfinite?: boolean;
  onItemSelect?: (data: Operation) => void;
  onItemEdit?: (data: Operation) => void;
  onFavoriteItemToggle?: (data: Operation) => void;
};
export const OperationsListWidget: FC<OperationsListPropsType> = ({
  operations,
  addMore,
  isInfinite = true,
  onItemSelect,
}) => {
  if (!operations || !operations.length) {
    return null;
  }

  return (
    <ul className={styles.operations}>
      {operations.map((operation, idx) => (
        <CardWithObserver
          key={operation.id}
          width={420}
          isLast={operations.length - 1 === idx}
          onIntersect={() => isInfinite && addMore?.()}
          onClick={() => onItemSelect?.(operation)}
          className={styles.operation}
        >
          <OperationsListItemWidget
            operation={operation}
            onClick={() => onItemSelect?.(operation)}
          />
        </CardWithObserver>
      ))}
    </ul>
  );
};
