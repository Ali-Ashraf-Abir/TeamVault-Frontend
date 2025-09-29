'use client'
import { CreateServerModal } from "@/components/forms/CreateServerModal"
import { useState } from "react"

export default function ServersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleServerCreated = () => setIsModalOpen(false)
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Servers</h1>
        <button  onClick={() => setIsModalOpen(true)}className="btn-primary mb-6">Create Server</button>
      </div>
       <CreateServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onServerCreated={handleServerCreated}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">#</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary">general-{i}</h3>
                <p className="text-sm text-secondary">124 members</p>
              </div>
            </div>
            <p className="text-secondary text-sm mb-4">Team discussions and announcements</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Last message 2 hours ago</span>
              <div className="flex space-x-2">
                <button className="text-xs btn-secondary py-1 px-3">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}