'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useUser } from '@/context/GlobalContext';

// Import sub-components
import ServerSideBar from './ServerSideBar';
import ChannelHeader from './ChannelHeader';
import MembersSidebar from './MembersSidebar';
import ServerLandingPage from './ServerLandingPage';

import FilesView from './views/FilesView';
import CreateLobbyModal from './CreateLobbyModal';
import { ConfirmModal } from '../modals/ConfirmModal';
import { AddMembersModal } from './AddMembersModal';
import { useServer } from '../hooks/useServer';
import { useLobbies } from '../hooks/useLobbies';
import { useLobbyDetails } from '../hooks/useLobbyDetails';
import { useServerInvites } from '../hooks/useServerInvites';
import ChatView from './views/ChatViews';
import InvitesView from './views/InvitesViews';
import { getUserData } from '@/utils/userHandler';
import { useGlobalSocketListeners } from '@/context/SocketContext';
import socket from '@/utils/socketClient';


const MainServerInterface: React.FC = () => {
  const params = useParams();
  const serverId = params.server_id as string;
  const [user,setUser]=useState<any>()

  useEffect(()=>{
    async function getUser(){
        const user = await getUserData()
        setUser(user)
    } 
    getUser()
  },[])
  
  // View state
  const [activeView, setActiveView] = useState<'chat' | 'invites' | 'files' | ''>('');
  const [showMembers, setShowMembers] = useState(true);

  // Modal state
  const [showCreateLobbyModal, setShowCreateLobbyModal] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isAddMembersOpen, setAddMembersOpen] = useState(false);

  // Custom hooks for data management
  const { serverData } = useServer(serverId);
  const { lobbies, selectedLobby, setSelectedLobby, createLobby, deleteLobby } = 
    useLobbies(serverId, user?.userId);
  const { lobbyData, addMembers } = useLobbyDetails(selectedLobby, serverData);
  const { invites, revokeInvite } = useServerInvites(serverId);

  // Derived state
  const [selectedLobbyName, setSelectedLobbyName] = useState('');
  const currentLobby = lobbies?.find((l: any) => l.lobbyId === selectedLobby);
  const lobbyMembers = lobbyData?.members;
  // notifications
  const {notifications}=useGlobalSocketListeners()

  useEffect(()=>{
    console.log(notifications)
  },[notifications])
  // Handlers
  const handleCreateLobby = async (data: any) => {
    const success = await createLobby({
      ...data,
      serverId,
      creatorId: user?.userId
    });
    if (success) {
      alert('Lobby created');
      setShowCreateLobbyModal(false);
    }
  };

  const handleDeleteLobby = async () => {
    try {
      await deleteLobby(selectedLobby);
      alert('Lobby deleted successfully');
      setConfirmModalOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddMembers = async (data: { userIds: string[]; role: string }) => {
    const success = await addMembers(data);
    if (success) {
      alert('Members added');
      setAddMembersOpen(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex h-screen bg-primary text-primary">
      {/* Modals */}
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
        title="Delete Lobby"
        message="Are you sure you want to delete this lobby? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteLobby}
        onCancel={() => setConfirmModalOpen(false)}
      />

      <AddMembersModal
        isOpen={isAddMembersOpen}
        users={serverData?.members}
        existingMemberIds={lobbyData?.members}
        onAdd={handleAddMembers}
        onCancel={() => setAddMembersOpen(false)}
      />

      {/* Sidebar */}
      <ServerSideBar
        setActiveView={setActiveView}
        activeView={activeView}
        currentServer={serverData}
        setShowCreateLobbyModal={setShowCreateLobbyModal}
        setSelectedLobby={setSelectedLobby}
        lobbies={lobbies}
        setSelectedLobbyName={setSelectedLobbyName}
        selectedLobby={selectedLobby}
        setConfirmModalOpen={setConfirmModalOpen}
        setOpen={setAddMembersOpen}
        currentUser={user}
        getInitials={getInitials}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ChannelHeader
          activeView={activeView}
          currentLobby={currentLobby}
          lobbyMembers={lobbyMembers}
          setShowMembers={setShowMembers}
          user={user}
          showMembers={showMembers}
        />

        {activeView === '' && (
          <ServerLandingPage onCreateLobby={setShowCreateLobbyModal} />
        )}
        {activeView === 'chat' && (
          <ChatView
            selectedLobby={selectedLobby}
            selectedLobbyName={selectedLobbyName}
            serverId={serverId}
            userId={user?.userId}
            getInitials={getInitials}
          />
        )}
        {activeView === 'invites' && (
          <InvitesView
            invites={invites}
            onRevoke={revokeInvite}
            serverId={serverId}
            userId={user?.userId}
          />
        )}
        {activeView === 'files' && <FilesView />}
      </div>

      {/* Members Sidebar */}
      {showMembers && activeView === 'chat' && (
        <MembersSidebar
          selectedLobby={selectedLobby}
          selectedLobbyName={selectedLobbyName}
          lobbyMembers={lobbyMembers}
          getInitials={getInitials}
        />
      )}
    </div>
  );
};

export default MainServerInterface;