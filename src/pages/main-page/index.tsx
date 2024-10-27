import { OperationModalFormWidget, OperationsListWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { useNavigate } from 'react-router-dom';
import { Operation } from '@/shared/types.ts';
import { AddOperationFeature } from '@/features';
import { useModal } from '@/shared/hooks/useModal.ts';

export const MainPage = () => {
  const navigate = useNavigate();

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  const operationFormModal = useModal();
  const categoryFormModal = useModal();

  return (
    <>
      <div>
        <OperationsListWidget
          operations={operations}
          onItemSelect={redirectToDetail}
        />
      </div>
      <AddOperationFeature onClick={operationFormModal.openModal} />
      <OperationModalFormWidget
        operationFormModal={operationFormModal}
        categoryFormModal={categoryFormModal}
      />
    </>
  );
};
