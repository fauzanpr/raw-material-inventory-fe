/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export type MutationFunctionType<T> = {
    onSuccess?: (data: T) => void | Promise<void>;
    onError?: (error: AxiosError) => void;
}

export type MutateFunctionType = { method: | "POST" | "PUT" | "PATCH" | "DELETE"; id?: string; data?: Record<any, any> };

export type TPagination<TContent> = {
  content: TContent;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}