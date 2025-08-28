'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      setIsLoading(false)
      return
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
            placeholder="First name"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
            placeholder="Last name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
          placeholder="Create a password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
          placeholder="Confirm your password"
        />
      </div>

      <div className="flex items-start">
        <input
          name="terms"
          type="checkbox"
          required
          checked={formData.terms}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
        />
        <label className="ml-2 text-sm text-secondary">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  )
}