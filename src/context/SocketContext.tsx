"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import socket from "@/utils/socketClient";

type SocketContextType = {
  socket: typeof socket | null;
  notifications: any[];
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  notifications: [],
});

export const useGlobalSocketListeners = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {

    const handleNotification = (notif: any) => {
      console.log("📬 Global notification:", notif);
      setNotifications((prev) => [notif, ...prev]);
    };

    socket.on("new_notification", handleNotification);

    return () => {
      socket.off("new_notification", handleNotification); 
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};
