// SocketProvider.tsx
'use client';
import { createContext, useContext, useEffect } from 'react';
import socket from '@/utils/socketClient';
import { useGlobal } from '@/context/GlobalContext';

const SocketContext = createContext(socket);

export const SocketProvider = ({ serverId, children ,user}: { serverId: string, children: React.ReactNode,user:any }) => {

  const {getData}=useGlobal()
  const rejoinUser=getData("rejoinUser")
  useEffect(() => {
    if (!user?.userId || !serverId) return;

    // Join user lobbies once
    socket.emit('join_user_lobbies', { userId: user.userId, serverId });

    const handleJoined = (arg: any) => {
      console.log('Joined lobbies:', arg);
    };

    socket.on('joined_lobbies', handleJoined);

    return () => {
      socket.off('joined_lobbies', handleJoined);
    };
  }, [user?.userId, serverId,rejoinUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
