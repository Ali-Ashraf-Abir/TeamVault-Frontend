"use client";
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

import Link from "next/link";
import socket from "@/utils/socketClient";
import { api } from "@/api/api";
import { useGlobal } from "@/context/GlobalContext";

interface Notification {
  lobbyId: string;
  notificationId: string;
  type: string;
  title?: string;
  message?: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  sender?: { firstName: string; lastName: string };
}

interface NotificationDropdownProps {
  recipientId: string;
  activeLobby:{
    lobbyId:string
  };
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ recipientId,activeLobby }) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const { getData, setData } = useGlobal()
  const loadNotification = getData('loadNotification')
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fetch notifications from backend
  const fetchNotifications = async (cursorId?: string) => {
    const query = new URLSearchParams();
    const data: any = {}
    if (cursorId) query.append("cursor", cursorId);
    const res = api.get(`/getNotifications/${recipientId}?${query.toString()}`).then(data => {
  
      if (data.notifications) {
        setNotifications(prev => cursorId ? [...prev, ...data.notifications] : data.notifications);
        if (data.notifications.length > 0) {
          setCursor(data.notifications[data.notifications.length - 1].notificationId);
        }
      }
    });


  };

  // Load latest notifications on mount
  useEffect(() => {
    if (recipientId) {
      fetchNotifications();
      setData('loadNotification', false)
    }

  }, [recipientId, loadNotification]);

  // Listen to socket for new notifications
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = async (notif: Notification) => {
      if (notif.type === "message" && notif.lobbyId === activeLobby.lobbyId) {
        // Mark read immediately
        await api.post(`/markRead/${recipientId}`, { lobbyId: activeLobby.lobbyId });
        setData("loadNotification", true);

        // Add notification but mark as read locally
        setNotifications(prev => [{ ...notif, isRead: true }, ...prev]);
      } else {
        setNotifications(prev => [notif, ...prev]);
      }
    };

    socket.on("new_notification", handleNewNotification);
    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket, activeLobby]);

  // Mark all as read
  const markAllAsRead = async () => {
    await api.post(`/markRead/${recipientId}`);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIntervalKey = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();

    const minutes = Math.floor(date.getMinutes() / 10) * 10;
    return `${year}-${month}-${day}-${hour}-${minutes}`;
  };

  const groupedNotifications = Object.values(
    notifications.reduce((acc: Record<string, any>, notif) => {
      if (notif.type === "message" && notif.lobbyId) {
        const intervalKey = getIntervalKey(notif.createdAt);
        const key = `${notif.lobbyId}_${intervalKey}`;

        if (!acc[key]) {
          acc[key] = { ...notif, count: 1 };
        } else {
          acc[key].count += 1;
          // Keep the latest createdAt, title, message
          if (new Date(notif.createdAt) > new Date(acc[key].createdAt)) {
            acc[key].createdAt = notif.createdAt;
            acc[key].title = notif.title;
            acc[key].message = notif.message;
          }
        }
      } else {
        // Personal messages or other types
        acc[notif.notificationId] = { ...notif, count: 1 };
      }

      return acc;
    }, {})
  );

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
          if (!showDropdown) markAllAsRead();
        }}
        className="relative p-2 hover:bg-accent rounded transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5 text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-card border border-primary rounded shadow-lg z-50">
          {notifications.length === 0 && (
            <p className="p-4 text-sm text-muted">No notifications</p>
          )}
          <ul>
            {groupedNotifications.length === 0 && (
              <p className="p-4 text-sm text-muted">No notifications</p>
            )}
            {groupedNotifications.map(notif => (
              <li
                key={notif.notificationId}
                className={`px-4 py-2 border-b border-primary bg-primary hover:bg-accent cursor-pointer ${!notif.isRead ? "bg-secondary" : ""}`}
              >
                <Link href={notif.link || "#"} className="block">
                  <p className="text-sm font-semibold text-primary">
                    {/* If it's a lobby message with multiple messages */}
                    {notif.type === "message" && notif.lobbyId && notif.count > 1
                      ? `${notif.count} new messages in ${notif.lobby?.lobbyName || "this lobby"}`
                      : notif.title
                    }
                  </p>

                  {/* Show message only if it's a single notification */}
                  {(notif.count === 1 || !notif.lobbyId) && notif.message && (
                    <p className="text-xs text-muted">{notif.message}</p>
                  )}

                  <p className="text-xs text-muted mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          {cursor && (
            <button
              onClick={() => {
                setLoadingMore(true);
                fetchNotifications(cursor).finally(() => setLoadingMore(false));
              }}
              className="w-full text-sm text-center py-2 hover:bg-accent border-t border-primary bg-secondary"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
