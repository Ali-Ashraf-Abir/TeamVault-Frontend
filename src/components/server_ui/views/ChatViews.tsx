import React from 'react';
import MessageArea from '../MessageArea';
import MessageInputArea from '../MessageInputArea';

interface ChatViewProps {
  selectedLobby: string;
  selectedLobbyName: string;
  serverId: string;
  userId: string | undefined;
  getInitials: (firstName: string, lastName: string) => string;
}

const ChatView: React.FC<ChatViewProps> = ({
  selectedLobby,
  selectedLobbyName,
  serverId,
  userId,
  getInitials
}) => (
  <>
    <MessageArea
      selectedLobbyName={selectedLobbyName}
      getInitials={getInitials}
      userId={userId}
      selectedLobby={selectedLobby}
      serverId={serverId}
    />
    <MessageInputArea
      selectedLobbyName={selectedLobbyName}
      serverId={serverId}
      lobbyId={selectedLobby}
      sentBy={userId}
    />
  </>
);

export default ChatView;
