'use client'
import { api } from "@/api/api"
import ServerCards from "@/components/cards/ServerCards"
import { CreateServerModal } from "@/components/forms/CreateServerModal"
import { useGlobal } from "@/context/GlobalContext"
import { getUserData } from "@/utils/userHandler"
import { useEffect, useState } from "react"

export default function ServersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleServerCreated = () => setIsModalOpen(false)
  const [user, setUser] = useState<any>(null)
  const [servers, setServers] = useState<any[]>([])
  const { getData, setData } = useGlobal()

  // ✅ actually call getData once on mount

  // ✅ fetch user once
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData()
      setUser(data)
    }
    fetchUser()
  }, [])

  // ✅ fetch servers only when user is available
  useEffect(() => {
    if (!user?.userId) return

    const fetchServers = async () => {
      try {
        const res = await api.get(`/getServerByUserId/${user.userId}`)
        setServers(res.servers || [])
      } catch (e: any) {
        console.error("Error fetching servers", e)
      } finally {
        setData('loadServer', false)
      }
    }

    fetchServers()
  }, [user, getData('loadServer')]) // 🔑 this should be a value, not function call

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Servers</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary mb-6"
        >
          Create Server
        </button>
      </div>

      <CreateServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onServerCreated={handleServerCreated}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {servers.length > 0 ? (
          servers.map((server: any) => (
            <ServerCards key={server.serverId} server={server} />
          ))
        ) : (
          <p className="text-muted">No servers found</p>
        )}
      </div>
    </div>
  )
}
