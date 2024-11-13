import { AxiosError, AxiosResponse } from 'axios'
import { HttpClient, RequestConfig } from './hooks/types'

const isAxiosError = (error: any): error is AxiosError => {
  return error?.isAxiosError === true
}

const createRequest = <TData = unknown, TParams = void>(
    config: RequestConfig<TParams>,
    client: HttpClient,
): Promise<AxiosResponse<TData>> => {
  const { url, method = 'GET', params, data, headers } = config as RequestConfig<any>;

  return client({
    url,
    method,
    params,
    data,
    headers,
  });
};

const extractErrorMessage = (response: any): string => {
  if (typeof response?.data === 'string') return response.data
  if (typeof response?.data?.message === 'string') return response.data.message
  if (typeof response?.statusText === 'string') return response.statusText
  return 'Request failed'
}

export { createRequest, isAxiosError, extractErrorMessage }
