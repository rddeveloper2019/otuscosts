import {
  OperationModalFormWidget,
  OperationsFilterWidget,
  OperationsListWidget,
} from '@/widgets';
import { useNavigate } from 'react-router-dom';
import { AddOperationFeature } from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';
import styles from './main-page.module.scss';
import { Operation } from '@/shared/api-types.ts';
import { useOperationsSelector } from '@/app/store/selectors.ts';
import { useState } from 'react';

export const MainPage = () => {
  const navigate = useNavigate();
  const { operations } = useOperationsSelector();
  const [filteredOperations, setFilteredOperations] = useState<Operation[]>([]);

  const operationFormModal = useModal();
  const categoryFormModal = useModal();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  return (
    <>
      <div className={styles.split}>
        <div className={styles.content}>
          {!!operations.length && (
            <>
              <OperationsFilterWidget
                operations={operations}
                onFilter={setFilteredOperations}
              />
              <OperationsListWidget
                operations={filteredOperations}
                onItemSelect={redirectToDetail}
              />
            </>
          )}
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
