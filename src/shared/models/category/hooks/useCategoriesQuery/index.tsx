import { CATEGORY_QUERY } from './gql/category-query.ts';
import { useLazyQuery } from '@apollo/client';
import { Category, ServerErrors } from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/store.ts';
import { addCategories } from '@/app/store/slices/categoriesSlice.ts';

export type CategoriesQueryResponse = {
  categories: {
    getMany: {
      data: Category[];
    };
  };
} & ServerErrors;

export const useCategoriesQuery = () => {
  const dispatch = useAppDispatch();
  const queryTuple = useLazyQuery<CategoriesQueryResponse>(CATEGORY_QUERY, {
    errorPolicy: 'all',
  });

  const { loader, fullscreenError, loadData, data } =
    useForm<CategoriesQueryResponse>(queryTuple);

  useEffect(() => {
    if (data) {
      dispatch(
        addCategories({ categories: data?.categories.getMany.data || [] })
      );
    }
  }, [data]);

  return {
    error: fullscreenError,
    loadData,
    loader,
  };
};
