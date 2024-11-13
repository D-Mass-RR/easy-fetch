import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import {
  UseFetchConfig,
  UseFetchResult,
  FetchResponse,
  RequestConfig,
} from './types'
import { createRequest, extractErrorMessage, isAxiosError } from '../helpers'

export function useFetch<TData = unknown, TParams = void>({
  request,
  callback,
  fetchOnInit = false,
  onError,
  client = axios,
}: UseFetchConfig<TData, TParams>): UseFetchResult<TData, TParams> {
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
        const configWithParams = params ? { ...request, params } : request

        response = await createRequest<TData, TParams>(
          configWithParams as RequestConfig<TParams>,
          client,
        )
      }

      const isSuccess = response.status >= 200 && response.status < 300

      setData(response.data)
      setStatus(response.status)

      const result: FetchResponse<TData> = {
        isSuccess,
        data: response.data,
        error: isSuccess ? undefined : extractErrorMessage(response),
        status: response.status,
        statusText: response.statusText,
      }

      callback?.(result)

      if (!isSuccess) {
        const errorMessage = extractErrorMessage(response)
        setError(errorMessage)
        onError?.(new Error(errorMessage))
      }
    } catch (err) {
      let errorMessage: string

      if (isAxiosError(err)) {
        errorMessage = extractErrorMessage(err.response) || err.message
        setStatus(err.response?.status)
      } else if (err instanceof Error) {
        errorMessage = err.message
      } else {
        errorMessage = 'Unknown error occurred'
      }

      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))

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
    fetch: handleFetch as UseFetchResult<TData, TParams>['fetch'],
    loading,
    data,
    error,
    status,
  }
}
