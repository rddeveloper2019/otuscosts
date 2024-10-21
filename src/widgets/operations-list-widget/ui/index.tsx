import styles from './operations-list-widget.module.scss';
import { Card } from '@/shared/components/card';
import { FC } from 'react';
import { Operation } from '@/shared/types';
import { OperationsListItemWidget } from '@/widgets';

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
}) => {
  if (!operations || !operations.length) {
    return null;
  }

  return (
    <ul className={styles.operations}>
      {operations.map((operation, idx) => (
        <Card
          key={operation.id}
          width={420}
          isLast={operations.length - 1 === idx}
          onIntersect={() => isInfinite && addMore?.()}
        >
          <OperationsListItemWidget operation={operation} />
        </Card>
      ))}
    </ul>
  );
};
