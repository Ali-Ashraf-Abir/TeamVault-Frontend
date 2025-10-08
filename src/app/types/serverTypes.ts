export type ServerRole = 'owner' | 'admin' | 'member' | 'guest';
type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'expired';
export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Server {
    serverId: string;
    serverName: string;
    description: string;
    createdBy: string;
    createdAt: Date;
}

export interface ServerMembership {
    serverId: string;
    userId: string;
    role: ServerRole;
    joinedAt: Date;
    user: User;
}

export interface Lobby {
    lobbyId: string;
    serverId: string;
    lobbyName: string;
    createdAt: Date;
    isPrivate?: boolean;
}

export interface Chat {
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

export interface UserInvite {
    inviteId: string;
    serverId: string;
    invitedBy: string;
    invitedUserId: string;
    status: InviteStatus;
    createdAt: Date;
    sender: User;
}
