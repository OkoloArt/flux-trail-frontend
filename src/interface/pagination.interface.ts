export interface PaginationResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  numOfItemsPerPage: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
