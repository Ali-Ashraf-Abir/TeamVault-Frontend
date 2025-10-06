'use client';
import { Paperclip, Plus, Send, Smile } from "lucide-react";
import { useState } from "react";

export default function MessageInputArea({ currentLobby }: any) {
    const [message, setMessage] = useState('');
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
    )
}