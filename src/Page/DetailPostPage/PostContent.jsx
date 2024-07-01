import React from "react";
import "./PostContent.css";
import { FaRegHeart } from "react-icons/fa";

function PostContent() {
  return (
    <div className="post-detail">
      <h1 className="post-title">제목</h1>
      <div className="post-detail-top">
        <span className="post-author">작성자</span>
        <span className="post-info">조회수 123 | 10분 전</span>
      </div>
      <div className="post-detail-center">
        <div className="post-content">내용</div>
      </div>
      <div className="post-detail-bottom">
        <FaRegHeart /> 7
      </div>
      </div>
  );
}

export default PostContent;
