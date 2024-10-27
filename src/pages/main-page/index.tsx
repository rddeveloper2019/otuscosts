import { OperationModalFormWidget, OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { useNavigate } from 'react-router-dom';
import { Operation } from '@/shared/types.ts';
import { AddOperationFeature, FilterOperationsFeature } from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';
import styles from './main-page.module.scss';

export const MainPage = () => {
  const navigate = useNavigate();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  const operationFormModal = useModal();
  const categoryFormModal = useModal();

  return (
    <>
      <div className={styles.split}>
        <div className={styles.content}>
          <FilterOperationsFeature min={100} max={1000} />
          <FilterOperationsFeature min={100} max={1000} />
          <OperationsListWidget
            operations={operations}
            onItemSelect={redirectToDetail}
          />
        </div>
        <div className={styles.aside}>
          <AddOperationFeature onClick={operationFormModal.openModal} />
        </div>
      </div>

      <OperationModalFormWidget
        operationFormModal={operationFormModal}
        categoryFormModal={categoryFormModal}
      />
    </>
  );
};
