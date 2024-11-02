import styles from './operations-list-item-widget.module.scss';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { FavoriteToggleFeature } from '@/features';
import { Operation } from '@/shared/api-types.ts';
import { isOperationFavorite } from '@/shared/utils/isOperationFavorite.ts';

type OperationsListItemWidgetProps = {
  operation: Partial<Operation>;
  onClick?: () => void;
};

export const OperationsListItemWidget: FC<OperationsListItemWidgetProps> = ({
  operation,
  onClick,
}) => {
  const { createdAt, photo, desc, category, ...shortData } = operation;

  return (
    <div className={styles['operations-list-item-widget']}>
      <OperationEntity
        operation={shortData}
        className={styles['operations-entity-short']}
      />
      <FavoriteToggleFeature
        isFavorite={isOperationFavorite(operation as Operation)}
        animated={false}
        onToggleFavorite={() => onClick?.()}
      />
    </div>
  );
};
