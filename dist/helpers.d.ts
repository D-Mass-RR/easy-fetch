import { AxiosError, AxiosResponse } from 'axios';
import { HttpClient, RequestConfig } from './hooks/types';
declare const isAxiosError: (error: any) => error is AxiosError<unknown, any>;
declare const createRequest: <TData = unknown, TParams = void>(config: RequestConfig<TParams>, client: HttpClient) => Promise<AxiosResponse<TData, any>>;
declare const extractErrorMessage: (response: any) => string;
export { createRequest, isAxiosError, extractErrorMessage };
//# sourceMappingURL=helpers.d.ts.map