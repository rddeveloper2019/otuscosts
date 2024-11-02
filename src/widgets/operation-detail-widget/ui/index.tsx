import styles from './operation-detail-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { EditOperationFeature, FavoriteToggleFeature } from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';

import { OperationModalFormWidgetProps } from '@/widgets/operation-modal-form-widget/ui';
import {
  Operation,
  OperationType,
  OperationUpdateInput,
} from '@/shared/api-types.ts';
import { isOperationFavorite } from '@/shared/utils/isOperationFavorite.ts';
import { useEditOperationMutation } from '@/shared/models/operations/hooks/usePatchOperationMutation';

type OperationDetailWidgetProps = {
  operation: Operation;
  modalFormWidget: FC<OperationModalFormWidgetProps>;
};

export const OperationDetailWidget: FC<OperationDetailWidgetProps> = ({
  operation,
  modalFormWidget,
}) => {
  const { editOperation, loader, error } = useEditOperationMutation();

  const operationFormModal = useModal();

  const categoryFormModal = useModal();

  const toggleOperationFavorite = (id: string) => () => {
    const type =
      operation.type === OperationType.Cost
        ? OperationType.Profit
        : OperationType.Cost;
    editOperation(id, { type } as OperationUpdateInput);
  };

  return (
    <>
      {loader()}
      {error()}
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
              onToggleFavorite={toggleOperationFavorite(operation.id)}
            />
            <EditOperationFeature onClick={operationFormModal.openModal} />
          </div>
        </Card>
      </div>
      {modalFormWidget({ categoryFormModal, operationFormModal, operation })}
    </>
  );
};
