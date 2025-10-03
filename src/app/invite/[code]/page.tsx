"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/api/api"
import { getUserData } from "@/utils/userHandler"

export default function InvitePage({ params }: { params: { code: string } }) {
    const { code } = params
    const router = useRouter()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState<any>()
    useEffect(() => {
        getUserData().then(data => setUser(data))
    }, [])
    console.log(user)
    useEffect(() => {
        async function redeemInvite() {
            try {
                // Call your backend endpoint to redeem the invite
                const res = await api.post(`/invite/redeemInvite/${code}`, { userId: user?.userId })


                if (res.ok) {
                    setStatus("success")
                    setMessage("You’ve successfully joined the server! Redirecting...")
                    // Redirect to the server page
                    setTimeout(() => {
                        router.push(`/server/${res?.redemption?.invite?.serverId}`)
                    }, 1500)
                } else {
                    setStatus("error")
                    setMessage(res.error || "Invalid or expired invite.")
                }
            } catch (err:any) {
                console.log(err)
                setStatus("error")
                setMessage(err?.data?.error || "Something went wrong. Please try again.")
            }
        }

        if (user) {
            redeemInvite()
        }
        else{
            setStatus('error')
            setMessage("Log in with your account first to accept invite!")
        }
    }, [code, router, user])

    return (
        <div className="h-screen flex items-center justify-center bg-primary text-primary">
            <div className="card p-8 w-full max-w-md text-center">
                {status === "loading" && (
                    <p className="text-secondary animate-pulse">Checking invite...</p>
                )}
                {status === "success" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">🎉 Joined!</h2>
                        <p className="text-secondary">{message}</p>
                    </div>
                )}
                {status === "error" && (
                    <div>
                        <h2 className="text-xl font-semibold text-error-500 mb-2">Invite Failed</h2>
                        <p className="text-secondary">{message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
