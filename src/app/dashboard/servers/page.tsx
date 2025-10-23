'use client'
import { api } from "@/api/api"
import ServerCards from "@/components/cards/ServerCards"
import { CreateServerModal } from "@/components/forms/CreateServerModal"
import { useGlobal } from "@/context/GlobalContext"
import socket from "@/utils/socketClient"
import { getUserData } from "@/utils/userHandler"
import { Check, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function ServersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleServerCreated = () => setIsModalOpen(false)
  const [user, setUser] = useState<any>(null)
  const [servers, setServers] = useState<any[]>([])
  const { getData, setData } = useGlobal()
  const [receivedInvites, setReceivedInvites] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData()
      setUser(data)
    }
    fetchUser()
  }, [])


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
    const fetchInvites = async () => {
      try {

        const [received] = await Promise.all([

          api.get(`/userInvite/received/${user.userId}`)
        ]);

        setReceivedInvites(received);
      } catch (err) {
        console.error('Error fetching invites:', err);
        setError('Failed to fetch invites.');
      } finally {

      }
    };
    fetchInvites()
  }, [user, getData('loadServer')])


  useEffect(()=>{
    socket.on('invites',(arg)=>{
      if(arg=='reload'){
        setData("loadServer",true)
      }
    })
  },[])
  const acceptInvite = async (inviteId: string) => {
    try {
      const res = await api.post(`/userInvite/accept/${inviteId}`);
      setReceivedInvites(prev =>
        prev.map(inv =>
          inv.inviteId === inviteId ? { ...inv, status: 'accepted' } : inv
        )
      );
      setData('loadServer',true)
    } catch (err) {
      console.error('Error accepting invite:', err);
      setError('Failed to accept invite.');
    }
  };

  // --- Reject Invite ---
  const rejectInvite = async (inviteId: string) => {
    try {
      const res = await api.post(`/userInvite/reject/${inviteId}`);
      setReceivedInvites(prev =>
        prev.map(inv =>
          inv.inviteId === inviteId ? { ...inv, status: 'rejected' } : inv
        )
      );
    } catch (err) {
      console.error('Error rejecting invite:', err);
      setError('Failed to reject invite.');
    }
  };
  return (
    <div>

      <section className="mb-8">
        <h3 className="text-lg font-semibold text-primary mb-3">Received Invites</h3>
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          {receivedInvites?.length === 0 ? (
            <p className="text-secondary">No invites received yet.</p>
          ) : (
            receivedInvites?.map((invite) => (
              <div
                key={invite?.inviteId}
                className="flex justify-between items-center border-b border-border pb-2 last:border-0"
              >
                <div>
                  <p className="font-semibold text-primary">
                    From: {invite?.sender?.firstName}{' '}
                    <span className="text-secondary text-sm ml-2">
                      ({invite?.status})
                    </span>
                  </p>
                </div>
                {invite?.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptInvite(invite?.inviteId)}
                      className="bg-green-600 hover:bg-green-700 rounded-lg p-1"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => rejectInvite(invite?.inviteId)}
                      className="bg-red-600 hover:bg-red-700 rounded-lg p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
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
