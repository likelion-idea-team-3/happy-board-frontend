import React from "react";
import "./PostContent.css";
import { timeSince } from "./utils";

function PostContent({ post }) {
    const parseContent = (content) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = content.match(urlRegex);

        if (urls && urls.length === 1) {
            return content.replace(urlRegex, (url) => `<img src="${url}" alt="첨부된 이미지" class="post-image single-image"/>`);
        } else {
            let parts = content.split(urlRegex);
            return parts.map((part, index) => {
                if (urlRegex.test(part)) {
                    return `<img src="${part}" alt="첨부된 이미지" class="post-image"/>`;
                }
                return part;
            }).join('');
        }
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
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: parseContent(post.data.content) }}
                />
            </div>
        </div>
    );
}

export default PostContent;
