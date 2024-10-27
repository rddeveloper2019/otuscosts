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
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';

type OperationDetailWidgetProps = {
  operation: Operation;
};

export const OperationDetailWidget: FC<OperationDetailWidgetProps> = ({
  operation,
}) => {
  const { isModalOpen, closeModal, openModal } = useModal();
  const onOperationFormSubmit = (data: any) => console.log(data);

  return (
    <>
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
            <EditOperationFeature onClick={openModal} />
          </div>
        </Card>
      </div>
      <OperationDetailModalFormFeature
        visible={isModalOpen}
        onClose={closeModal}
        onOperationFormSubmit={onOperationFormSubmit}
        addCategoryButton={
          <TextButton
            state={TextButtonState.SUCCESS}
            type="button"
            className={styles['add-category-button']}
          >
            +
          </TextButton>
        }
      />
    </>
  );
};
