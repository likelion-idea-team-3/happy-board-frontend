import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuth } from './AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <nav className={`Nav-Menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/">게시판</Link>
            </li>
            <li>
              <Link to="/more">더보기</Link>
            </li>
          </ul>
        </nav>
        <nav className="Nav-Menu-Login">
          <ul>
            {user ? (
              <li>
                {user.name}님 <button onClick={logout}>로그아웃</button>
              </li>
            ) : (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;