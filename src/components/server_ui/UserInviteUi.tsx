'use client';
import React, { useState } from 'react';
import { Search, Check, X, UserPlus } from 'lucide-react';
import { UserInvite } from '@/app/types/serverTypes';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserInviteUiProps {
  serverId: string;
  userId: string | undefined;
}

const UserInviteUi: React.FC<UserInviteUiProps> = ({ serverId, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Simulated current user info ---
  const currentUser: User = {
    userId: userId || 'u1',
    firstName: 'Ali',
    lastName: 'Ashraf',
    email: 'ali@example.com',
  };

  // --- Search Users ---
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return setSearchResults([]);
    setLoading(true);
    setTimeout(() => {
      const mockUsers: User[] = [
        { userId: 'u2', firstName: 'Sara', lastName: 'Khan', email: 'sara@example.com' },
        { userId: 'u3', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        { userId: 'u4', firstName: 'Lina', lastName: 'Chowdhury', email: 'lina@example.com' },
      ];
      const filtered = mockUsers.filter(u =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setLoading(false);
    }, 400);
  };

  // --- Send Invite ---
  const sendInvite = (user: User) => {
    const newInvite: any = {
      inviteId: Math.random().toString(),
      invitedUserId: user.userId,
      invitedBy: currentUser.userId,
      status: 'pending',
      serverId: serverId,
      createdAt: new Date(),
    };
    setInvites(prev => [...prev, newInvite]);
  };

  // --- Accept / Reject ---
  const handleInviteAction = (inviteId: string, action: 'accept' | 'reject') => {
    setInvites(prev =>
      prev.map(inv =>
        inv.inviteId === inviteId
          ? { ...inv, status: action === 'accept' ? 'accepted' : 'rejected' }
          : inv
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">User Invites</h2>
          <p className="text-sm text-secondary mt-1">
            Invite users directly to this server
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-card text-primary placeholder:text-secondary border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition"
        />
        <Search className="absolute right-3 top-2.5 text-secondary w-5 h-5" />
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="bg-card border border-border rounded-xl p-3 mb-8">
          {loading ? (
            <p className="text-secondary">Searching...</p>
          ) : searchResults.length ? (
            searchResults.map((user) => (
              <div
                key={user.userId}
                className="flex justify-between items-center border-b border-border py-2 last:border-0"
              >
                <div>
                  <p className="font-semibold text-primary">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-secondary">{user.email}</p>
                </div>
                <button
                  onClick={() => sendInvite(user)}
                  className="btn-primary flex items-center gap-2 px-3 py-1 rounded-lg text-sm"
                >
                  <UserPlus className="w-4 h-4" /> Invite
                </button>
              </div>
            ))
          ) : (
            <p className="text-secondary">No users found.</p>
          )}
        </div>
      )}

      {/* Invites Section */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
          Sent Invites
        </h3>
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          {invites.length === 0 ? (
            <p className="text-secondary">No invites yet.</p>
          ) : (
            invites.map((invite) => (
              <div
                key={invite.inviteId}
                className="flex justify-between items-center border-b border-border pb-2 last:border-0"
              >
                <div>
                  <p className="font-semibold text-primary">
                    {invite.invitedUser.firstName} {invite.invitedUser.lastName}{' '}
                    <span className="text-secondary text-sm">({invite.status})</span>
                  </p>
                  <p className="text-sm text-secondary">
                    Invited by {invite.invitedBy.firstName} {invite.invitedBy.lastName}
                  </p>
                </div>
                {invite.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInviteAction(invite.inviteId, 'accept')}
                      className="bg-green-600 hover:bg-green-700 rounded-lg p-1"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleInviteAction(invite.inviteId, 'reject')}
                      className="bg-red-600 hover:bg-red-700 rounded-lg p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInviteUi;
