const isAxiosError = (error: any): error is AxiosError => {
  return error?.isAxiosError === true
}

const createRequest = <TData = unknown, TParams = any>(
  config: RequestConfig<TParams>,
  client: HttpClient,
): Promise<AxiosResponse<TData>> => {
  const { url, method = 'GET', params, data, headers } = config

  return client({
    url,
    method,
    params,
    data,
    headers,
  })
}
