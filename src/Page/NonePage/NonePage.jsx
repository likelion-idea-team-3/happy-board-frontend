import React from "react";
import { Link } from "react-router-dom";
import "./NonePage.css";

function NonePage() {
  return (
    <div className="NotFound-Container">
      <h1>404</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}

export default NonePage;
