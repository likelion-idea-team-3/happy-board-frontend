import React, { useState, useEffect } from "react";
import "./PostComment.css";
import { BiCommentDetail } from "react-icons/bi";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { timeSince } from "./utils";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import ConfirmModal from "../../SideComponent/Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import MessageModal from '../../SideComponent/Modal/MessageModal';

function PostComment({ postId }) {
    const [comments, setComments] = useState([]);
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [newReply, setNewReply] = useState("");
    const [showReplies, setShowReplies] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentReply, setCurrentReply] = useState(null);
    const [editComment, setEditComment] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://43.202.192.54:8080/api/board/comment/comments/${postId}`,

            );
            const data = await response.json();
            if (data.code === "M006" || data.code === "H001") {
                setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                setIsModalOpen(true);
                logout();
                return;
            }
            if (data.success === "true") {
                setComments(data.data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setNewReply(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    setModalMessage('로그인이 필요한 서비스입니다.');
                    setIsModalOpen(true);
                    return;
                }
                const response = await fetch(
                    "http://43.202.192.54:8080/api/board/comment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            boardId: postId,
                            content: newComment,
                        }),
                    }
                );

                const data = await response.json();
                if (data.code === "M006" || data.code === "H001") {
                    setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                    setIsModalOpen(true);
                    logout();
                    return;
                }
                if (data.success === "true") {
                    setNewComment("");
                    fetchComments();
                } else {
                    console.error("댓글 작성 오류:", data.message);
                }
            } catch (error) {
                console.error("댓글 작성 중 오류 발생:", error);
            }
        }
    };

    const handleReplySubmit = async (e, commentId) => {
        if (e) e.preventDefault();
        if (newReply.trim()) {
            try {
                const token = localStorage.getItem("userToken");
                if (!token) {
                    setModalMessage('로그인이 필요한 서비스입니다.');
                    setIsModalOpen(true);
                    return;
                }
                const response = await fetch(
                    "http://43.202.192.54:8080/api/board/comment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            boardId: postId,
                            parentId: commentId,
                            content: newReply,
                        }),
                    }
                );

                const data = await response.json();
                if (data.code === "M006" || data.code === "H001") {
                    setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                    setIsModalOpen(true);
                    logout();
                    return;
                }
                if (data.success === "true") {
                    setNewReply("");
                    setCurrentReply(null);
                    fetchComments();
                } else {
                    console.error("답글 작성 오류:", data.message);
                }
            } catch (error) {
                console.error("답글 작성 중 오류 발생:", error);
            }
        }
    };

    const handleToggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: prev[commentId] ? 0 : 5,
        }));
    };

    const handleShowMoreReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: prev[commentId] + 5,
        }));
    };

    const handleEditComment = (comment) => {
        setCurrentReply(null);
        setEditComment(comment);
        setEditContent(comment.content);
    };

    const handleEditChange = (e) => {
        setEditContent(e.target.value);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (editContent.trim()) {
            try {
                const token = localStorage.getItem("userToken");

                if (!token) {
                    setModalMessage('로그인이 필요한 서비스입니다.');
                    setIsModalOpen(true);
                    return;
                }

                const response = await fetch(
                    `http://43.202.192.54:8080/api/board/comment/${editComment.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            content: editContent,
                        }),
                    }
                );

                const data = await response.json();

                if (data.code === "M006" || data.code === "H001") {
                    setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                    setIsModalOpen(true);
                    logout();
                    return;
                }

                if (data.success === "true") {
                    setEditComment(null);
                    setEditContent("");
                    fetchComments();
                } else {
                    console.error("댓글 수정 오류:", data.message);
                }
            } catch (error) {
                console.error("댓글 수정 중 오류 발생:", error);
            }
        }
    };

    const handleDeleteComment = async () => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                setModalMessage('로그인이 필요한 서비스입니다.');
                setIsModalOpen(true);
                return;
            }
            const response = await fetch(
                `http://43.202.192.54:8080/api/board/comment/${commentToDelete}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            if (data.code === "M006" || data.code === "H001") {
                setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                setIsModalOpen(true);
                logout();
                return;
            }
            if (data.success === "true") {
                fetchComments();
            } else {
                console.error("댓글 삭제 오류:", data.message);
            }
        } catch (error) {
            console.error("댓글 삭제 중 오류 발생:", error);
        } finally {
            setShowConfirmModal(false);
            setCommentToDelete(null);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/login');
    };

    const openConfirmModal = (commentId, e) => {
        e.stopPropagation();
        setCommentToDelete(commentId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setCommentToDelete(null);
    };

    return (
        <div className="post-comments">
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <div className="comment-input-group">{user.name !== "qwejhqwekljahFKASIEJNFLOASIJ" ? <div className="user-name">{user.name}</div>
                     : (
                        <div className="user-name">{" "}</div>
                    )}
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
                {isLoading ? (
                    <div>불러오는 중...</div>
                ) : (
                    comments
                        .filter((comment) => comment.parentId === null)
                        .map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-box">
                                    <div className="comment-top">
                                        <span className="comment-text">
                                            <span className="name-style">
                                                {comment.nickname}
                                            </span>
                                            <span className="comment-time">
                                                {timeSince(
                                                    new Date(comment.createdAt)
                                                )}
                                            </span>
                                        </span>
                                        {user.name === comment.nickname && (
                                            <span className="comment-actions">
                                                <MdModeEditOutline
                                                    onClick={() =>
                                                        handleEditComment(
                                                            comment
                                                        )
                                                    }
                                                />
                                                <MdDeleteForever
                                                    onClick={(e) =>
                                                        openConfirmModal(
                                                            comment.id,
                                                            e
                                                        )
                                                    }
                                                />
                                            </span>
                                        )}
                                    </div>
                                    <div className="comment-content">
                                        <p>{comment.content}</p>
                                    </div>
                                    <div className="comment-actions">
                                        {comments.filter(
                                            (c) => c.parentId === comment.id
                                        ).length > 0 ? (
                                            <span
                                                onClick={() => {
                                                    if (
                                                        showReplies[comment.id]
                                                    ) {
                                                        setCurrentReply(null);
                                                    } else {
                                                        setCurrentReply(
                                                            comment.id
                                                        );
                                                    }
                                                    handleToggleReplies(
                                                        comment.id
                                                    );
                                                }}
                                            >
                                                {showReplies[comment.id] ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}{" "}
                                                답글 (
                                                {
                                                    comments.filter(
                                                        (c) =>
                                                            c.parentId ===
                                                            comment.id
                                                    ).length
                                                }
                                                )
                                            </span>
                                        ) : (
                                            <span
                                                onClick={() => {
                                                    setCurrentReply(comment.id);
                                                    handleToggleReplies(
                                                        comment.id
                                                    );
                                                }}
                                            >
                                                답글 작성
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {showReplies[comment.id] > 0 &&
                                    comments
                                        .filter(
                                            (c) => c.parentId === comment.id
                                        )
                                        .slice(0, showReplies[comment.id])
                                        .map((reply) => (
                                            <div
                                                className="comment-reply-comment"
                                                key={reply.id}
                                            >
                                                <div className="comment-box">
                                                    <div className="comment-top">
                                                        <span className="comment-text">
                                                            <span className="name-style">
                                                                {reply.nickname}
                                                            </span>
                                                            <span className="comment-time">
                                                                {timeSince(
                                                                    new Date(
                                                                        reply.createdAt
                                                                    )
                                                                )}
                                                            </span>
                                                        </span>
                                                        {user.name ===
                                                            reply.nickname && (
                                                            <span className="comment-actions">
                                                                <MdModeEditOutline
                                                                    onClick={() =>
                                                                        handleEditComment(
                                                                            reply
                                                                        )
                                                                    }
                                                                />
                                                                <MdDeleteForever
                                                                    onClick={(e) =>
                                                                        openConfirmModal(
                                                                            reply.id,
                                                                            e
                                                                        )
                                                                    }
                                                                />
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="comment-content">
                                                        <p>{reply.content}</p>
                                                    </div>
                                                    {editComment &&
                                                        editComment.id ===
                                                            reply.id && (
                                                            <form
                                                                className="edit-comment-form"
                                                                onSubmit={
                                                                    handleEditSubmit
                                                                }
                                                            >
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        editContent
                                                                    }
                                                                    onChange={
                                                                        handleEditChange
                                                                    }
                                                                    className="comment-input"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="comment-submit comment-send"
                                                                >
                                                                    수정
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setEditComment(
                                                                            null
                                                                        )
                                                                    }
                                                                    className="comment-submit comment-cancel"
                                                                >
                                                                    취소
                                                                </button>
                                                            </form>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                {showReplies[comment.id] > 0 &&
                                    comments.filter(
                                        (c) => c.parentId === comment.id
                                    ).length > showReplies[comment.id] && (
                                        <button
                                            className="show-more-replies"
                                            onClick={() =>
                                                handleShowMoreReplies(
                                                    comment.id
                                                )
                                            }
                                        >
                                            더 보기 (
                                            {comments.filter(
                                                (c) => c.parentId === comment.id
                                            ).length - showReplies[comment.id]}
                                            )
                                        </button>
                                    )}
                                {currentReply === comment.id && (
                                    <form
                                        className="reply-input"
                                        onSubmit={(e) =>
                                            handleReplySubmit(e, comment.id)
                                        }
                                    >
                                        <input
                                            type="text"
                                            placeholder="답글을 입력하세요"
                                            value={newReply}
                                            onChange={handleReplyChange}
                                            className="comment-input"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleReplySubmit(
                                                        e,
                                                        comment.id
                                                    );
                                                }
                                            }}
                                        />
                                        <button
                                            className="comment-submit"
                                            onClick={() =>
                                                handleReplySubmit(
                                                    null,
                                                    comment.id
                                                )
                                            }
                                        >
                                            답글 작성
                                        </button>
                                    </form>
                                )}
                                {editComment && editComment.id === comment.id && (
                                    <form
                                        className="edit-comment-form"
                                        onSubmit={handleEditSubmit}
                                    >
                                        <input
                                            type="text"
                                            value={editContent}
                                            onChange={handleEditChange}
                                            className="comment-input"
                                        />
                                        <button
                                            type="submit"
                                            className="comment-submit comment-send"
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditComment(null)
                                            }
                                            className="comment-submit comment-cancel"
                                        >
                                            취소
                                        </button>
                                    </form>
                                )}
                            </div>
                        ))
                )}
            </div>
            <ConfirmModal
                message="정말 댓글을 삭제 하시겠습니까?"
                onConfirm={handleDeleteComment}
                onCancel={closeConfirmModal}
                isOpen={showConfirmModal}
            />
            <MessageModal
                message={modalMessage}
                onClose={handleModalClose}
                buttonText="확인"
                isOpen={isModalOpen}
            />
        </div>
    );
}

export default PostComment;
