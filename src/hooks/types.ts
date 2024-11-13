import axios, {AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type HttpClient = AxiosInstance | typeof axios;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface BaseRequestConfig {
  url: string;
  method?: RequestMethod;
  headers?: Record<string, string>;
  data?: any;
}

export type RequestConfig<TParams = void> = BaseRequestConfig & {
  params?: TParams extends void ? never : TParams;
};

export interface FetchResponse<TData = unknown> {
  isSuccess: boolean;
  data?: TData;
  error?: string;
  status?: number;
  statusText?: string;
}

export type FetchCallback<TData = unknown> = (response: FetchResponse<TData>) => void;

export interface UseFetchConfig<TData = unknown, TParams = any> {
  request: RequestConfig<TParams> | (() => Promise<AxiosResponse<TData>>);
  callback?: FetchCallback<TData>;
  fetchOnInit?: boolean;
  onError?: (error: AxiosError | Error) => void;
  client?: HttpClient;
}

export interface UseFetchResult<TData = unknown> {
  fetch: (params?: any) => Promise<void>;
  loading: boolean;
  data?: TData;
  error?: string;
  status?: number;
}
