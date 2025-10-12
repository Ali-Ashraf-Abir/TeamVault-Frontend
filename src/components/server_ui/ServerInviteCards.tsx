import { useState, useRef, useEffect } from "react";
import { Calendar, Copy, MoreVertical, Users, X } from "lucide-react";
import { ServerInvite } from "@/app/types/serverTypes";


interface Redemption {
    redemptionId: string;
    userId: string;
    redeemedAt: string;
    user: any;
}

interface Creator {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface Invite {
    inviteId: string;
    code: string;
    revoked: boolean;
    uses: number;
    maxUses?: number | null;
    expiresAt?: string | null;
    creator: Creator;
    redempions: Redemption[];
}

interface Props {
    invite: ServerInvite;
    onRevoke?: (inviteId: string) => void; // optional callback to revoke invite
}

export default function ServerInviteCards({ invite, onRevoke }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [linkCopied, setLinkCopied] = useState(false)
    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const copyInviteLink = (code: string) => {
        const link = `${window.location.origin}/invite/${code}`;
        navigator.clipboard.writeText(link);
        setLinkCopied(true)
    };

    const handleRevoke = () => {
        if (onRevoke) onRevoke(invite.inviteId);
        setIsDropdownOpen(false);
    };

    const handleSeeRedemptions = () => {
        setIsModalOpen(true);
        setIsDropdownOpen(false);
    };

    return (
        <>
            {linkCopied && <div className="text-green-600">Invite Link Copied to Clipboard</div>}
            <div key={invite.inviteId} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <code className="text-lg font-mono font-semibold text-primary bg-accent px-3 py-1 rounded">
                                {invite.code}
                            </code>
                            {invite.revoked && (
                                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                                    Revoked
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-secondary">
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {invite.uses} {invite.maxUses ? `/ ${invite.maxUses}` : ""} uses
                            </span>
                            {invite.expiresAt ? (
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Expires{" "}
                                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
                                        new Date(invite.expiresAt)
                                    )}
                                </span>
                            ) : (
                                <span className="text-muted">Never expires</span>
                            )}
                        </div>
                    </div>
                    <div className="relative flex gap-2">
                        <button
                            onClick={() => copyInviteLink(invite.code)}
                            className="p-2 hover:bg-accent rounded transition-colors"
                            title="Copy invite link"
                        >
                            <Copy className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="p-2 hover:bg-accent rounded transition-colors"
                            title="Options"
                        >
                            <MoreVertical className="w-4 h-4 text-secondary" />
                        </button>

                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 top-full mt-1 bg-bg-primary border border-border-accent rounded shadow-lg w-40 z-10"
                            >
                                <button
                                    onClick={handleSeeRedemptions}
                                    className="w-full text-left px-4 py-2 hover:bg-accent transition-colors"
                                >
                                    See Redemptions
                                </button>
                                <button
                                    onClick={handleRevoke}
                                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-colors"
                                >
                                    Revoke Invite
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Redemptions */}
            {/* Modal for Redemptions */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-primary rounded-lg p-6 w-full max-w-lg relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 p-1 hover:bg-accent rounded"
                        >
                            <X className="w-5 h-5 text-secondary" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">
                            Redemptions for {invite.code}
                        </h2>

                        <div className="mb-4 text-sm text-secondary">
                            <strong>Invite Creator:</strong>{" "}
                            {invite.creator.firstName} {invite.creator.lastName} ({invite.creator.email})
                        </div>

                        {invite.redempions.length === 0 ? (
                            <p className="text-muted">No one has used this invite yet</p>
                        ) : (
                            <ul className="max-h-60 overflow-y-auto">
                                {invite.redempions.map((r) => (
                                    <li
                                        key={r.redemtionId}
                                        className="flex justify-between border-b border-border-accent py-1 text-sm text-secondary"
                                    >
                                        <span>
                                            {r.user
                                                ? `${r.user.firstName} ${r.user.lastName} (${r.user.email})`
                                                : "Unknown User"}
                                        </span>
                                        <span>
                                            {new Intl.DateTimeFormat("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }).format(new Date(r.redeemedAt))}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

        </>
    );
}
