import { Crown, Shield } from "lucide-react";
import { ServerRole } from "./MainServerInterface";

function MembersSidebar({ selectedLobby, selectedLobbyName, lobbyMembers, getInitials }:any) {
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
    return (<div className="w-60 bg-secondary border-l border-primary flex flex-col">
        <div className="p-4 border-b border-primary">
            <h3 className="font-semibold text-primary">{selectedLobby == '' ? 'Server' : selectedLobbyName} </h3>
            <h3 className="font-semibold text-primary">Members — {lobbyMembers?.length} </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
            {['owner', 'admin', 'member', 'guest'].map((roleFilter) => {
                const roleMembers = lobbyMembers?.filter((m:any) => m.role === roleFilter);

                if (roleMembers?.length === 0) return null;

                return (
                    <div key={roleFilter} className="mb-4">
                        <div className="px-2 py-1 text-xs font-semibold text-muted uppercase mb-1">
                            {roleFilter} — {roleMembers?.length}
                        </div>
                        {roleMembers?.map((member:any) => (
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
    </div>);
}

export default MembersSidebar;