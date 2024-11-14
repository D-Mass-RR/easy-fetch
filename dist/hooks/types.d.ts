import axios, { AxiosInstance, AxiosResponse } from 'axios';
export type HttpClient = AxiosInstance | typeof axios;
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface BaseRequestConfig {
    url: string;
    method?: RequestMethod;
    headers?: Record<string, string>;
    data?: any;
    params?: never;
}
export type RequestConfig<TParams = void> = TParams extends void ? BaseRequestConfig : Omit<BaseRequestConfig, 'params'> & {
    params?: TParams;
};
export interface ErrorResponse {
    message: string;
    [key: string]: any;
}
export interface FetchResponse<TData = unknown> {
    isSuccess: boolean;
    data?: TData;
    error?: string;
    status?: number;
    statusText?: string;
}
export type FetchCallback<TData = unknown> = (response: FetchResponse<TData>) => void;
export interface UseFetchConfig<TData = unknown, TParams = void> {
    request: RequestConfig<TParams> | (() => Promise<AxiosResponse<TData>>);
    callback?: FetchCallback<TData>;
    fetchOnInit?: boolean;
    onError?: (error: unknown) => void;
    client?: HttpClient;
}
export interface UseFetchResult<TData = unknown, TParams = void> {
    fetch: TParams extends void ? () => Promise<void> : (params: TParams) => Promise<void>;
    loading: boolean;
    data?: TData;
    error?: string;
    status?: number;
}
//# sourceMappingURL=types.d.ts.map