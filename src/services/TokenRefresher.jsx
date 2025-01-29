import { useEffect, useState } from 'react';

const useTokenRefresher = (baseURL) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const accessTokenKey = "accessToken";
    const refreshTokenKey = "refreshToken";

    const getAccessToken = () => {
        return localStorage.getItem(accessTokenKey);
    };

    const getRefreshToken = () => {
        return localStorage.getItem(refreshTokenKey);
    };

    const isAccessTokenExpired = () => {
        const token = getAccessToken();
        if (!token) return true;

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp <= currentTime;
    };

    const refreshAccessToken = async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token missing. Please log in again.");
        }

        const response = await fetch(`${baseURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Unable to refresh token. Please log in again.");
        }

        const data = await response.json();
        console.log(`Refresh Token: ${data.refreshToken}`)
        localStorage.setItem(refreshTokenKey, data.refreshToken);

        return data.refreshToken;
    };

    const handleGlobalClick = async () => {
        if (isAccessTokenExpired()) {
            try {
                setIsRefreshing(true);
                await refreshAccessToken();
                console.log("Token refreshed successfully!");
            } catch (error) {
                console.error("Session expired. Please log in again." + error);
                alert("Session expired. Please log in again.");
                window.location.href = "/notes-app/login"; // Redirige al login si el refresh falla
            } finally {
                setIsRefreshing(false);
            }
        } else {
            console.log("Token is still valid.");
        }
    };

    useEffect(() => {
        const startListening = () => {
            document.addEventListener("click", handleGlobalClick);
        };

        const stopListening = () => {
            document.removeEventListener("click", handleGlobalClick);
        };

        startListening();
        return () => stopListening();
    }, []);

    return {
        isRefreshing,
        startListening: handleGlobalClick,
        stopListening: () => document.removeEventListener("click", handleGlobalClick)
    };
};

export default useTokenRefresher;