import styles from './operation-detail-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { Operation } from '@/shared/types';
import { EditOperationFeature, FavoriteToggleFeature } from '@/features';

type OperationDetailWidgetProps = {};

const data: Operation = {
  id: '6700d4278e877ac8a957b09d',
  name: 'Meal',
  desc: '12312321',
  date: '2024-10-27T00:00:00.000Z',
  createdAt: '2024-10-05T05:52:39.613Z',
  updatedAt: '2024-10-05T05:52:46.441Z',
  type: 'Cost',
  amount: 12,
  photo: 'https://picsum.photos/200/300',
  isFavorite: false,
  category: {
    id: '66c8bd568e877ac8a9571dec',
    name: '1 Список',
    photo: 'https://picsum.photos/200/300',
    commandId: '23209230423539',
    createdAt: '2024-08-23T16:48:22.215Z',
    updatedAt: '2024-08-23T16:48:22.215Z',
  },
};

export const OperationDetailWidgetWidget: FC<
  OperationDetailWidgetProps
> = ({}) => {
  const operation = data;

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
