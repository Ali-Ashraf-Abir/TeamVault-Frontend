'use client';
import { ChevronDown, FolderOpen, Hash, Lock, Plus, Search, Settings, UserPlus } from "lucide-react";
import { LobbyDropdown } from "./CreateLobbyModal";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { useGlobal } from "@/context/GlobalContext";
import Link from "next/link";

export default function ServerSideBar({ setActiveView, activeView, currentServer, setShowCreateLobbyModal, setSelectedLobbyName, setSelectedLobby, selectedLobby, lobbies, setConfirmModalOpen, setOpen, currentUser, getInitials, notifications }: any) {

    const [clearedLobbies, setClearedLobbies] = useState<Set<string>>(new Set());

    const { setData } = useGlobal()
    // Compute unread count per lobby

    const unreadCountMap = notifications.reduce((acc: Record<string, number>, notif: any) => {
        if (!notif.isRead && notif.lobbyId) {
            if (notif.lobbyId != selectedLobby) {
                acc[notif.lobbyId] = (acc[notif.lobbyId] || 0) + 1;
            }

        }
        return acc;
    }, {});
    useEffect(() => {
        console.log(unreadCountMap)
        console.log(notifications ,'from server side bar')
    }, [unreadCountMap])
    const handleNOtificationRead = async (lobbyId: string) => {
        if (!lobbyId) return;
        await api.post(`/markRead/${currentUser?.userId}`, { lobbyId });
        notifications.forEach((notif: any) => {
            if (notif.lobbyId === lobbyId) notif.isRead = true;
        });
        setData("loadNotification", true);
    };
    return (
        <div className="w-60 bg-sidebar flex flex-col border-r border-primary">
            {/* Server Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-primary/50 shadow-sm">
                <h2 className="font-bold text-white text-lg truncate">{currentServer?.serverName}</h2>
                <button className="p-1 hover:bg-secondary/30 rounded transition-colors">
                    <ChevronDown className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="flex items-center gap-2 bg-secondary/20 rounded px-3 py-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 px-3 mb-2">
                <button
                    onClick={() => setActiveView('chat')}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${activeView === 'chat' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-secondary/30'
                        }`}
                >
                    <Hash className="w-4 h-4 inline mr-1" />
                    Lobbies
                </button>
            </div>

            {/* Quick Actions */}
            <div className="px-3 mb-2 grid grid-cols-2 gap-2">
                <button
                    onClick={() => setActiveView('invites')}
                    className={`p-2 rounded transition-colors flex items-center justify-center gap-2 ${activeView === 'invites' ? 'bg-primary-600' : 'bg-secondary/20 hover:bg-secondary/30'
                        }`}
                    title="Invites"
                >
                    <UserPlus className="w-4 h-4 text-white" />
                    <span className="text-xs text-white">Invites</span>
                </button>
                <button
                    onClick={() => setActiveView('files')}
                    className={`p-2 rounded transition-colors flex items-center justify-center gap-2 ${activeView === 'files' ? 'bg-primary-600' : 'bg-secondary/20 hover:bg-secondary/30'
                        }`}
                    title="Files"
                >
                    <FolderOpen className="w-4 h-4 text-white" />
                    <span className="text-xs text-white">Files</span>
                </button>
            </div>

            {/* Lobbies List */}
            <div className="flex-1 overflow-y-auto px-2">
                <div className="mb-4">
                    <div className="flex items-center justify-between px-2 py-1 mb-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Lobbies</span>
                        <button onClick={() => setShowCreateLobbyModal(true)} className="p-1 hover:bg-secondary/30 rounded">
                            <Plus className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    {lobbies?.map((lobby: any) => {
                        // If this lobby is currently selected, treat all messages as read
                        const unreadCount = lobby.lobbyId === selectedLobby
                            ? 0
                            : unreadCountMap[lobby.lobbyId] || 0;

                        return (
                            <div key={lobby.lobbyId} className="relative group">
                                <Link href={`/server/${currentServer?.serverId}/lobbies/${lobby?.lobbyId}`}> <div
                                    onClick={() => {
                                        // setSelectedLobby(lobby.lobbyId);
                                        setActiveView('chat');
                                        setSelectedLobbyName(lobby.lobbyName);

                                        // Mark the currently selected lobby's notifications as read
                                        handleNOtificationRead(lobby.lobbyId);
                                    }}
                                    className={`w-full cursor-pointer flex items-center gap-2 px-2 py-1.5 rounded mb-0.5 transition-colors ${selectedLobby === lobby.lobbyId && activeView === 'chat'
                                        ? 'bg-secondary/40 text-white'
                                        : 'text-gray-300 hover:bg-secondary/20 hover:text-white'
                                        }`}
                                >
                                    {lobby.isPrivate ? <Lock className="w-4 h-4 flex-shrink-0" /> : <Hash className="w-4 h-4 flex-shrink-0" />}

                                    <span className="text-sm truncate flex-1 text-left">{lobby.lobbyName}</span>

                                    {unreadCount > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}

                                    <LobbyDropdown
                                        lobbyId={lobby.lobbyId}
                                        lobbyName={lobby.lobbyName}
                                        onAddMembers={() => { setOpen(true); setSelectedLobby(lobby.lobbyId); }}
                                        onDelete={() => { setConfirmModalOpen(true); setSelectedLobby(lobby.lobbyId); }}
                                    />
                                </div></Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* User Profile */}
            <div className="h-14 flex items-center gap-2 px-2 bg-secondary/20 border-t border-primary/50">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                        {currentUser && getInitials(currentUser?.firstName, currentUser?.lastName)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                        {currentUser?.firstName} {currentUser?.lastName}
                    </div>
                    <div className="text-xs text-gray-400 truncate">Online</div>
                </div>
                <button className="p-1.5 hover:bg-secondary/30 rounded transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>
    )
}