'use client'

import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { decodeJwt, getUserData } from '@/utils/userHandler'
import { api } from '@/api/api'
import { useUser } from '@/context/GlobalContext'



export function DashboardHeader() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const {setUser,user}=useUser()
  useEffect(()=>{
    getUserData().then(user => setUser(user))
    
  },[])
  console.log(user)
  return (
    <header className="bg-primary border-b border-primary px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search messages, channels, or people..."
              className="block w-full pl-10 pr-3 py-3 border border-primary rounded-xl bg-secondary text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a6 6 0 01-6-6V9a6 6 0 016-6h6a6 6 0 016 6v2" />
            </svg>
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Messages */}
          <button className="p-2 rounded-lg hover:bg-accent transition-colors">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <ThemeToggle />

          {/* Profile */}
          {user?<div className="relative">
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user.firstName[0]}{user.lastName[0]}</span>
              </div>
            </button>
          </div>:''}
        </div>
      </div>
    </header>
  )
}