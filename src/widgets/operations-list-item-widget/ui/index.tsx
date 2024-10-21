import styles from './operations-list-item-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { Operation } from '@/shared/types';
import { FavoriteToggleFeature } from '@/features';

type OperationsListItemWidgetProps = {
  operation: Partial<Operation>;
};

export const OperationsListItemWidget: FC<OperationsListItemWidgetProps> = ({
  operation,
}) => {
  // const operation = data;
  const { date, createdAt, photo, desc, category, isFavorite, ...shortData } =
    operation;

  return (
    <div className={styles['operations-list-item-widget']}>
      <Card width={400}>
        <OperationEntity
          operation={shortData}
          onClick={() =>
            console.log('operations-list-item operation entity clicked')
          }
        />
        <FavoriteToggleFeature isFavorite={isFavorite} id={operation.id} />
      </Card>
    </div>
  );
};
