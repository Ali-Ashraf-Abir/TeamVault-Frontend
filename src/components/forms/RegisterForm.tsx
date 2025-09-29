'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/api/api'

export function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      setIsLoading(false)
      return
    }


    const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
   try{
    const result =await api.post('/auth/register', formDataWithoutConfirmPassword)
    setIsLoading(false)
    alert(result.message)
    localStorage.setItem('accessToken',result.message.accessToken)
    router.push('/login')

   } catch (error:any) {

    alert(error.data.error.message)
    setIsLoading(false)
   }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Password validation regex
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?])(?=\S+$).{8,20}$/;

    if (name === 'password') {
      // Validate password against regex
      if (!passwordRegex.test(value)) {
        setPasswordError('Password must have at least 8 characters, one uppercase letter, one number, and one special character.');
      } else {
        setPasswordError('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-primary mb-2">
            First name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
            placeholder="First name"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-primary mb-2">
            Last name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            value={formData.last_name}
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
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-primary text-primary placeholder-muted transition-colors"
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)} // Toggle password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
          >
            {showPassword ? 'Hide' : 'Show'} {/* Toggle text */}
          </button>
        </div>
      </div>

      {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}

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
        disabled={(isLoading || passwordError) ? true : false}
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