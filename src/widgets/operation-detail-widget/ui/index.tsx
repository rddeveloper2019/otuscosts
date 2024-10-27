import styles from './operation-detail-widget.module.scss';
import { Card } from '@/shared/components/card';
import { OperationEntity } from '@/entities';
import { FC } from 'react';
import { Operation } from '@/shared/types';
import {
  EditOperationFeature,
  FavoriteToggleFeature,
  OperationDetailModalFormFeature,
} from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';
import { CategoryModalFormFeature } from '@/features/category-modal-form-feature';
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';

type OperationDetailWidgetProps = {
  operation: Operation;
};

export const OperationDetailWidget: FC<OperationDetailWidgetProps> = ({
  operation,
}) => {
  const operationFormModal = useModal();

  const categoryFormModal = useModal();

  const onOperationFormSubmit = (data: any) => console.log(data);

  const onCategoryModalOpen = () => {
    operationFormModal.closeModal();
    categoryFormModal.openModal();
  };
  const onCategoryModalClose = () => {
    operationFormModal.openModal();
    categoryFormModal.closeModal();
  };

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
      <OperationDetailModalFormFeature
        visible={operationFormModal.isModalOpen}
        onClose={operationFormModal.closeModal}
        onOperationFormSubmit={onOperationFormSubmit}
        categoryButtons={
          <TextButton
            state={TextButtonState.SUCCESS}
            type="button"
            className={styles['add-category-button']}
            handleClick={onCategoryModalOpen}
          >
            +
          </TextButton>
        }
      />
      <CategoryModalFormFeature
        onEdit={() => {}}
        onCategoryModalClose={onCategoryModalClose}
        visible={categoryFormModal.isModalOpen}
      />
    </>
  );
};
