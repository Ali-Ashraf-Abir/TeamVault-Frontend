'use client';
import React, { useEffect, useState } from 'react';
import { Hash, Volume2, Lock, Plus, Search, Users, Paperclip, Smile, Send, MoreVertical, Pin, Bell, Settings, ChevronDown, CheckSquare, FolderOpen, UserPlus, Shield, Crown, Copy, Link as LinkIcon, Calendar, X } from 'lucide-react';
import InviteModal from './InviteModal';
import { useParams } from "next/navigation"
import { useGlobal, useUser } from '@/context/GlobalContext';
import { getUserData } from '@/utils/userHandler';
import ServerInviteCards from './ServerInviteCards';
import { api } from '@/api/api';
// Types matching your Prisma schema
type ServerRole = 'owner' | 'admin' | 'member' | 'guest';
type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface Server {
    serverId: string;
    serverName: string;
    description: string;
    createdBy: string;
    createdAt: Date;
}

interface ServerMembership {
    serverId: string;
    userId: string;
    role: ServerRole;
    joinedAt: Date;
    user: User;
}

interface Lobby {
    lobbyId: string;
    serverId: string;
    lobbyName: string;
    createdAt: Date;
    isPrivate?: boolean;
}

interface Chat {
    chatId: string;
    serverId: string;
    lobbyId: string;
    sentBy: string;
    message: string;
    sentAt: Date;
    editedAt?: Date;
    sender: User;
}

interface ServerInvite {
    inviteId: string;
    serverId: string;
    code: string;
    expiresAt?: Date;
    maxUses?: number;
    uses: number;
    revoked: boolean;
    createdAt: Date;
}

interface UserInvite {
    inviteId: string;
    serverId: string;
    invitedBy: string;
    invitedUserId: string;
    status: InviteStatus;
    createdAt: Date;
    sender: User;
}

const MainServerInterface: React.FC = () => {
    const [activeView, setActiveView] = useState<'chat' | 'invites' | 'files'>('chat');
    const [selectedLobby, setSelectedLobby] = useState<string>('lobby-1');
    const [message, setMessage] = useState('');
    const [showMembers, setShowMembers] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const params = useParams()
    const serverId = params.server_id as string

    // Mock current user
    const currentUser: User = {
        userId: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
    };
    const { setUser, user } = useUser()
    useEffect(() => {
        getUserData().then(user => setUser(user))

    }, [])
    const {getData,setData}=useGlobal()
    const [serverInvites,setServerInviteData]=useState<any>()
    // Mock server data
    const currentServer: Server = {
        serverId: 'server-1',
        serverName: 'Development Team',
        description: 'Team collaboration workspace',
        createdBy: 'user-1',
        createdAt: new Date('2025-01-01'),
    };

    // Mock lobbies (channels)
    const lobbies: Lobby[] = [
        { lobbyId: 'lobby-1', serverId: 'server-1', lobbyName: 'general', createdAt: new Date(), isPrivate: false },
        { lobbyId: 'lobby-2', serverId: 'server-1', lobbyName: 'random', createdAt: new Date(), isPrivate: false },
        { lobbyId: 'lobby-3', serverId: 'server-1', lobbyName: 'announcements', createdAt: new Date(), isPrivate: false },
        { lobbyId: 'lobby-4', serverId: 'server-1', lobbyName: 'private-team', createdAt: new Date(), isPrivate: true },
    ];

    // Mock server members
    const serverMembers: ServerMembership[] = [
        {
            serverId: 'server-1',
            userId: 'user-1',
            role: 'owner',
            joinedAt: new Date('2025-01-01'),
            user: { userId: 'user-1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        },
        {
            serverId: 'server-1',
            userId: 'user-2',
            role: 'admin',
            joinedAt: new Date('2025-01-02'),
            user: { userId: 'user-2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
        },
        {
            serverId: 'server-1',
            userId: 'user-3',
            role: 'member',
            joinedAt: new Date('2025-01-05'),
            user: { userId: 'user-3', firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com' },
        },
        {
            serverId: 'server-1',
            userId: 'user-4',
            role: 'member',
            joinedAt: new Date('2025-01-10'),
            user: { userId: 'user-4', firstName: 'Sarah', lastName: 'Williams', email: 'sarah@example.com' },
        },
    ];

    // Mock chats
    const chats: Chat[] = [
        {
            chatId: 'chat-1',
            serverId: 'server-1',
            lobbyId: 'lobby-1',
            sentBy: 'user-2',
            message: "Hey everyone! How's the project coming along?",
            sentAt: new Date('2025-10-02T10:30:00'),
            sender: { userId: 'user-2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
        },
        {
            chatId: 'chat-2',
            serverId: 'server-1',
            lobbyId: 'lobby-1',
            sentBy: 'user-1',
            message: 'Going great! Just finished the authentication module.',
            sentAt: new Date('2025-10-02T10:32:00'),
            sender: { userId: 'user-1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        },
        {
            chatId: 'chat-3',
            serverId: 'server-1',
            lobbyId: 'lobby-1',
            sentBy: 'user-3',
            message: "Nice work! I'm working on the UI components right now.",
            sentAt: new Date('2025-10-02T10:35:00'),
            sender: { userId: 'user-3', firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com' },
        },
    ];

 
    useEffect(()=>{
        const serverInviteData=api.get(`/server/${serverId}/invites`).then(data=>setServerInviteData(data))
        setData('loadInvite',false)
    },[getData('loadInvite')])
    // Mock user invites (pending invitations)
    const userInvites: UserInvite[] = [
        {
            inviteId: 'user-invite-1',
            serverId: 'server-1',
            invitedBy: 'user-1',
            invitedUserId: 'user-5',
            status: 'pending',
            createdAt: new Date('2025-10-01T15:00:00'),
            sender: { userId: 'user-1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        },
    ];

    const files = [
        { id: '1', name: 'project-requirements.pdf', size: '2.4 MB', uploadedBy: 'John Doe', date: 'Oct 1, 2025' },
        { id: '2', name: 'design-mockup.png', size: '1.8 MB', uploadedBy: 'Mike Johnson', date: 'Oct 2, 2025' },
        { id: '3', name: 'meeting-notes.docx', size: '156 KB', uploadedBy: 'Jane Smith', date: 'Sep 30, 2025' },
    ];

    const getRoleIcon = (role: ServerRole) => {
        switch (role) {
            case 'owner':
                return <Crown className="w-3 h-3 text-yellow-500" />;
            case 'admin':
                return <Shield className="w-3 h-3 text-blue-500" />;
            default:
                return null;
        }
    };

    const getRoleBadge = (role: ServerRole) => {
        const colors = {
            owner: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            admin: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            member: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
            guest: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        };
        return colors[role];
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };



    const renderChat = () => {
        const currentLobby = lobbies.find(l => l.lobbyId === selectedLobby);
        const lobbyChats = chats.filter(c => c.lobbyId === selectedLobby);

        return (
            <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {lobbyChats.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <Hash className="w-16 h-16 text-muted mb-4" />
                            <h3 className="text-xl font-bold text-primary mb-2">
                                Welcome to #{currentLobby?.lobbyName}
                            </h3>
                            <p className="text-secondary">This is the beginning of the conversation.</p>
                        </div>
                    ) : (
                        lobbyChats.map((chat) => (
                            <div key={chat.chatId} className="flex gap-3 hover:bg-secondary/50 p-2 rounded transition-colors group">
                                <div className="relative flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {getInitials(chat.sender.firstName, chat.sender.lastName)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-primary">
                                            {chat.sender.firstName} {chat.sender.lastName}
                                        </span>
                                        <span className="text-xs text-muted">{formatTime(chat.sentAt)}</span>
                                        {chat.editedAt && (
                                            <span className="text-xs text-muted italic">(edited)</span>
                                        )}
                                    </div>
                                    <p className="text-secondary mt-1 break-words">{chat.message}</p>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-accent rounded">
                                        <MoreVertical className="w-4 h-4 text-muted" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-primary">
                    <div className="flex items-center gap-2 bg-accent rounded-lg p-2 border border-primary focus-within:border-accent">
                        <button className="p-2 hover:bg-secondary rounded transition-colors">
                            <Plus className="w-5 h-5 text-secondary" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={`Message #${currentLobby?.lobbyName}`}
                            className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-muted"
                        />
                        <button className="p-2 hover:bg-secondary rounded transition-colors">
                            <Smile className="w-5 h-5 text-secondary" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded transition-colors">
                            <Paperclip className="w-5 h-5 text-secondary" />
                        </button>
                        <button className="p-2 bg-primary-600 hover:bg-primary-700 rounded transition-colors">
                            <Send className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            </>
        );
    };

    const renderInvites = () => (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">Server Invites</h2>
                        <p className="text-sm text-secondary mt-1">Manage invitation links for your server</p>
                    </div>
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create Invite
                    </button>
                </div>

                {/* Server Invite Links */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        Invite Links
                    </h3>
                    <div className="space-y-3">
                        {serverInvites.map((invite:any) => (
                            <ServerInviteCards key={invite.inviteId} invite={invite}>

                            </ServerInviteCards>
                        ))}
                    </div>
                </div>

                {/* Pending User Invites */}
                <div>
                    <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                        <UserPlus className="w-5 h-5" />
                        Pending User Invites
                    </h3>
                    <div className="space-y-3">
                        {userInvites.length === 0 ? (
                            <div className="card p-8 text-center">
                                <p className="text-secondary">No pending invites</p>
                            </div>
                        ) : (
                            userInvites.map((invite) => (
                                <div key={invite.inviteId} className="card p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-primary">
                                                Invited by {invite.sender.firstName} {invite.sender.lastName}
                                            </p>
                                            <p className="text-sm text-secondary mt-1">
                                                {new Intl.DateTimeFormat('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: '2-digit'
                                                }).format(invite.createdAt)}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${invite.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            invite.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                invite.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {invite.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Create Invite Modal */}
            {showInviteModal && (
                <InviteModal userId={user?.userId} setShowInviteModal={setShowInviteModal} serverId={serverId}></InviteModal>
            )}
        </div>
    );

    const renderFiles = () => (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary">Files</h2>
                    <button className="btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Upload File
                    </button>
                </div>
                <div className="grid gap-3">
                    {files.map((file) => (
                        <div key={file.id} className="card p-4 flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Paperclip className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-primary">{file.name}</h3>
                                <p className="text-sm text-secondary">{file.size} • Uploaded by {file.uploadedBy} • {file.date}</p>
                            </div>
                            <button className="p-2 hover:bg-accent rounded transition-colors">
                                <MoreVertical className="w-5 h-5 text-secondary" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const currentLobby = lobbies.find(l => l.lobbyId === selectedLobby);

    return (
        <div className="flex h-screen bg-primary text-primary">
            {/* Channel Sidebar */}
            <div className="w-60 bg-sidebar flex flex-col border-r border-primary">
                {/* Server Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-primary/50 shadow-sm">
                    <h2 className="font-bold text-white text-lg truncate">{currentServer.serverName}</h2>
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
                            <button className="p-1 hover:bg-secondary/30 rounded">
                                <Plus className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        {lobbies.map((lobby) => (
                            <button
                                key={lobby.lobbyId}
                                onClick={() => { setSelectedLobby(lobby.lobbyId); setActiveView('chat'); }}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded mb-0.5 transition-colors ${selectedLobby === lobby.lobbyId && activeView === 'chat'
                                    ? 'bg-secondary/40 text-white'
                                    : 'text-gray-300 hover:bg-secondary/20 hover:text-white'
                                    }`}
                            >
                                {lobby.isPrivate ? (
                                    <Lock className="w-4 h-4 flex-shrink-0" />
                                ) : (
                                    <Hash className="w-4 h-4 flex-shrink-0" />
                                )}
                                <span className="text-sm truncate">{lobby.lobbyName}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* User Profile */}
                <div className="h-14 flex items-center gap-2 px-2 bg-secondary/20 border-t border-primary/50">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                            {getInitials(currentUser.firstName, currentUser.lastName)}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                            {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-xs text-gray-400 truncate">Online</div>
                    </div>
                    <button className="p-1.5 hover:bg-secondary/30 rounded transition-colors">
                        <Settings className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Channel Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-primary shadow-sm">
                    <div className="flex items-center gap-3">
                        {activeView === 'chat' && (
                            <>
                                {currentLobby?.isPrivate ? (
                                    <Lock className="w-6 h-6 text-secondary" />
                                ) : (
                                    <Hash className="w-6 h-6 text-secondary" />
                                )}
                            </>
                        )}
                        {activeView === 'invites' && <UserPlus className="w-6 h-6 text-secondary" />}
                        {activeView === 'files' && <FolderOpen className="w-6 h-6 text-secondary" />}
                        <div>
                            <h1 className="font-bold text-primary">
                                {activeView === 'chat' ? currentLobby?.lobbyName : activeView === 'invites' ? 'Invites' : 'Files'}
                            </h1>
                            {activeView === 'chat' && (
                                <p className="text-xs text-muted">
                                    {serverMembers.length} members
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-accent rounded transition-colors" title="Notifications">
                            <Bell className="w-5 h-5 text-secondary" />
                        </button>
                        <button className="p-2 hover:bg-accent rounded transition-colors" title="Pinned Messages">
                            <Pin className="w-5 h-5 text-secondary" />
                        </button>
                        <button className="p-2 hover:bg-accent rounded transition-colors" title="Search">
                            <Search className="w-5 h-5 text-secondary" />
                        </button>
                        <button
                            onClick={() => setShowMembers(!showMembers)}
                            className="p-2 hover:bg-accent rounded transition-colors"
                            title="Members"
                        >
                            <Users className="w-5 h-5 text-secondary" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {activeView === 'chat' && renderChat()}
                {activeView === 'invites' && renderInvites()}
                {activeView === 'files' && renderFiles()}
            </div>

            {/* Members Sidebar */}
            {showMembers && activeView === 'chat' && (
                <div className="w-60 bg-secondary border-l border-primary flex flex-col">
                    <div className="p-4 border-b border-primary">
                        <h3 className="font-semibold text-primary">Members — {serverMembers.length}</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {['owner', 'admin', 'member', 'guest'].map((roleFilter) => {
                            const roleMembers = serverMembers.filter(m => m.role === roleFilter);

                            if (roleMembers.length === 0) return null;

                            return (
                                <div key={roleFilter} className="mb-4">
                                    <div className="px-2 py-1 text-xs font-semibold text-muted uppercase mb-1">
                                        {roleFilter} — {roleMembers.length}
                                    </div>
                                    {roleMembers.map((member) => (
                                        <button
                                            key={member.userId}
                                            className="w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-accent transition-colors group"
                                        >
                                            <div className="relative flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                                                    {getInitials(member.user.firstName, member.user.lastName)}
                                                </div>
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm text-primary truncate">
                                                        {member.user.firstName} {member.user.lastName}
                                                    </span>
                                                    {getRoleIcon(member.role)}
                                                </div>
                                                <div className={`text-xs px-2 py-0.5 rounded border inline-block ${getRoleBadge(member.role)}`}>
                                                    {member.role}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainServerInterface;