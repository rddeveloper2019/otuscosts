import { OperationDetailWidget, OperationModalFormWidget } from '@/widgets';
import { operations } from '@/db.ts';
import { Navigate, useLocation } from 'react-router-dom';
import { useCategoriesQuery } from '@/shared/models';
import { useEffect } from 'react';

export const OperationDetailPage = () => {
  const { state } = useLocation();
  const operation = state && operations.find(({ id }) => id === state?.id);
  const { loader, loadData: loadCategories } = useCategoriesQuery();

  useEffect(() => {
    loadCategories();
  }, []);

  if (!state || !operation) {
    return <Navigate to="*" />;
  }

  return (
    <>
      {loader()}
      <OperationDetailWidget
        operation={operation}
        modalFormWidget={OperationModalFormWidget}
      />
    </>
  );
};
