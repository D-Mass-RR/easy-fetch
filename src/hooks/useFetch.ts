import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { FetchResponse, UseFetchConfig, UseFetchResult } from './types'

export function useFetch<TData = unknown, TParams = any>({
  request,
  callback,
  fetchOnInit = false,
  onError,
  client = axios,
}: UseFetchConfig<TData, TParams>): UseFetchResult<TData> {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TData>()
  const [error, setError] = useState<string>()
  const [status, setStatus] = useState<number>()

  const handleFetch = async (params?: TParams) => {
    setLoading(true)
    setError(undefined)

    try {
      let response: AxiosResponse<TData>

      if (typeof request === 'function') {
        response = await request()
      } else {
        const configWithParams = {
          ...request,
          params: { ...request.params, ...params },
        }
        response = await createRequest<TData, TParams>(configWithParams, client)
      }

      const isSuccess = response.status >= 200 && response.status < 300

      setData(response.data)
      setStatus(response.status)

      const result: FetchResponse<TData> = {
        isSuccess,
        data: response.data,
        error: isSuccess ? undefined : response.statusText,
        status: response.status,
        statusText: response.statusText,
      }

      callback?.(result)

      if (!isSuccess) {
        const errorMessage =
          response.data?.message || response.statusText || 'Request failed'
        setError(errorMessage)
        onError?.(new Error(errorMessage))
      }
    } catch (err) {
      let errorMessage = 'Unknown error occurred'

      if (isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message
        setStatus(err.response?.status)
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      onError?.(err)

      callback?.({
        isSuccess: false,
        error: errorMessage,
        status: isAxiosError(err) ? err.response?.status : undefined,
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    if (fetchOnInit) {
      handleFetch()
    }
  }, [])

  return {
    fetch: handleFetch,
    loading,
    data,
    error,
    status,
  }
}

export const createApiClient = (
  baseURL: string,
  options: Record<string, any> = {},
) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    ...options,
  })
}
