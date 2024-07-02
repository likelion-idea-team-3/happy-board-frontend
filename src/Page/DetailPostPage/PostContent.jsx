import React from "react";
import "./PostContent.css";
import { timeSince } from "./utils";

function PostContent({ post }) {
    return (
        <div className="post-detail">
            <h1 className="post-title">{post.data.title}</h1>
            <div className="post-detail-top">
                <span className="post-author">{post.data.member.nickname}</span>
                <span className="post-info">
                    {timeSince(post.data.createdAt)}{" "}
                </span>
            </div>
            <div className="post-detail-center">
                <div className="post-content">{post.data.content}</div>
            </div>
        </div>
    );
}

export default PostContent;
