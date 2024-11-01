import styles from './operations-list-item-widget.module.scss';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { FavoriteToggleFeature } from '@/features';
import { Operation } from '@/shared/api-types.ts';

type OperationsListItemWidgetProps = {
  operation: Partial<Operation> & { isFavorite?: boolean; photo?: string };
  onClick?: () => void;
};

export const OperationsListItemWidget: FC<OperationsListItemWidgetProps> = ({
  operation,
  onClick,
}) => {
  // const operation = data;
  const { date, createdAt, photo, desc, category, isFavorite, ...shortData } =
    operation;

  return (
    <div className={styles['operations-list-item-widget']}>
      <OperationEntity
        operation={shortData}
        className={styles['operations-entity-short']}
      />
      <FavoriteToggleFeature
        isFavorite={isFavorite}
        id={operation.id}
        animated={false}
        onToggleFavorite={() => onClick?.()}
      />
    </div>
  );
};
