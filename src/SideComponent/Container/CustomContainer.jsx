import React from "react";
import "./CustomContainer.css";

const CustomContainer = ({ date, author, title, content, likes, views }) => {
  return (
    <li className="custom-container">
      <div className="post-top">
        <p className="post__date">{date}</p>
        <p className="post__title">{title}</p>
        <p className="post__author">{author}</p>

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
