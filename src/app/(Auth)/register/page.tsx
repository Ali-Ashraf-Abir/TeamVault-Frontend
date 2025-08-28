
import { RegisterForm } from '@/components/forms/RegisterForm'
import { BackgroundPattern } from '@/components/ui/BackgroundPattern'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundPattern />
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold gradient-text">ChatFlow</h1>
          </Link>
          <h2 className="text-2xl font-semibold text-primary mb-2">Create your account</h2>
          <p className="text-secondary">Join thousands of teams already using ChatFlow</p>
        </div>

        <div className="card p-8">
          <RegisterForm />
          
          <div className="mt-6 text-center">
            <p className="text-secondary text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}