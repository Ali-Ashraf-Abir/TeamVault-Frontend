'use client';
import React, { useEffect, useState } from 'react';
import { Hash, Volume2, Lock, Plus, Search, Users, Paperclip, Smile, Send, MoreVertical, Pin, Bell, Settings, ChevronDown, CheckSquare, FolderOpen, UserPlus, Shield, Crown, Copy, Link as LinkIcon, Calendar, X } from 'lucide-react';
import InviteModal from './InviteModal';
import { useParams } from "next/navigation"
import { useGlobal, useUser } from '@/context/GlobalContext';
import { getUserData } from '@/utils/userHandler';
import ServerInviteCards from './ServerInviteCards';
import { api } from '@/api/api';
import CreateLobbyModal, { LobbyDropdown } from './CreateLobbyModal';
import { ConfirmModal } from '../modals/ConfirmModal';
import { AddMembersModal } from './AddMembersModal';
import MessageArea from './MessageArea';
import MessageInputArea from './MessageInputArea';
import ServerSideBar from './ServerSideBar';
import ChannelHeader from './ChannelHeader';
import MembersSidebar from './MembersSidebar';
import ServerLandingPage from './ServerLandingPage';
import socket from '@/utils/socketClient';
export type ServerRole = 'owner' | 'admin' | 'member' | 'guest';
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

export interface ServerInvite {
    inviteId: string;
    serverId: string;
    code: string;
    expiresAt?: Date;
    maxUses?: number;
    uses: number;
    revoked: boolean;
    createdAt: Date;
    creator: {
        firstName: string;
        lastName: string;
        email: string;
    }
    redempions: {
        redemtionId: string;
        user: {
            firstName: string;
            lastName: string;
            email: string;
        }
        redeemedAt: string
    }[]
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
    const [activeView, setActiveView] = useState<'chat' | 'invites' | 'files' | "">("");
    const [selectedLobby, setSelectedLobby] = useState<string>('');

    const [showMembers, setShowMembers] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const params = useParams()
    const serverId = params.server_id as string
    const { setUser, user } = useUser()
    const currentUser = user
    const [serverData, setServerData] = useState<any>()
    const [showCreateLobbyModal, setShowCreateLobbyModal] = useState(false);
    const [lobbies, setLobbies] = useState<any>()
    const [lobbyData, setLobbyData] = useState<any>()
    const [isOpen, setOpen] = useState(false);
    const [selectedLobbyName, setSelectedLobbyName] = useState<string>('')
    // get the user data from the local storage
    useEffect(() => {
        getUserData().then(user => setUser(user))
    }, [])
    // global states
    const { getData, setData } = useGlobal()
    // invite apis
    const [serverInvites, setServerInviteData] = useState<ServerInvite[]>([])
    const loadLobby = getData('loadLobby')
    const onRevoke = async (inviteId: string) => {
        const revoke = await api.post(`/invite/revokeInvite/${inviteId}`)
        if (revoke.ok) {
            setData('loadInvite', true)
        }
    }
    useEffect(() => {
        api.get(`/server/${serverId}/invites`).then(data => setServerInviteData(data))
        setData('loadInvite', false)
    }, [getData('loadInvite')])


    // lobby apis and getting some server data

    useEffect(() => {

        const fetchLobbyData = () => {
            api.get(`/getLobbyByLobbyId/${selectedLobby}`).then(data => setLobbyData(data))
        }

        if (selectedLobby != '') {
            fetchLobbyData()
        }
    }, [selectedLobby, loadLobby])
    useEffect(() => {
        const fetchLobbies = () => {
            api.get(`/getServerLobbiesByServerId/${serverId}`).then(data => setLobbies(data.lobbies))
        }
        if (serverId) {
            fetchLobbies()
            setData('loadLobby', false)
        }
    }, [loadLobby])
    const handleCreateLobby = async (lobbyData: { lobbyName: string; isPrivate: boolean, serverId: string, creatorId: string | null | undefined }) => {
        try {
            const response = await api.post(`/createLobby`, lobbyData);
            if (response.ok) {
                alert('lobby created')
                setData('loadLobby', true)
                setShowCreateLobbyModal(false);


            }
        } catch (error) {
            console.error('Failed to create lobby:', error);
        }
    };

    const handleDeleteLobby = async (lobbyId: string) => {
        try {
            const result = await api.delete(`/deleteLobbyByLobbyId/${lobbyId}`)
            if (result.ok) {
                alert('lobby deleted successfully')
                setData('loadLobby', true)
                setConfirmModalOpen(false)
            }
            else {
                alert(result.message)
            }
        } catch (err: any) {
            console.log(err.message)
        }
    };

    const handleAddingMembersToLobby = async (data: { userIds: string[]; role: string }) => {
        console.log("Selected users and role:", data);
        try {
            const result = await api.post(`/addMultipleLobbyMembers/${selectedLobby}/members`, data)
            if (result.ok) {
                alert('members are addeed')
                setOpen(false)
                setData('loadLobby', true)
            }
        } catch (err: any) {
            console.log(err.message)
        }


    };



    // server api
    useEffect(() => {
        if (serverId) {
            api.get(`/getServerByServerId/${serverId}`).then(data => setServerData(data.data))
        }
    }, [serverId])

    useEffect(() => {
        if (selectedLobby == '') {
            setLobbyData(serverData)

        }
    }, [selectedLobby, serverData])


    // websockets for chatting
    // useEffect(() => {
    //     if (user?.userId && serverId) {
    //         socket.emit("join_user_lobbies", {
    //             userId: user.userId,
    //             serverId: serverId,
    //         });

    //         const handleJoined = (arg: any) => {
    //             console.log(arg);
    //         };

    //         socket.on("joined_lobbies", handleJoined);

    //         return () => {
    //             socket.off("joined_lobbies", handleJoined);
    //         };
    //     }
    // }, [user?.userId, serverId]);

    const currentServer: Server = serverData
    const lobbyMembers: ServerMembership[] = lobbyData?.members

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





    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
    };



    const renderChat = () => {
        const lobbyChats = chats.filter(c => c.lobbyId === selectedLobby);

        return (
            <>


                {/* Messages Area */}
                <MessageArea lobbyChats={lobbyChats} selectedLobbyName={selectedLobbyName} getInitials={getInitials} userId={user?.userId} selectedLobby={selectedLobby} serverId={serverId}></MessageArea>

                {/* Message Input */}
                <MessageInputArea selectedLobbyName={selectedLobbyName} serverId={serverId} lobbyId={selectedLobby} sentBy={user?.userId}></MessageInputArea>
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
                        {serverInvites.map((invite) => (
                            <ServerInviteCards key={invite.inviteId} invite={invite} onRevoke={onRevoke}>

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

    const currentLobby = lobbies?.find((l: any) => l.lobbyId === selectedLobby);

    return (
        <div className="flex h-screen bg-primary text-primary">
            {showCreateLobbyModal && (
                <CreateLobbyModal
                    creatorId={user?.userId}
                    serverId={serverId}
                    onClose={() => setShowCreateLobbyModal(false)}
                    onCreateLobby={handleCreateLobby}
                />
            )}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                title="Delete Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => handleDeleteLobby(selectedLobby)}
                onCancel={() => setConfirmModalOpen(false)}
            />

            <AddMembersModal
                isOpen={isOpen}
                users={serverData?.members}
                existingMemberIds={lobbyData?.members} // Alice is already a member
                onAdd={handleAddingMembersToLobby}
                onCancel={() => setOpen(false)}
            />

            {/* Channel Sidebar */}
            <ServerSideBar
                setActiveView={setActiveView}
                activeView={activeView}
                currentServer={currentServer}
                setShowCreateLobbyModal={setShowCreateLobbyModal}
                setSelectedLobby={setSelectedLobby}
                lobbies={lobbies}
                setSelectedLobbyName={setSelectedLobbyName}
                selectedLobby={selectedLobby}
                setConfirmModalOpen={setConfirmModalOpen}
                setOpen={setOpen}
                currentUser={currentUser}
                getInitials={getInitials}
            ></ServerSideBar>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Channel Header */}
                <ChannelHeader
                    activeView={activeView}
                    currentLobby={currentLobby}
                    lobbyMembers={lobbyMembers}
                    setShowMembers={setShowMembers}
                    showMembers={showMembers}
                ></ChannelHeader>

                {/* Content */}
                {activeView === '' && <ServerLandingPage onCreateLobby={setShowCreateLobbyModal}></ServerLandingPage>}
                {activeView === 'chat' && renderChat()}
                {activeView === 'invites' && renderInvites()}
                {activeView === 'files' && renderFiles()}
            </div>

            {/* Members Sidebar */}
            {showMembers && activeView === 'chat' && (
                <MembersSidebar
                    selectedLobby={selectedLobby}
                    selectedLobbyName={selectedLobbyName}
                    lobbyMembers={lobbyMembers}
                    getInitials={getInitials}
                ></MembersSidebar>
            )}
        </div>
    );
};

export default MainServerInterface;