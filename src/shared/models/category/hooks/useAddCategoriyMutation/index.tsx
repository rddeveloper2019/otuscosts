import { ADD_CATEGORY_MUTATION } from './gql/category-mutation.ts';
import { useMutation } from '@apollo/client';
import {
  Category,
  CategoryAddInput,
  ServerErrors,
} from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';
import { useAppDispatch } from '@/app/store/store.ts';
import { useEffect } from 'react';
import { addCategory } from '@/app/store/slices/categoriesSlice.ts';

export type AddCategoryMutationResponse = {
  categories: {
    add: Category;
  };
} & ServerErrors;

export const useAddCategoryMutation = () => {
  const dispatch = useAppDispatch();
  const mutationTuple = useMutation<AddCategoryMutationResponse>(
    ADD_CATEGORY_MUTATION,
    {
      errorPolicy: 'all',
    }
  );

  const { loader, fullscreenError, proceedForm, data } =
    useForm<AddCategoryMutationResponse>(mutationTuple);

  const handleSubmit = ({ photo, name }: CategoryAddInput) => {
    proceedForm<{ input: CategoryAddInput }>({
      input: { photo, name },
    });
  };

  useEffect(() => {
    if (data) {
      data?.categories.add &&
        dispatch(addCategory({ category: data.categories.add }));
    }
  }, [data]);

  return {
    error: fullscreenError,
    handleSubmit,
    loader,
  };
};
