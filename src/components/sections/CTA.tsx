import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to transform your team communication?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of teams already using TeamVault to collaborate better.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
            Start Free Trial
          </Link>
          <Link href="/login" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}