'use client'

import { api } from "@/api/api"
import { useEffect } from "react"

export function DashboardStats() {
  const stats = [
    {
      name: 'Total Messages',
      value: '12,345',
      change: '+12.5%',
      changeType: 'increase',
      icon: '💬',
      color: 'bg-blue-500'
    },
    {
      name: 'Active Channels',
      value: '23',
      change: '+2 new',
      changeType: 'increase',
      icon: '📺',
      color: 'bg-green-500'
    },
    {
      name: 'Team Members',
      value: '145',
      change: '+5 this week',
      changeType: 'increase',
      icon: '👥',
      color: 'bg-purple-500'
    },
    {
      name: 'Files Shared',
      value: '2,847',
      change: '+23.1%',
      changeType: 'increase',
      icon: '📁',
      color: 'bg-orange-500'
    }
  ]



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="card p-6 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${stat.color} rounded-lg`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <span className={`text-sm font-medium ${
              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-secondary">{stat.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
