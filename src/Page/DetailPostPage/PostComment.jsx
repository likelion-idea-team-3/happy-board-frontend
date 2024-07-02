import React, { useState } from "react";
import "./PostComment.css";
import { BiCommentDetail } from "react-icons/bi";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { timeSince } from "./utils";

function PostComment() {
    const [comments, setComments] = useState([]);
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [newReply, setNewReply] = useState("");
    const [showReplies, setShowReplies] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `http://43.202.192.54:8080/api/board/comment/comments/${postId}`
                );
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setNewReply(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    author: user / name,
                    content: newComment,
                    createdAt: new Date(),
                    replies: [],
                },
            ]);
            setNewComment("");
        }
    };

    const handleReplySubmit = (commentId) => {
        if (newReply.trim()) {
            const updatedComments = comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                id: comment.replies.length + 1,
                                author: user.name,
                                content: newReply,
                                createdAt: new Date(),
                            },
                        ],
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            setNewReply("");
            setShowReplies((prev) => ({ ...prev, [commentId]: true }));
        }
    };

    const handleToggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    return (
        <div className="post-comments">
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <div className="comment-input-group">
                    <div className="user-name">{user.name}</div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="댓글 남기기..."
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">
                            댓글 작성
                        </button>
                    </div>
                </div>
            </form>
            <div className="comments-top">
                <BiCommentDetail /> <span>{comments.length}</span>
            </div>
            <div className="comment-list">
                {comments.map((comment) => (
                    <div key={comment.data.id} className="comment-item">
                        <div className="comment-box">
                            <div className="comment-top">
                                <span className="comment-text">
                                    <span className="name-style">사용자</span>{" "}
                                </span>
                            </div>
                            <div className="comment-content">
                                <p>{comment.data.content}</p>
                            </div>
                            <div className="comment-actions">
                                {comment.replies.length > 0 ? (
                                    <span
                                        onClick={() =>
                                            handleToggleReplies(comment.id)
                                        }
                                    >
                                        {showReplies[comment.data.id] ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}{" "}
                                        답글 ({comment.replies.length})
                                    </span>
                                ) : (
                                    <span
                                        onClick={() =>
                                            handleToggleReplies(comment.id)
                                        }
                                    >
                                        답글 작성
                                    </span>
                                )}
                            </div>
                        </div>
                        {showReplies[comment.id] && (
                            <div className="reply-input">
                                <input
                                    type="text"
                                    placeholder="답글을 입력하세요"
                                    value={newReply}
                                    onChange={handleReplyChange}
                                    className="comment-input"
                                />
                                <button
                                    className="comment-submit"
                                    onClick={() =>
                                        handleReplySubmit(comment.id)
                                    }
                                >
                                    답글 작성
                                </button>
                            </div>
                        )}
                        {showReplies[comment.id] &&
                            comment.replies.map((reply) => (
                                <div
                                    className="comment-reply-comment"
                                    key={reply.id}
                                >
                                    <div className="comment-box">
                                        <div className="comment-top">
                                            <span className="comment-text">
                                                <span className="name-style">
                                                    {reply.author}
                                                </span>{" "}
                                                <span className="comment-time">
                                                    {new Date(
                                                        reply.createdAt
                                                    ).toLocaleString()}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="comment-content">
                                            <p>{reply.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostComment;
