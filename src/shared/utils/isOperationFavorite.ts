import { Operation, OperationType } from '@/shared/api-types.ts';

export const isOperationFavorite = (operation: Operation) => {
  return operation.type === OperationType.Profit;
};
