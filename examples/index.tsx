import React from 'react'
import { createApiClient, useFetch } from '../src/hooks/useFetch'
import { FetchCallback, FetchResponse } from '../src/hooks/types'

const token = ''

const apiClient = createApiClient('https://api.example.com', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const App = () => {


  const afterFetch =  ({ isSuccess, error, status, statusText, data }: FetchResponse) => {
    if (isSuccess) {
      // ...
    }
  }

  const { fetch, loading, data, status, error } = useFetch({
    request: {
      url: '/users',
      method: 'GET',
    },
    client: apiClient,
    callback: afterFetch
  })



  console.log(fetch, loading)

  return <div></div>
}

export default App
