'use client'
import { api } from "@/api/api"
import ServerCards from "@/components/cards/ServerCards"
import { CreateServerModal } from "@/components/forms/CreateServerModal"
import { useGlobal, useUser } from "@/context/GlobalContext"
import { useEffect, useState } from "react"

export default function ServersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleServerCreated = () => setIsModalOpen(false)
  const { user } = useUser()
  const [servers, setServers] = useState<any>()
  const { getData,setData } = useGlobal()
  useEffect(() => {
    try {
      api.get(`/getServerByUserId/${user?.userId}`)
        .then(data => setServers(data.servers))
    } catch (e: any) {
      console.log(e)
    }
    setData('loadServer',false)
  }, [user, getData('loadServer')])
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Servers</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary mb-6">Create Server</button>
      </div>
      <CreateServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onServerCreated={handleServerCreated}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {servers?.map((server: any) => (
          <ServerCards server={server}>

          </ServerCards>
        ))}
      </div>
    </div>
  )
}