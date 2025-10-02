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

// export async function getUserData() {
//     const accessToken = Cookies.get("accessToken");
//     if (!accessToken) return "no access token found";

//     const payload = decodeJwt(accessToken);
//     if (!payload?.userId) return "invalid user id";

//     try {
//         const userData = await api.get(`/user/${payload.userId}`);
//         return userData;
//     } catch (error) {
//         return "invalid user id";
//     }
// }


export async function getUserData(): Promise<any | null> {
    try {
        // 1. Check access token in cookies
        const accessToken = Cookies.get("accessToken");

        if (accessToken) {
            // 2. If token exists, get userData from localStorage
            const payload = decodeJwt(accessToken);
            if (!payload?.userId) return "invalid user id";
            const localData = localStorage.getItem("userData");
            if (localData) {
                return JSON.parse(localData);
            }

            // 3. If no local data, fetch from API
            const userData = await api.get(`/user/${payload.userId}`);

            if (!userData) throw new Error("Failed to fetch user data");
            localStorage.setItem("userData", JSON.stringify(userData));
            return userData;
        } else {
            // 4. No token → clear localStorage
            localStorage.removeItem("userData");
            return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        localStorage.removeItem("userData");
        return null;
    }
}