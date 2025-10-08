import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { useGlobal } from '@/context/GlobalContext';
import { ServerInvite } from '@/app/types/serverTypes';


export const useServerInvites = (serverId: string) => {
  const [invites, setInvites] = useState<ServerInvite[]>([]);
  const { getData, setData } = useGlobal();

  useEffect(() => {
    const fetchInvites = async () => {
      const data = await api.get(`/server/${serverId}/invites`);
      setInvites(data);
    };

    fetchInvites();
    setData('loadInvite', false);
  }, [serverId, getData('loadInvite')]);

  const revokeInvite = async (inviteId: string) => {
    const result = await api.post(`/invite/revokeInvite/${inviteId}`);
    if (result.ok) {
      setData('loadInvite', true);
    }
  };

  return { invites, revokeInvite };
};