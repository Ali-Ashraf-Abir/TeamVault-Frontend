
import { LoginForm } from '@/components/forms/LoginForm'
import { BackgroundPattern } from '@/components/ui/BackgroundPattern'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundPattern />
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold gradient-text">ChatFlow</h1>
          </Link>
          <h2 className="text-2xl font-semibold text-primary mb-2">Welcome back</h2>
          <p className="text-secondary">Sign in to your account to continue</p>
        </div>

        <div className="card p-8">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-secondary text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}