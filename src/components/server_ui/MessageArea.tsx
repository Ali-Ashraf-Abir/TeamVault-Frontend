import { Hash, MoreVertical } from "lucide-react";

export default function MessageArea({ currentLobby, getInitials, lobbyChats }: any) {
    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };
    return (
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
                lobbyChats.map((chat: any) => (
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
    )
}