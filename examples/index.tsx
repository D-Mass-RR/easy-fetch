import { createApiClient, useFetch } from '../src/hooks/useFetch'
import { FetchResponse } from '../src/hooks/types'

const token = ''

type TData = {
  token: string
}

type TParams = {
  username: string,
  password: string,
}

const apiClient = createApiClient('https://api.example.com', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const App = () => {

  const afterFetch =  ({ isSuccess, error, status, statusText, data }: FetchResponse<TData>) => {

    if (isSuccess) {
      // ...
    }
  }

  const { fetch, loading, data, status, error } = useFetch<TData, TParams>({
    request: {
      url: '/users',
      method: 'POST',
      params: {
        username: "",
        password: ""
      }
    },
    client: apiClient,
    callback: afterFetch
  })

  console.log(fetch, loading)

  return <div></div>
}

export default App
