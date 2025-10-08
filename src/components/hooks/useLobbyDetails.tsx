import { useState, useEffect } from 'react';
import { api } from '@/api/api';

export const useLobbyDetails = (lobbyId: string, serverData: any) => {
  const [lobbyData, setLobbyData] = useState<any>(null);

  useEffect(() => {
    if (lobbyId) {
      api.get(`/getLobbyByLobbyId/${lobbyId}`)
        .then(data => setLobbyData(data));
    } else {
      setLobbyData(serverData);
    }
  }, [lobbyId, serverData]);

  const addMembers = async (data: { userIds: string[]; role: string }) => {
    const result = await api.post(`/addMultipleLobbyMembers/${lobbyId}/members`, data);
    return result.ok;
  };

  return { lobbyData, addMembers };
};