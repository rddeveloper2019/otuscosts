import styles from './operation-detail-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { Operation } from '@/shared/types';
import { EditOperationFeature, FavoriteToggleFeature } from '@/features';

type OperationDetailWidgetProps = {
  operation: Operation;
};

export const OperationDetailWidget: FC<OperationDetailWidgetProps> = ({
  operation,
}) => {
  return (
    <div className={styles['operation-detail-widget']}>
      <Card width={400}>
        <OperationEntity
          operation={operation}
          onClick={() =>
            console.log('operations-detail operation entity clicked')
          }
        />
        <div className={styles['features']}>
          <FavoriteToggleFeature
            isFavorite={operation.isFavorite}
            id={operation.id}
            onToggleFavorite={() =>
              console.log(
                'operation-detail-widget FavoriteToggleFeature clicked'
              )
            }
          />
          <EditOperationFeature
            onEdit={() =>
              console.log('operation-detail-widget edit operation clicked')
            }
          />
        </div>
      </Card>
    </div>
  );
};
