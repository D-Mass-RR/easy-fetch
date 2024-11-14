import React from 'react'
import './App.css'
import { useFetch } from 'easy-fetch'
import LoginForm from './components/LoginForm'

console.log('useFetch:', useFetch)

function App() {
  return (
    <div>
      <LoginForm />
      <h1>hello</h1>
    </div>
  )
}

export default App
