'use client'

import { useState } from 'react'
import { api } from '@/api/api' // your API utils
import { useUser } from '@/context/GlobalContext'

interface CreateServerModalProps {
  isOpen: boolean
  onClose: () => void
  onServerCreated: () => void
}

export function CreateServerModal({ isOpen, onClose, onServerCreated }: CreateServerModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useUser() 

  const handleCreateServer = async () => {
    if (!name) {
      setError('Server name is required')
      return
    }
    console.log(user?.userId)
    setLoading(true)
    setError('')
    try {
      await api.post('/create-server', { name, description,userId:user?.userId || ''}) // Adjust endpoint as per your backend
      setName('')
      setDescription('')
      onServerCreated()
      onClose()
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create server')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">Create a Server</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Server Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-secondary text-white border border-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg bg-secondary text-white border border-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleCreateServer}
          disabled={loading}
          className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Server'}
        </button>
      </div>
    </div>
  )
}
