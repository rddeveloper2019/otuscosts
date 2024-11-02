import { ADD_OPERATION_MUTATION } from './gql/operation-mutation.ts';
import { useMutation } from '@apollo/client';
import {
  Operation,
  OperationAddInput,
  OperationType,
  ServerErrors,
} from '@/shared/api-types.ts';
import { useForm } from '@/shared/models/hooks/useForm.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/store.ts';
import { addOperation } from '@/app/store/slices/operationsSlice.ts';
import { useNavigate } from 'react-router-dom';

export type AddOperationMutationResponse = {
  operations: {
    add: Operation;
  };
} & ServerErrors;

export const useAddOperationMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mutationTuple = useMutation<AddOperationMutationResponse>(
    ADD_OPERATION_MUTATION,
    {
      errorPolicy: 'all',
    }
  );

  const { loader, fullscreenError, proceedForm, data } =
    useForm<AddOperationMutationResponse>(mutationTuple);

  const redirectToDetail = (operation: Operation) => {
    navigate(`/operation/${operation.id}`, { state: { id: operation.id } });
  };

  useEffect(() => {
    if (data) {
      dispatch(addOperation(data.operations.add));
      redirectToDetail(data.operations.add);
    }
  }, [data]);

  const addNewOperation = async (input: Omit<OperationAddInput, 'type'>) => {
    await proceedForm({
      input: { ...input, type: OperationType.Cost },
    });
  };

  return {
    addNewOperation,
    error: fullscreenError,
    loader,
  };
};
