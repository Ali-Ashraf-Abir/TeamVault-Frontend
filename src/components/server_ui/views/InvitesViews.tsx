import React, { useState } from 'react';
import { Plus, LinkIcon, UserPlus } from 'lucide-react';
import ServerInviteCards from '../ServerInviteCards';
import InviteModal from '../InviteModal';
import { ServerInvite } from '@/app/types/serverTypes';


interface InvitesViewProps {
  invites: ServerInvite[];
  onRevoke: (inviteId: string) => Promise<void>;
  serverId: string;
  userId: string | undefined;
}

const InvitesView: React.FC<InvitesViewProps> = ({
  invites,
  onRevoke,
  serverId,
  userId
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">Server Invites</h2>
            <p className="text-sm text-secondary mt-1">
              Manage invitation links for your server
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Invite
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Invite Links
          </h3>
          <div className="space-y-3">
            {invites.map((invite) => (
              <ServerInviteCards
                key={invite.inviteId}
                invite={invite}
                onRevoke={onRevoke}
              />
            ))}
          </div>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal
          userId={userId}
          setShowInviteModal={setShowInviteModal}
          serverId={serverId}
        />
      )}
    </div>
  );
};

export default InvitesView;