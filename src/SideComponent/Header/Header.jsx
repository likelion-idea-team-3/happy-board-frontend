import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "./AuthContext";

import ConfirmModal from "../Modal/ConfirmModal";

function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

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
                            <li>
                                <span
                                    onClick={() => {
                                        navigate("/mypost");
                                    }}
                                >
                                    {user.name}
                                </span>
                                님
                                <button onClick={handleLogout}>로그아웃</button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/signup">로그인</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
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
