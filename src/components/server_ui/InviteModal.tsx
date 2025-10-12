'use client';

import { api } from "@/api/api";
import { useGlobal, useUser } from "@/context/GlobalContext";
import { X } from "lucide-react";
import { useState } from "react";

interface InviteModalProps {
  setShowInviteModal: (show: boolean) => void;
  serverId: string;
  userId:string | null | undefined;
}

interface InviteFormData {
  expiration: string;
  maxUses: string;
}

export default function InviteModal({ setShowInviteModal, serverId,userId }: InviteModalProps) {
  const [formData, setFormData] = useState<InviteFormData>({
    expiration: 'never',
    maxUses: 'no-limit'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {setData}=useGlobal()
  const handleExpirationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, expiration: e.target.value }));
  };

  const handleMaxUsesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, maxUses: e.target.value }));
  };

  // Convert expiration to actual date/time
  const getExpirationDate = (expiration: string): Date | null => {
    const now = new Date();
    switch (expiration) {
      case '30-minutes':
        return new Date(now.getTime() + 30 * 60 * 1000);
      case '1-hour':
        return new Date(now.getTime() + 60 * 60 * 1000);
      case '6-hours':
        return new Date(now.getTime() + 6 * 60 * 60 * 1000);
      case '12-hours':
        return new Date(now.getTime() + 12 * 60 * 60 * 1000);
      case '1-day':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case '7-days':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      default:
        return null;
    }
  };

  // Convert max uses to number
  const getMaxUses = (maxUses: string): number | null => {
    switch (maxUses) {
      case '1-use':
        return 1;
      case '5-uses':
        return 5;
      case '10-uses':
        return 10;
      case '25-uses':
        return 25;
      case '50-uses':
        return 50;
      case '100-uses':
        return 100;
      default:
        return null;
    }
  };

  const handleGenerateInvite = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare the payload
      const payload = {
        serverId,
        createdBy:userId || '',
        expiresAt: getExpirationDate(formData.expiration),
        maxUses: getMaxUses(formData.maxUses),
      };



      // Simulate API call
      const response =await api.post('/invite/createInvite',payload)

      if (!response.ok) {
        throw new Error('Failed to create invite');
      }


    
      setData('loadInvite',true)
      // Close modal on success
      setShowInviteModal(false);

      // Optional: Show success message or copy invite code
      if (response.invite.code) {
        const inviteLink = `${window.location.origin}/invite/${response.invite.code}`;
        await navigator.clipboard.writeText(inviteLink);
        alert(`Invite link copied to clipboard: ${inviteLink}`);
      }

    } catch (err) {
      console.error('Error creating invite:', err);
      setError(err instanceof Error ? err.message : 'Failed to create invite');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
      onClick={() => setShowInviteModal(false)}
    >
      <div 
        className="bg-primary rounded-lg p-6 max-w-md w-full mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary">Create Invite Link</h3>
          <button 
            onClick={() => setShowInviteModal(false)} 
            className="p-1 hover:bg-accent rounded"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Expiration
            </label>
            <select 
              value={formData.expiration}
              onChange={handleExpirationChange}
              className="w-full bg-accent border border-primary rounded px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            >
              <option value="never">Never</option>
              <option value="30-minutes">30 minutes</option>
              <option value="1-hour">1 hour</option>
              <option value="6-hours">6 hours</option>
              <option value="12-hours">12 hours</option>
              <option value="1-day">1 day</option>
              <option value="7-days">7 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Max uses
            </label>
            <select 
              value={formData.maxUses}
              onChange={handleMaxUsesChange}
              className="w-full bg-accent border border-primary rounded px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            >
              <option value="no-limit">No limit</option>
              <option value="1-use">1 use</option>
              <option value="5-uses">5 uses</option>
              <option value="10-uses">10 uses</option>
              <option value="25-uses">25 uses</option>
              <option value="50-uses">50 uses</option>
              <option value="100-uses">100 uses</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => setShowInviteModal(false)} 
              className="btn-secondary flex-1"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={handleGenerateInvite}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}