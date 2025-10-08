import { useState, useEffect } from 'react';
import { api } from '@/api/api';
import socket from '@/utils/socketClient';
import { useGlobal } from '@/context/GlobalContext';

export const useLobbies = (serverId: string, userId: string | undefined) => {
  const [lobbies, setLobbies] = useState<any[]>([]);
  const [selectedLobby, setSelectedLobby] = useState<string>('');
  const { getData, setData } = useGlobal();

  useEffect(() => {
    if (!serverId || !userId) return;

    const fetchLobbies = async () => {
      const data = await api.get(`/getLobbyByUserAndServerId/${serverId}/${userId}`);
      setLobbies(data.lobbies);
    };

    fetchLobbies();

    const handleReload = (arg: string) => {
      if (arg === 'reload_lobby') {
        fetchLobbies();
      }
    };

    socket.on("reload_user_lobby", handleReload);
    
    return () => {
      socket.off("reload_user_lobby", handleReload);
    };
  }, [serverId, userId, getData('loadLobby')]);

  const createLobby = async (lobbyData: any) => {
    const response = await api.post(`/createLobby`, lobbyData);
    if (response.ok) {
      setData('loadLobby', true);
      return true;
    }
    return false;
  };

  const deleteLobby = async (lobbyId: string) => {
    const result = await api.delete(`/deleteLobbyByLobbyId/${lobbyId}`);
    if (result.ok) {
      setData('loadLobby', true);
      return true;
    }
    throw new Error(result.message);
  };

  return { 
    lobbies, 
    selectedLobby, 
    setSelectedLobby, 
    createLobby, 
    deleteLobby 
  };
};