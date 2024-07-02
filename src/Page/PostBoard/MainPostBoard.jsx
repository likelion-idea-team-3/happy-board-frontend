import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import ArticleComponent from "./ArticleComponent";
import DummyArticles from "./DummyArticles";
import "./MainPostBoard.css";

const ARTICLES_PER_PAGE = 8;

function MainPostBoard() {
    const { user } = useAuth();
    const [selected, setSelected] = React.useState(0);
    const [articles, setArticles] = React.useState(DummyArticles);
    const [currentPage, setCurrentPage] = React.useState(1);
    const loginedId = 1;
    const navigate = useNavigate();

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
        // Navigate to edit page or perform edit action
        navigate(`/edit/${articleId}`);
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

    function saveTokenToLocalStorage(token) {
        // 로컬 스토리지에 token 저장
        localStorage.setItem("authToken", token);
        console.log("Token saved to local storage.");
    }

    // 예시: 서버로부터 token을 받아와서 저장하는 함수
    async function fetchAndSaveToken(url, credentials) {
        try {
            // 자격 증명을 쿼리 파라미터로 추가
            const queryParams = new URLSearchParams(credentials).toString();
            const response = await fetch(`${url}?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Network response was not ok");
            }

            const data = await response.json();
            const token = data.token; // 서버가 반환하는 token의 key를 맞춰주세요
            saveTokenToLocalStorage(token);
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    }

    // 예시 사용법
    const url = "https://example.com/api/get-token";
    const credentials = {
        username: "user",
        password: "password",
    };

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
                        <div key={article.data.id} className="item">
                            <ArticleComponent
                                title={article.data.title}
                                postedDay={timeAgo(article.data.modifiedAt)}
                                writer={article.data.member.nickname}
                                showEditButton={loginedId === article.id}
                                onEdit={() => handleEdit(article.id)}
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
