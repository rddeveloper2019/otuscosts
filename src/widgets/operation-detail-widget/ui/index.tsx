import styles from './operation-detail-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { EditOperationFeature, FavoriteToggleFeature } from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';

import { OperationModalFormWidgetProps } from '@/widgets/operation-modal-form-widget/ui';
import { Operation } from '@/shared/api-types.ts';
import { isOperationFavorite } from '@/shared/utils/isOperationFavorite.ts';

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
              isFavorite={isOperationFavorite(operation)}
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
      {modalFormWidget({ categoryFormModal, operationFormModal, operation })}
    </>
  );
};
