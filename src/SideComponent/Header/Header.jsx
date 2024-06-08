import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="Header-Container">
        <div className="Logo">
          <Link to="/">로고들어갈 자리</Link>
        </div>
        <nav className="Nav-Menu">
          <ul>
            <li>
              <Link to="/community">게시판</Link>
            </li>
            <li>
              <Link to="/more">더보기</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
