import { api } from "@/api/api";
import { useGlobal } from "@/context/GlobalContext";
import { useState } from "react";


interface CreateInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serverId: string;
  onInviteCreated: () => void; // callback to refresh invites list
}

export default function CreateInviteModal({ isOpen, onClose, serverId, onInviteCreated }: CreateInviteModalProps) {
  const [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [maxUses, setMaxUses] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        code: code || undefined, // if empty, backend can auto-generate
        expiresAt: expiresAt || null,
        maxUses: maxUses === "" ? null : maxUses,
        serverId,
      };
      await api.post("/api/invites/create", payload);
      setCode("");
      setExpiresAt("");
      setMaxUses("");
      onInviteCreated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create Invite</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Invite Code (optional)</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Leave blank to auto-generate"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Expiry Date</label>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Max Uses</label>
          <input
            type="number"
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value ? parseInt(e.target.value) : "")}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            min={1}
            placeholder="Unlimited if blank"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}
