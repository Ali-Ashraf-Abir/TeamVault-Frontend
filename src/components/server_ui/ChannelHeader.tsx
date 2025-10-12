import { Bell, FolderOpen, Hash, Lock, Pin, Search, UserPlus, Users } from "lucide-react";
import NotificationDropdown from "./NotificationDorpdown";

function ChannelHeader({activeView,currentLobby,lobbyMembers,setShowMembers,showMembers,user}:any) {
    return ( 
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
                                    {lobbyMembers?.length} members
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-2 hover:bg-accent rounded transition-colors" title="Notifications">
                            <NotificationDropdown recipientId={user?.userId} />
                        </div>
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
    );
}

export default ChannelHeader;