import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import ArticleComponent from "./ArticleComponent";
import "./MainPostBoard.css";

const ARTICLES_PER_PAGE = 8;

function MainPostBoard() {
    const [selected, setSelected] = useState(0);
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useAuth(); // useAuth 훅을 사용하여 로그인된 사용자 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await fetch("http://43.202.192.54:8080/api/boards/happy"); // 데이터를 받아올 URL을 여기에 입력하세요
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched data:", data); // 데이터 확인 로그
            if (data.success === "true" && Array.isArray(data.data)) {
                setArticles(data.data);
            } else {
                console.error("Fetched data is not in expected format:", data);
            }
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
    };

    function startSort(index) {
        setSelected(index);

        if (index === 0) {
            const sortedArticles = [...articles].sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
            setArticles(sortedArticles);
        } else if (index === 1) {
            const sortedArticles = [...articles].sort((a, b) => b.viewed - a.viewed);
            setArticles(sortedArticles);
        } else if (index === 2) {
            const sortedArticles = [...articles].sort((a, b) => b.liked - a.liked);
            setArticles(sortedArticles);
        }
    }

    const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (articleId) => {
        navigate(`/edit/${articleId}`);
    };

    const handleDelete = async (articleId) => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            console.error("No auth token found. Please log in first.");
            return;
        }

        try {
            const response = await fetch(`http://43.202.192.54:8080/api/boards/happy/${articleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(errorData.message || "Network response was not ok");
            }

            console.log("Article deleted successfully");
            setArticles(articles.filter((article) => article.id !== articleId));
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    function timeAgo(dateText) {
        const date = new Date(dateText);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

        if (minutes < 1) {
            return "방금";
        } else if (minutes < 60) {
            return `${minutes}분 전`;
        } else if (hours < 24) {
            return `${hours}시간 전`;
        } else if (days < 30) {
            return `${days}일 전`;
        } else if (months < 12) {
            return `${months}달 전`;
        } else {
            return `${years}년 전`;
        }
    }

    return (
        <>
            <div className="sortContainer">
                <button className={`sortBtn ${selected === 0 ? "active" : ""}`} onClick={() => startSort(0)}>
                    최신순
                </button>
                <button className={`sortBtn ${selected === 1 ? "active" : ""}`} onClick={() => startSort(1)}>
                    조회순
                </button>
                <button className={`sortBtn ${selected === 2 ? "active" : ""}`} onClick={() => startSort(2)}>
                    좋아요순
                </button>
            </div>
            <div className="outercontainer">
                <div className="otherArticles">
                    {currentArticles.map((article) => (
                        <div key={article.id} className="item">
                            <ArticleComponent
                                title={article.title}
                                postedDay={timeAgo(article.modifiedAt)}
                                writer={article.member.nickname}
                                showEditButton={user.name === article.member.nickname} // 로그인된 사용자와 게시글 작성자가 같은지 확인
                                onEdit={() => handleEdit(article.id)}
                                onDelete={() => handleDelete(article.id)}
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
        </>
    );
}

export default MainPostBoard;
