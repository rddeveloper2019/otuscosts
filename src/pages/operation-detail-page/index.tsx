import { OperationDetailWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { Navigate, useLocation } from 'react-router-dom';

export const OperationDetailPage = () => {
  const { state } = useLocation();
  const operation = state && operations.find(({ id }) => id === state?.id);

  if (!state || !operation) {
    return <Navigate to="*" />;
  }

  return <OperationDetailWidget operation={operation} />;
};
