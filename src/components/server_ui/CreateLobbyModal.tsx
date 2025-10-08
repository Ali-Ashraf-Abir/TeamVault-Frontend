import React, { useState, useRef, useEffect } from 'react';
import { X, Hash, Lock, MoreVertical, UserPlus, Trash2 } from 'lucide-react';

interface CreateLobbyModalProps {
  serverId: string;
  onClose: () => void;
  onCreateLobby: (lobbyData: { lobbyName: string; isPrivate: boolean ,serverId:string,creatorId:string | null | undefined}) => void;
  creatorId:string | null | undefined;
}

interface LobbyDropdownProps {
  lobbyId: string;
  lobbyName: string;
  onAddMembers: () => void;
  onDelete: () => void;
}

const LobbyDropdown: React.FC<LobbyDropdownProps> = ({ lobbyId, lobbyName, onAddMembers, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-secondary/40 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <MoreVertical className="w-4 h-4 text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 bg-sidebar rounded-lg shadow-xl border border-primary z-50 overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddMembers();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-inverse hover:bg-accent transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Add Members</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-red-400 hover:bg-red-950/50 transition-colors border-t border-primary"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete Lobby</span>
          </button>
        </div>
      )}
    </div>
  );
};

const CreateLobbyModal: React.FC<CreateLobbyModalProps> = ({ serverId, onClose, onCreateLobby,creatorId}) => {
  const [lobbyName, setLobbyName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!lobbyName.trim()) {
      setError('Lobby name is required');
      return;
    }

    if (lobbyName.length < 2 || lobbyName.length > 50) {
      setError('Lobby name must be between 2 and 50 characters');
      return;
    }

    const cleanName = lobbyName.trim().toLowerCase().replace(/\s+/g, '-');
    
    onCreateLobby({ lobbyName: cleanName, isPrivate,serverId ,creatorId});

  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="card max-w-md w-full animate-pulse-glow">
        <div className="flex items-center justify-between p-6 border-b border-primary">
          <h2 className="text-xl font-bold text-primary gradient-text">Create Lobby</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Lobby Name
            </label>
            <div className="flex items-center gap-2 bg-accent rounded-lg px-4 py-2 border border-primary focus-within:border-accent transition-all">
              <Hash className="w-4 h-4 text-secondary" />
              <input
                type="text"
                value={lobbyName}
                onChange={(e) => {
                  setLobbyName(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="e.g., general, announcements"
                className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-muted"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {error}
              </p>
            )}
            <p className="text-xs text-muted mt-2">
              Spaces will be replaced with hyphens
            </p>
          </div>

          <div>
            <label className="card flex items-center gap-3 p-4 cursor-pointer hover:shadow-lg transition-all">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-secondary" />
                  <span className="font-semibold text-primary">Private Lobby</span>
                </div>
                <p className="text-xs text-muted mt-1">
                  Only invited members can see and access this lobby
                </p>
              </div>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary flex-1"
            >
              Create Lobby
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLobbyModal;
export { LobbyDropdown };