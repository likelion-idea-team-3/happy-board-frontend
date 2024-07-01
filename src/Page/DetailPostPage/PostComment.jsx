import React, { useState } from "react";
import "./PostComment.css";
import { BiCommentDetail } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function PostComment() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "User1",
      content: "좋은 글 감사합니다.",
      createdAt: new Date(),
      replies: [],
    },
    {
      id: 2,
      author: "User2",
      content: "마음이 따뜻해져요..",
      createdAt: new Date(),
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplies, setShowReplies] = useState({});

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
          author: "사용자",
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
                author: "사용자",
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
          <div className="user-name">사용자</div>
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
          <div key={comment.id} className="comment-item">
            <div className="comment-box">
              <div className="comment-top">
                <span className="comment-text">
                  <span className="name-style">{comment.author}</span>{" "}
                  <span className="comment-time">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </span>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
              <div className="comment-actions">
                {comment.replies.length > 0 ? (
                  <span onClick={() => handleToggleReplies(comment.id)}>
                    {showReplies[comment.id] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}{" "}
                    답글 ({comment.replies.length})
                  </span>
                ) : (
                  <span onClick={() => handleToggleReplies(comment.id)}>
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
                  onClick={() => handleReplySubmit(comment.id)}
                >
                  답글 작성
                </button>
              </div>
            )}
            {showReplies[comment.id] &&
              comment.replies.map((reply) => (
                <div className="comment-reply-comment" key={reply.id}>
                  <div className="comment-box">
                    <div className="comment-top">
                      <span className="comment-text">
                        <span className="name-style">{reply.author}</span>{" "}
                        <span className="comment-time">
                          {new Date(reply.createdAt).toLocaleString()}
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
