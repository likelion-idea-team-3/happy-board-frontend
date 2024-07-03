import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "./AuthContext";
import { EventSourcePolyfill } from 'event-source-polyfill';
import ConfirmModal from "../Modal/ConfirmModal";
import { TbExclamationMark } from "react-icons/tb";
import { AiOutlineSafety } from "react-icons/ai";

function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.name === "qwejhqwekljahFKASIEJNFLOASIJ") return;

        const token = localStorage.getItem("userToken");

        if (!token) {
            console.error("No user token found. Please log in first.");
            return;
        }

        console.log("Setting up EventSource with token:", token);

        const eventSource = new EventSourcePolyfill("http://43.202.192.54:8080/api/notify/subscribe", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        eventSource.onopen = () => {
            console.log("EventSource connected");
        };

        eventSource.addEventListener("sse", async (event) => {
            try {
                console.log("Raw event data:", event.data); 
                const parsedData = JSON.parse(event.data);
                setNotifications([parsedData]);
                setShowNotifications(true);
                console.log("Received message:", parsedData);

                setTimeout(() => {
                    setShowNotifications(false);
                }, 5000);

            } catch (error) {
                console.error("Failed to parse event data:", error);
            }
        });

        eventSource.onerror = (event) => {
            console.error("EventSource failed:", event);
            if (event.status === 401 || event.status === 403) {
                console.error("Unauthorized or Forbidden. Logging out...");
                logout();
            }
        };

        return () => {
            console.log("Closing EventSource");
            eventSource.close();
        };
    }, [logout, user.name]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        logout();
        navigate("/");
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <>
            <div className="Header-Container">
                <div className="Logo">
                    <Link to="/">긍정 게시판</Link>
                </div>
                <div className="Menu-Icon" onClick={toggleMenu}>
                    <FiMenu />
                </div>
                <nav className={`Nav-Menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/post">게시판</Link>
                        </li>
                        <li>
                            <Link to="/more">더보기</Link>
                        </li>
                    </ul>
                </nav>
                <nav className="Nav-Menu-Login">
                    <ul>
                        {user.name !== "qwejhqwekljahFKASIEJNFLOASIJ" ? (
                            <>
                                <li>
                                    <span onClick={() => { navigate("/mypost"); }}>
                                        {user.name}
                                    </span>
                                    님
                                    <button onClick={handleLogout}>로그아웃</button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/signup">로그인</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            {showNotifications && notifications.length > 0 && (
                <div className="notification-dropdown" onClick={()=>{navigate("/mypost")}}>
                    <ul>
                        {notifications[0].type === "SUCCESS" ? (
                            <li className="notification-success">
                                <AiOutlineSafety />
                                <p>유해성 검사 통과 후 정상 업로드 되었습니다</p>
                            </li>
                        ) : (
                            <li className="notification-warn">
                                <TbExclamationMark />
                                <p>유해성을 탐지하여 필터링 처리 되었습니다</p>
                            </li>
                        )}
                    </ul>
                </div>
            )}
            {showLogoutConfirm && (
                <ConfirmModal
                    message="정말 로그아웃 하시겠습니까?"
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                    confirmText="로그아웃"
                    cancelText="취소"
                    isOpen={showLogoutConfirm}
                />
            )}
        </>
    );
}

export default Header;
