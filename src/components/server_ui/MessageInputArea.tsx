'use client';

import { Paperclip, Plus, Send, Smile } from "lucide-react";
import { useState } from "react";
import { useSocket } from "../providers/SocketProvider";

export default function MessageInputArea({ selectedLobbyName, serverId, lobbyId, sentBy }: any) {
  const [message, setMessage] = useState('');
  const socket = useSocket()
  const handleMessageSent = (serverId: string, lobbyId: string, sentBy: string, message: string) => {
    if (!message.trim()) return; // don't send empty messages
    socket.emit("send_message", {
      serverId,
      lobbyId,
      sentBy,
      message,
    });
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleMessageSent(serverId, lobbyId, sentBy, message);
    }
  };

  return (
    <div className="p-4 border-t border-primary">
      <div className="flex items-center gap-2 bg-accent rounded-lg p-2 border border-primary focus-within:border-accent">
        <button className="p-2 hover:bg-secondary rounded transition-colors">
          <Plus className="w-5 h-5 text-secondary" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${selectedLobbyName}`}
          className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-muted"
        />
        <button className="p-2 hover:bg-secondary rounded transition-colors">
          <Smile className="w-5 h-5 text-secondary" />
        </button>
        <button className="p-2 hover:bg-secondary rounded transition-colors">
          <Paperclip className="w-5 h-5 text-secondary" />
        </button>
        <button onClick={() => handleMessageSent(serverId, lobbyId, sentBy, message)} className="p-2 bg-primary-600 hover:bg-primary-700 rounded transition-colors">
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
