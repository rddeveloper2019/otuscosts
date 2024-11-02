import {
  ResponsePagination,
  SortField,
  Sorting,
  SortType,
} from '@/shared/api-types.ts';

export type PaginationRequestOptions = {
  pagination: Omit<ResponsePagination, 'total' | '__typename'>;
  sorting: Omit<Sorting, '__typename'>;
};

export class PaginationService {
  static pageNumber = 1;

  static getPaginationOptions = (): Omit<Sorting, '__typename'> => {
    return { type: SortType.Desc, field: SortField.Date };
  };

  static resetCounter = (): void => {
    PaginationService.pageNumber = 1;
  };
}
