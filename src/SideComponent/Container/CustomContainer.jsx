import React from "react";
import "./CustomContainer.css";

const CustomContainer = ({ date, author, title, content, likes, views }) => {
  return (
    <li className="custom-container">
      <div className="post-top">
        <p>{date}</p>
        <p>{author}</p>
        <p>{title}</p>
      </div>
      <div className="post-center">
        <p>{content}</p>
      </div>
      <div className="post-bottom">
        <p>좋아요 {likes}</p>
        <p>조회 {views}</p>
      </div>
    </li>
  );
};

export default CustomContainer;
