
'use client'

import Link from "next/link"

export default function ServerCards ({server}:any) {
    
    return <div key={server.serverId} className="card p-6">
        <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">{server?.serverName?.[0]}</span>
            </div>
            <div>
                <h3 className="font-semibold text-primary">{server?.serverName}</h3>
                <p className="text-sm text-secondary">{server?.members?.length} members</p>
            </div>
        </div>
        <p className="text-secondary text-sm mb-4">{server?.description}</p>
        <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Last message 2 hours ago</span>
            <div className="flex space-x-2">
                <Link href={`/server/${server.serverId}`}><button className="text-xs btn-secondary py-1 px-3">view</button></Link>
            </div>
        </div>
    </div>
}