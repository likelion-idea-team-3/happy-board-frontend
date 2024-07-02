import React from "react";
import "./CustomContainer.css";

const CustomContainer = ({ date, author, title, content, likes, onClick }) => {
    return (
        <li className="custom-container" onClick={onClick}>
            <div className="post-top">
                <p className="post__date">{date}</p>
                <p className="post__title">{title}</p>
                <p className="post__author">{author}</p>
            </div>
            <div className="post-center">
                <p>{content}</p>
            </div>
            <div className="post-bottom">
                <p>댓글 {likes}</p>
            </div>
        </li>
    );
};

export default CustomContainer;
