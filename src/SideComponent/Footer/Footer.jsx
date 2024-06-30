import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer-Container">
      <nav className="Footer-Menu">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </nav>
      <div className="Footer-Copyright">
        &copy; 2024 긍정 게시판. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
