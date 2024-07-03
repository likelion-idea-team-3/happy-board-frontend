import React from "react";
import "./PostContent.css";
import { timeSince } from "./utils";

function PostContent({ post }) {
    const parseContent = (content) => {
        const regex = /!\[image\]\((https?:\/\/[^\s)]+)\)/g;
        const parts = [];
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(content)) !== null) {
            // Add text before the image
            if (match.index > lastIndex) {
                parts.push(content.substring(lastIndex, match.index));
            }
            // Add the image
            parts.push(<img key={match[1]} src={match[1]} alt="첨부된 이미지" className="post-image" />);
            lastIndex = regex.lastIndex;
        }

        // Add the remaining text after the last image
        if (lastIndex < content.length) {
            parts.push(content.substring(lastIndex));
        }

        return parts;
    };

    const renderTimeInfo = () => {
        const { createdAt, modifiedAt } = post.data;
        if (createdAt === modifiedAt) {
            return timeSince(createdAt);
        } else {
            return `최근 수정 (${timeSince(modifiedAt)})`;
        }
    };

    return (
        <div className="post-detail">
            <h1 className="post-title">{post.data.title}</h1>
            <div className="post-detail-top">
                <span className="post-author">{post.data.member.nickname}</span>
                <span className="post-info">{renderTimeInfo()}</span>
            </div>
            <div className="post-detail-center">
                <div className="post-content">
                    {parseContent(post.data.content)}
                </div>
            </div>
        </div>
    );
}

export default PostContent;
