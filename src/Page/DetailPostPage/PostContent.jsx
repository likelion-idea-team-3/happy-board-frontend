import React from "react";
import "./PostContent.css";
import { timeSince } from "./utils";

function PostContent({ post }) {
    const parseContent = (content) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return content.replace(urlRegex, (url) => `<img src="${url}" alt="첨부된 이미지" class="post-image"/>`);
    };

    return (
        <div className="post-detail">
            <h1 className="post-title">{post.data.title}</h1>
            <div className="post-detail-top">
                <span className="post-author">{post.data.member.nickname}</span>
                <span className="post-info">{timeSince(post.data.createdAt)}</span>
            </div>
            <div className="post-detail-center">
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: parseContent(post.data.content) }}
                />
            </div>
        </div>
    );
}

export default PostContent;
