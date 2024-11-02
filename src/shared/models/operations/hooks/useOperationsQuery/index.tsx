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
import { addOperations, setTotal } from '@/app/store/slices/operationsSlice.ts';
import { useOperationsSelector } from '@/app/store/selectors.ts';

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
  const { operations, total } = useOperationsSelector();
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
      dispatch(setTotal(data.operations.getMany.pagination.total));
    }
  }, [data]);

  const loadOperations = (more?: boolean) => {
    if (!more) {
      PaginationService.resetCounter();
    }

    if (more && operations.length >= total && total !== 0) {
      return;
    }

    proceedForm({
      input: PaginationService.getPaginationOptions(more),
    });
  };

  return {
    loadOperations,
    error: fullscreenError,
    loadData,
    loader,
  };
};
