import { useState, useEffect } from 'react';
import { api } from '@/api/api';

export const useServer = (serverId: string) => {
  const [serverData, setServerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serverId) return;
    
    const fetchServer = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/getServerByServerId/${serverId}`);
        setServerData(data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchServer();
  }, [serverId]);

  return { serverData, loading };
};