import { api } from "@/api/api";

import { Hash, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../providers/SocketProvider";

export default function MessageArea({ selectedLobbyName, getInitials, userId,selectedLobby,serverId }: any) {
    const [lobbyChats, setLobbyChats] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const socket = useSocket()
    useEffect(()=>{

        if(selectedLobby){
            api.get(`/chats/${selectedLobby}`).then(data=> setLobbyChats(data.data))
        }
    },[selectedLobby])

    useEffect(() => {
        // Listen for new messages
        const handleNewMessage = (arg: any) => {
            console.log("Received new message:", arg);
            setLobbyChats((prev) => [...prev, arg]);
        };

        socket.on("new_message", handleNewMessage);
        socket.emit("join_user_lobbies",{
            userId,serverId
        })
        return () => {
            socket.off("new_message", handleNewMessage);
        };
    }, []);

    const formatTime = (date: Date | string) => {
        const d = new Date(date);
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })?.format(d);
    };
    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [lobbyChats]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {lobbyChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <Hash className="w-16 h-16 text-muted mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">
                        Welcome to #{selectedLobbyName}
                    </h3>
                    <p className="text-secondary">This is the beginning of the conversation.</p>
                </div>
            ) : (
                lobbyChats.map((chat: any) => {
                    const isCurrentUser = chat?.sender?.userId === userId;

                    return (
                        <div
                            key={chat.chatId}
                            className={`flex gap-3 p-2 transition-colors ${isCurrentUser ? "justify-end" : "justify-start"
                                }`}
                        >
                            {/* Avatar on the left for others */}
                            {!isCurrentUser && (
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {getInitials(chat?.sender?.firstName, chat?.sender?.lastName)}
                                    </div>
                                </div>
                            )}

                            {/* Message bubble */}
                            <div
                                className={`p-2 rounded-lg max-w-[60%] break-words ${isCurrentUser ? "bg-accent text-white text-right" : "bg-secondary text-left"
                                    }`}
                            >
                                <div className="flex items-center gap-2 justify-between">
                                    {!isCurrentUser && (
                                        <span className="font-semibold text-primary">
                                            {chat?.sender?.firstName} {chat?.sender?.lastName}
                                        </span>
                                    )}
                                    {isCurrentUser && (
                                        <span className="font-semibold text-primary">
                                            You
                                        </span>
                                    )}
                                    <span className="text-xs text-muted">{chat?.sentAt && formatTime(chat?.sentAt)}</span>
                                    {chat?.editedAt && <span className="text-xs text-muted italic">(edited)</span>}
                                </div>
                                <p className="mt-1">{chat?.message}</p>
                            </div>

                            {/* Avatar on the right for current user */}
                            {isCurrentUser && (
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {getInitials(chat?.sender?.firstName, chat?.sender?.lastName)}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}