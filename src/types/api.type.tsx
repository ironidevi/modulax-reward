export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiResponseList<T> {
  status: number;
  message: string;
  data: DataWithPagination<T>;
}

export interface DataWithPagination<T> {
  docs: T[];
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

export interface ApiError {
  statusCode: number;
  message: string;
  data: any;
  stack: string;
}

export interface RequestQueryParams {
  page?: string | number;
  limit?: number;
  sortBy?: string;
  [key: string]: any;
}

export interface RequestQuery {
  id?: string;
  queryParams?: RequestQueryParams;
  [key: string]: any;
}
