import styles from './operation-modal-form-widget.module.scss';

import { FC } from 'react';
import { Operation } from '@/shared/types';
import { OperationDetailModalFormFeature } from '@/features';
import { ModalHookOptions } from '@/shared/hooks/useModal.ts';
import { CategoryModalFormFeature } from '@/features/category-modal-form-feature';
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';

export type OperationModalFormWidgetProps = {
  operation?: Operation;
  operationFormModal: ModalHookOptions;
  categoryFormModal: ModalHookOptions;
};

export const OperationModalFormWidget: FC<OperationModalFormWidgetProps> = ({
  operationFormModal,
  categoryFormModal,
}) => {
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
