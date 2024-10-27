import styles from './operation-detail-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { Operation } from '@/shared/types';
import { EditOperationFeature, FavoriteToggleFeature } from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';

import { OperationModalFormWidgetProps } from '@/widgets/operation-modal-form-widget/ui';

type OperationDetailWidgetProps = {
  operation: Operation;
  modalFormWidget: FC<OperationModalFormWidgetProps>;
};

export const OperationDetailWidget: FC<OperationDetailWidgetProps> = ({
  operation,
  modalFormWidget,
}) => {
  const operationFormModal = useModal();

  const categoryFormModal = useModal();

  return (
    <>
      <div className={styles['operation-detail-widget']}>
        <Card>
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
            <EditOperationFeature onClick={operationFormModal.openModal} />
          </div>
        </Card>
      </div>
      {modalFormWidget({ categoryFormModal, operationFormModal })}
    </>
  );
};
