import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../Modal/ConfirmModal";

const useAuthFetch = () => {
    const { logout } = useAuth();
    const [isSessionExpired, setIsSessionExpired] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            setModalMessage('로그인이 필요한 서비스입니다.');
            setIsSessionExpired(true);
            return;
        }

        if (!options.headers) {
            options.headers = {};
        }

        options.headers.Authorization = `Bearer ${token}`;

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (data.code === "M006" || data.code === "H001") {
                setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                setIsSessionExpired(true);
                logout();
            }

            return data;
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            throw error;
        }
    };

    const handleSessionExpired = () => {
        setIsSessionExpired(false);
        navigate('/login');
    };

    return { fetchWithAuth, isSessionExpired, modalMessage, handleSessionExpired };
};

export default useAuthFetch;
