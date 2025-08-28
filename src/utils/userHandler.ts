import { api } from "@/api/api";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface JwtPayload {
    sub: string;       // user ID
    exp: number;       // expiration timestamp
    iat?: number;      // issued at
    role?: string;
    userId: string;     // custom claim example
}

export function decodeJwt(token: string): JwtPayload | null {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
}

export async function getUserData() {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) return "no access token found";

    const payload = decodeJwt(accessToken);
    if (!payload?.userId) return "invalid user id";

    try {
        const userData = await api.get(`/user/${payload.userId}`);
        return userData;
    } catch (error) {
        return "invalid user id";
    }
}
