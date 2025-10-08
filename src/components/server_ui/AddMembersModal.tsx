import React, { useState, useEffect } from "react";

interface AddMembersModalProps {
  isOpen: boolean;
  users: any; // list of users you can add
  existingMemberIds: any; // already in server/lobby
  onAdd: (payload: { userIds: string[]; role: string }) => void;
  onCancel: () => void;
}

export const AddMembersModal: React.FC<AddMembersModalProps> = ({
  isOpen,
  users,
  existingMemberIds,
  onAdd,
  onCancel,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [role, setRole] = useState("member");

  useEffect(() => {
    if (!isOpen) {
      setSelectedIds([]);
      setRole("member");
    }
  }, [isOpen]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    onAdd({
      userIds: selectedIds,
      role,
    });
    setSelectedIds([]);
    setRole("member");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="card w-11/12 max-w-lg p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Add Members</h2>
        <p className="text-secondary mb-4">
          Select users to add to this lobby.
        </p>

        <div className="max-h-80 overflow-y-auto mb-4 border border-border-primary rounded-md p-2">
          {users?.map((user: any) => {
            const userId = user?.user?.userId;
            const isMember = existingMemberIds?.some(
              (existing: any) => existing.userId === userId
            );
            const isSelected = selectedIds.includes(userId);

            return (
              <div
                key={userId}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-accent ${isMember ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => !isMember && toggleSelect(userId)}
              >
                <div>
                  <p className="font-medium text-primary">
                    {user?.user?.firstName} {user?.user?.lastName}
                  </p>
                  <p className="text-sm text-muted">{user?.user?.email}</p>
                </div>
                {!isMember && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4 accent-primary-500"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Single dropdown for role selection */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-primary">
            Assign Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-border-primary rounded-md p-2 text-sm bg-primary text-primary"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0}
          >
            Add {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
