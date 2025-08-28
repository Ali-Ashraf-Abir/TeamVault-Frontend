'use client'

import { useUser } from '@/context/GlobalContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const {user}=useUser()
  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Channels', href: '/dashboard/channels', icon: '💬' },
    { name: 'Direct Messages', href: '/dashboard/messages', icon: '✉️' },
    { name: 'Team', href: '/dashboard/team', icon: '👥' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar')
      const menuButton = document.getElementById('mobile-menu-button')
      
      if (isMobileOpen && sidebar && menuButton && 
          !sidebar.contains(event.target as Node) && 
          !menuButton.contains(event.target as Node)) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobile-menu-button"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-2 rounded-lg bg-sidebar border border-primary text-slate-300 hover:text-white hover:bg-slate-700"
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" />
      )}

      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-primary transition-all duration-300 
          ${isCollapsed ? 'w-16' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:relative lg:block flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-inverse">TeamVault</span>
            </Link>
          )}
          
          <div className="flex items-center space-x-2">
            {/* Desktop collapse button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
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

       {
        user? <div className="p-4 border-t border-primary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{user.firstName[0]}{user.lastName[0]}</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>:''
       }
      </div>
    </>
  )
}