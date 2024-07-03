import React, { useEffect, useState } from "react";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import "./Mypage.css";
import { timeSince } from "../DetailPostPage/utils";
import { FaBan, FaGrinHearts } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmModal from '../../SideComponent/Modal/ConfirmModal';
import MessageModal from '../../SideComponent/Modal/MessageModal';

function Mypage() {
    const { user, logout } = useAuth();
    const [normalPosts, setNormalPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        fetchPosts();
    }, []);

    const handleFetchResponse = (data) => {
        if (data.code === "M006" || data.code === "H001") {
            setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
            setIsModalOpen(true);
            logout();
            return false;
        }
        return true;
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("userToken");

            const normalResponse = await fetch(
                "http://43.202.192.54:8080/api/boards/happy/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const normalData = await normalResponse.json();
            if (handleFetchResponse(normalData)) {
                setNormalPosts(normalData.data);
            }

            const filteredResponse = await fetch(
                "http://43.202.192.54:8080/api/boards/happy/me/hazard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const filteredData = await filteredResponse.json();
            if (handleFetchResponse(filteredData)) {
                setFilteredPosts(filteredData.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };
 
    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`);
    };

    const handleDelete = (postId) => {
        setDeletePostId(postId);
        setShowDeleteConfirm(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/login');
    };
    
    const confirmDelete = async () => {
        const token = localStorage.getItem("userToken");
        try {
            const response = await fetch(`http://43.202.192.54:8080/api/boards/happy/${deletePostId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (handleFetchResponse(data)) {
                if (response.ok) {
                    setNormalPosts(normalPosts.filter((post) => post.id !== deletePostId));
                    setFilteredPosts(filteredPosts.filter((post) => post.id !== deletePostId));
                } else {
                    console.log(data);
                    throw new Error(data.message || "Network response was not ok");
                }
            }
        } catch (error) {
            console.error("Error deleting article:", error);
        } finally {
            setShowDeleteConfirm(false);
            setDeletePostId(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeletePostId(null);
    };

    return (
        <div className="mypage-container">
            <h1>
                <span className="mypage-username">{user.name}</span>님의
            </h1>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <>
                    <h3>
                        <FaGrinHearts />
                        완전 럭키비키한 게시글
                    </h3>
                    {normalPosts.length === 0 ? (
                        <>
                            <p>아직 작성된 긍정 기운이 없어요..!</p>
                            <p
                                className="mypage-goto-post"
                                onClick={() => {
                                    navigate("/post");
                                }}
                            >
                                👉지금 기운 쌓으러 가기!👉
                            </p>
                        </>
                    ) : (
                        <ul className="post-list">
                            {normalPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="post-item"
                                >
                                    <h2 onClick={() => handlePostClick(post.id)}>{post.title}</h2>
                                    <p onClick={() => handlePostClick(post.id)}>{post.content}</p>
                                    <span onClick={() => handlePostClick(post.id)}>{timeSince(post.createdAt)}</span>
                                    <div>
                                        <MdEdit onClick={() => handleEdit(post.id)} />
                                        <MdDelete onClick={() => handleDelete(post.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <h3
                        style={{
                            color: "red",
                            borderTop: "3px solid black",
                            paddingTop: "20px",
                        }}
                    >
                        {" "}
                        <FaBan style={{ color: "red" }} />
                        필터링 된 게시글
                    </h3>

                    {filteredPosts.length === 0 ? (
                        <p>다행히도 아직은 없네요..!</p>
                    ) : (
                        <ul className="post-list">
                            {filteredPosts.map((post) => (
                                <li
                                key={post.id}
                                className="post-item"
                            >
                                <h2 onClick={() => handlePostClick(post.id)}>{post.title}</h2>
                                <p onClick={() => handlePostClick(post.id)}>{post.content}</p>
                                <span onClick={() => handlePostClick(post.id)}>{timeSince(post.createdAt)}</span>
                                <div>
                                    <MdEdit onClick={() => handleEdit(post.id)} />
                                    <MdDelete onClick={() => handleDelete(post.id)} />
                                </div>
                            </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
            {showDeleteConfirm && (
                <ConfirmModal
                    message="정말 이 게시글을 삭제하시겠습니까?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    confirmText="삭제"
                    cancelText="취소"
                    isOpen={showDeleteConfirm}
                />
            )}
            <MessageModal
                message={modalMessage}
                onClose={handleModalClose}
                buttonText="확인"
                isOpen={isModalOpen}
            />
        </div>
    );
}

export default Mypage;
