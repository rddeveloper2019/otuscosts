import { OPERATIONS_QUERY } from './gql/opeartions-query.ts';
import { useLazyQuery } from '@apollo/client';
import {
  Operation,
  ResponsePagination,
  ServerErrors,
  Sorting,
} from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/store.ts';
import { PaginationService } from '@/shared/services/PaginationService.ts';
import { addOperations } from '@/app/store/slices/operationsSlice.ts';

export type CategoriesQueryResponse = {
  operations: {
    getMany: {
      data: Operation[];
      pagination: ResponsePagination;
      sorting: Sorting;
    };
  };
} & ServerErrors;

export const useOperationsQuery = () => {
  const dispatch = useAppDispatch();
  const queryTuple = useLazyQuery<CategoriesQueryResponse>(OPERATIONS_QUERY, {
    errorPolicy: 'all',
  });

  const { loader, loadData, fullscreenError, proceedForm, data } =
    useForm<CategoriesQueryResponse>(queryTuple);

  useEffect(() => {
    if (data) {
      const newOperations = data.operations.getMany.data || [];
      dispatch(addOperations({ operations: newOperations }));
    }
  }, [data]);

  const loadOperations = async () => {
    await proceedForm({
      input: PaginationService.getPaginationOptions(),
    });
  };

  return {
    loadOperations,
    error: fullscreenError,
    loadData,
    loader,
  };
};
