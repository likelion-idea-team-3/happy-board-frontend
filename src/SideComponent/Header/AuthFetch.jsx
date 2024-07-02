import { useAuth } from "./SideComponent/Header/AuthContext";
import { useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";

const AuthFetch = () => {
    const { logout } = useAuth();
    const [isSessionExpired, setIsSessionExpired] = useState(false);

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem("userToken");

        if (!options.headers) {
            options.headers = {};
        }

        options.headers.Authorization = `Bearer ${token}`;

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (data.code === "M006") {
                setIsSessionExpired(true);
                logout();
            }

            return data;
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            throw error;
        }
    };

    return { fetchWithAuth, isSessionExpired, setIsSessionExpired };
};

export default AuthFetch;
