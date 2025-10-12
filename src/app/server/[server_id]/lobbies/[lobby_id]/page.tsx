'use client'
import { SocketProvider } from "@/components/providers/SocketProvider";
import MainServerInterface from "@/components/server_ui/MainServerInterface";
import { useGlobal } from "@/context/GlobalContext";
import { getUserData } from "@/utils/userHandler";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const params = useParams()
    const serverId = params.server_id as string
    const [user, setUser] = useState<any>()


    useEffect(() => {
        async function getUser() {
            const user = await getUserData()
            setUser(user)
        }
        
        getUser()
    }, [])

    return (
        <div>
            <SocketProvider serverId={serverId} user={user}>
                <MainServerInterface/>
            </SocketProvider>

        </div>
    );
}