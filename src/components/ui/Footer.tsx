import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-2xl font-bold gradient-text">TeamVault</span>
            </div>
            <p className="text-secondary mb-4 max-w-md">
              Modern team communication platform designed for productivity and collaboration.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <Link key={social} href="#" className="text-muted hover:text-primary transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Security', 'Integrations'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-secondary hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Status', 'API Docs'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-secondary hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary mt-12 pt-8 text-center">
          <p className="text-secondary">
            © 2024 TeamVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}