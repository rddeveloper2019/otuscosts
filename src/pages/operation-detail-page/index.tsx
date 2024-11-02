import { OperationDetailWidget, OperationModalFormWidget } from '@/widgets';
import { Navigate, useLocation } from 'react-router-dom';
import { useOperationsSelector } from '@/app/store/selectors.ts';

export const OperationDetailPage = () => {
  const { state } = useLocation();
  const { operations } = useOperationsSelector();
  const operation = state && operations.find(({ id }) => id === state?.id);

  if (!state || !operation) {
    return <Navigate to="*" />;
  }

  return (
    <>
      <OperationDetailWidget
        operation={operation}
        modalFormWidget={OperationModalFormWidget}
      />
    </>
  );
};
