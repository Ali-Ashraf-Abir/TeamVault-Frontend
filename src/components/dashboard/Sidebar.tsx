'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Channels', href: '/dashboard/channels', icon: '💬' },
    { name: 'Direct Messages', href: '/dashboard/messages', icon: '✉️' },
    { name: 'Team', href: '/dashboard/team', icon: '👥' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-primary transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} lg:relative lg:block hidden lg:flex lg:flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-primary">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-inverse">ChatFlow</span>
          </Link>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-primary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}