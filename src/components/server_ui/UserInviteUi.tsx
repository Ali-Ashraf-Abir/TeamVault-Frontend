'use client';
import React, { useEffect, useState } from 'react';
import { Search, Check, X, UserPlus, Trash2 } from 'lucide-react';
import { api } from '@/api/api';
import socket from '@/utils/socketClient';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserInvite {
  inviteId: string;
  serverId: string;
  invitedBy: string;
  invitedUserId: string;
  reciever: {
    firstName: string;
    lastName: string;
  }
  invitedUser: {
    firstName: string;
    lastName: string;
    userId: string
  }
  sender: {
    firstName: string;
    lastName: string;
  }
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface UserInviteUiProps {
  serverId: string;
  user: User; // current user 
  userId: string | undefined;
}

const UserInviteUi: React.FC<UserInviteUiProps> = ({ serverId, user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [sentInvites, setSentInvites] = useState<UserInvite[]>([]);
  const [receivedInvites, setReceivedInvites] = useState<UserInvite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch sent and received invites ---
  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      const [sent] = await Promise.all([
        api.get(`/userInvite/sent/${user.userId}`),
        // api.get(`/userInvite/received/${user.userId}`)
      ]);
      setSentInvites(sent);

    } catch (err) {
      console.error('Error fetching invites:', err);
      setError('Failed to fetch invites.');
    } finally {
      setLoading(false);
    }
  };

  // --- Search Users ---
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchResult(null);
    setError(null);
    setLoading(true);
    try {
      const res = await api.get(`/user/email/${searchQuery.toLowerCase()}`);
      setSearchResult(res);
    } catch {
      setError('No user found with that email.');
    } finally {
      setLoading(false);
    }
  };

  // --- Send Invite ---
  const sendInvite = async (targetUser: User) => {
    try {
      const payload = {
        serverId,
        invitedBy: user.userId,
        invitedUserId: targetUser.userId
      };
      const res = await api.post('/userInvite/send', payload);
      setSentInvites(prev => [...prev, res]);
      setSearchResult(null);
      setSearchQuery('');
      socket.emit("invite_sent", { sentId: targetUser.userId })
    } catch (err) {
      console.error('Error sending invite:', err);
      setError('Failed to send invite.');
    }
  };


  // --- Cancel Invite (Sent Only) ---
  const cancelInvite = async (inviteId: string, targetUser: string) => {
    try {
      await api.delete(`/userInvite/cancel/${inviteId}`, { userId: user?.userId });
      setSentInvites(prev => prev.filter(inv => inv.inviteId !== inviteId));
      socket.emit("invite_sent", { sentId: targetUser })
    } catch (err) {
      console.error('Error canceling invite:', err);
      setError('Failed to cancel invite.');
    }
  };
  console.log(receivedInvites, sentInvites)

  return (
    <div className="max-w-4xl mx-auto mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">User Invites</h2>
          <p className="text-sm text-secondary mt-1">
            Manage and send server invitations.
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search users by email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-card text-black placeholder:text-secondary border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition"
        />
        <Search
          onClick={handleSearch}
          className="absolute cursor-pointer right-3 top-2.5 text-secondary w-5 h-5"
        />
      </div>

      {/* Search Result */}
      {(searchResult || error) && (
        <div className="bg-card border border-border rounded-xl p-3 mb-8">
          {loading ? (
            <p className="text-secondary">Searching...</p>
          ) : searchResult ? (
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold text-primary">
                  {searchResult.firstName} {searchResult.lastName}
                </p>
                <p className="text-sm text-secondary">{searchResult.email}</p>
              </div>
              <button
                onClick={() => sendInvite(searchResult)}
                className="btn-primary flex items-center gap-2 px-3 py-1 rounded-lg text-sm"
              >
                <UserPlus className="w-4 h-4" /> Invite
              </button>
            </div>
          ) : (
            <p className="text-secondary">{error}</p>
          )}
        </div>
      )}



      {/* Sent Invites */}
      <section>
        <h3 className="text-lg font-semibold text-primary mb-3">Sent Invites</h3>
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          {sentInvites?.length === 0 ? (
            <p className="text-secondary">No invites sent yet.</p>
          ) : (
            sentInvites?.map((invite) => (
              <div
                key={invite?.inviteId}
                className="flex justify-between items-center border-b border-border pb-2 last:border-0"
              >
                <p className="font-semibold text-primary">
                  To: {invite?.invitedUser?.firstName}{' '}
                  <span className="text-secondary text-sm ml-2">
                    ({invite?.status})
                  </span>
                </p>
                {invite?.status === 'pending' && (
                  <button
                    onClick={() => cancelInvite(invite?.inviteId, invite?.invitedUser?.userId)}
                    className="bg-gray-700 hover:bg-gray-800 rounded-lg p-1"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default UserInviteUi;
