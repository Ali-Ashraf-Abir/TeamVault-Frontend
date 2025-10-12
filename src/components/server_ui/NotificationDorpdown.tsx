"use client";
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

import Link from "next/link";
import socket from "@/utils/socketClient";
import { api } from "@/api/api";

interface Notification {
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
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ recipientId }) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fetch notifications from backend
  const fetchNotifications = async (cursorId?: string) => {
    const query = new URLSearchParams();
    const data: any = {}
    if (cursorId) query.append("cursor", cursorId);
    const res = api.get(`/getNotifications/${recipientId}?${query.toString()}`).then(data => {
      console.log(data)
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
    }

  }, [recipientId]);

  // Listen to socket for new notifications
  useEffect(() => {
    if (!socket) return;
    const handleNewNotification = (notif: Notification) => {
      setNotifications(prev => [notif, ...prev]);
    };
    socket.on("new_notification", handleNewNotification);
    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, [socket]);

  // Mark all as read
  const markAllAsRead = async () => {
    await api.post(`/markRead/${recipientId}`);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

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
            {notifications.map(notif => (
              <li
                key={notif.notificationId}
                className={`px-4 py-2 border-b border-primary hover:bg-accent cursor-pointer ${!notif.isRead ? "bg-muted" : ""}`}
              >
                <Link href={notif.link || "#"} className="block">
                  <p className="text-sm font-semibold text-primary">{notif.title}</p>
                  {notif.message && <p className="text-xs text-muted">{notif.message}</p>}
                  <p className="text-xs text-muted mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
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
              className="w-full text-sm text-center py-2 hover:bg-accent border-t border-primary"
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
