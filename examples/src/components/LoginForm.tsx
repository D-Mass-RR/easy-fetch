import React, { useState } from 'react'
import { useFetch } from 'easy-fetch'
import { apiClient } from '../api/client'
import { LoginResponse } from '../api/types'
import './styles.css'

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  })

  const { fetch: login, loading, error, data } = useFetch<LoginResponse, void>({
    request: {
      url: '/auth/login',
      method: 'POST',
      data: {
        ...formData,
        expiresInMins: 30,
      },
    },
    client: apiClient,
    callback: ({ isSuccess, data, error }) => {
      if (isSuccess && data) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }))
        window.location.href = '/dashboard'
      } else {
        console.error('Login failed:', error)
      }
    },
    onError: (err) => {
      console.error('Login error:', err)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username.trim() || !formData.password.trim()) {
      return
    }

    try {
      await login()
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-field">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="input-with-icon email-icon"
                disabled={loading}
              />
              <span className="input-focus-border"></span>
            </div>

            <div className="input-field">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="input-with-icon password-icon"
                disabled={loading}
              />
              <span className="input-focus-border"></span>
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '-0.5rem' }}>
              {error}
            </div>
          )}

          {data && (
            <div className="success-message" style={{ color: '#22c55e', fontSize: '0.875rem', marginTop: '-0.5rem' }}>
              Login successful! Redirecting...
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
            Try with: username: "kminchelle" / password: "0lelplR"
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
