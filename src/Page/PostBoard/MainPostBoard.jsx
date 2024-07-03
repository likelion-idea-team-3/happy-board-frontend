import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import ArticleComponent from "./ArticleComponent";
import ConfirmModal from "../../SideComponent/Modal/ConfirmModal";
import MessageModal from '../../SideComponent/Modal/MessageModal';
import "./MainPostBoard.css";
import { timeSince } from '../DetailPostPage/utils';

const ARTICLES_PER_PAGE = 8;

function MainPostBoard() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [articleToDelete, setArticleToDelete] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch("http://43.202.192.54:8080/api/boards/happy");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            if (data.success === "true" && Array.isArray(data.data)) {
                const sortedArticles = data.data.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
                setArticles(sortedArticles);
            } else {
                console.error("Fetched data is not in expected format:", data);
            }
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
    };

    const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (articleId, e) => {
        e.stopPropagation();
        navigate(`/edit/${articleId}`);
    };

    const handleDelete = async (articleId) => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            setModalMessage('로그인이 필요한 서비스입니다.');
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await fetch(`http://43.202.192.54:8080/api/boards/happy/${articleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.code === "M006" || data.code === "H001") {
                setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                setIsModalOpen(true);
                logout();
                return;
            }

            if (!response.ok) {
                console.log(data);
                throw new Error(data.message || "Network response was not ok");
            }

            console.log("Article deleted successfully");
            setArticles(articles.filter((article) => article.id !== articleId));
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    const openConfirmModal = (articleId, e) => {
        e.stopPropagation();
        setArticleToDelete(articleId);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setArticleToDelete(null);
    };

    const confirmDelete = () => {
        if (articleToDelete) {
            handleDelete(articleToDelete);
        }
        closeConfirmModal();
    };

    const handleArticleClick = (articleId) => {
        navigate(`/post/${articleId}`);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate("/login");
    };

    return (
        <>
            <div className="outercontainer">
                <div className="otherArticles">
                    {currentArticles.map((article) => (
                        <div key={article.id} className="item" onClick={() => handleArticleClick(article.id)}>
                            <ArticleComponent
                                title={article.title}
                                postedDay={timeSince(article.createdAt)}
                                writer={article.member.nickname}
                                showEditButton={user.name === article.member.nickname}
                                onEdit={(e) => handleEdit(article.id, e)}
                                onDelete={(e) => openConfirmModal(article.id, e)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="addArticlesContainer">
                <button className="writeBtn" onClick={() => navigate("/write")}>
                    글쓰기
                </button>
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(articles.length / ARTICLES_PER_PAGE) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {isConfirmModalOpen && (
                <ConfirmModal
                    message="정말 게시물을 삭제 하시겠습니까?"
                    onConfirm={confirmDelete}
                    onCancel={closeConfirmModal}
                    isOpen={isConfirmModalOpen}
                />
            )}
            {isModalOpen && (
                <MessageModal
                    message={modalMessage}
                    onClose={handleModalClose}
                    buttonText="확인"
                    isOpen={isModalOpen}
                />
            )}
        </>
    );
}

export default MainPostBoard;
