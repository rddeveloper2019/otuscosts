import { PATCH_OPERATION_MUTATION } from './gql/patch-ration-mutation.ts';
import { useMutation } from '@apollo/client';
import {
  Operation,
  OperationUpdateInput,
  ServerErrors,
} from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/store.ts';
import { patchOperation } from '@/app/store/slices/operationsSlice.ts';

export type PatchOperationMutationResponse = {
  operations: {
    patch: Operation;
  };
} & ServerErrors;

export const useEditOperationMutation = () => {
  const dispatch = useAppDispatch();
  const mutationTuple = useMutation<PatchOperationMutationResponse>(
    PATCH_OPERATION_MUTATION,
    {
      errorPolicy: 'all',
    }
  );

  const { loader, fullscreenError, proceedForm, data } =
    useForm<PatchOperationMutationResponse>(mutationTuple);

  useEffect(() => {
    if (data) {
      dispatch(patchOperation(data.operations.patch));
    }
  }, [data]);

  const editOperation = (
    patchId: string,
    input: Omit<OperationUpdateInput, 'type'>
  ) => {
    proceedForm({
      input,
      patchId,
    });
  };

  return {
    editOperation,
    error: fullscreenError,
    loader,
  };
};
