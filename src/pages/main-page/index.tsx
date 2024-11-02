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
import { useOperationsQuery } from '@/shared/models/operations/hooks/useOperationsQuery';

export const MainPage = () => {
  const navigate = useNavigate();
  const { loader, loadOperations, error } = useOperationsQuery();
  const { operations } = useOperationsSelector();

  const operationFormModal = useModal();
  const categoryFormModal = useModal();

  const loadMoreOperations = () => {
    loadOperations(true);
  };

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };
  return (
    <>
      {loader()}
      {error()}
      <div className={styles.split}>
        <div className={styles.content}>
          {!!operations.length && (
            <>
              <OperationsFilterWidget
                operations={operations}
                onFilter={(data) => console.log(data)}
              />
              <OperationsListWidget
                operations={operations}
                onItemSelect={redirectToDetail}
                addMore={loadMoreOperations}
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
