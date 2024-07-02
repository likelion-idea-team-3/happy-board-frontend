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
            const sortedArticles = [...articles].sort(
                (a, b) => new Date(b.postedDay) - new Date(a.postedDay)
            );
            setArticles(sortedArticles);
        } else if (index === 1) {
            const sortedArticles = [...articles].sort(
                (a, b) => b.viewed - a.viewed
            );
            setArticles(sortedArticles);
        } else if (index === 2) {
            const sortedArticles = [...articles].sort(
                (a, b) => b.liked - a.liked
            );
            setArticles(sortedArticles);
        }
    }

    const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(
        indexOfFirstArticle,
        indexOfLastArticle
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (articleId) => {
        // Navigate to edit page or perform edit action
        navigate(`/edit/${articleId}`);
    };

    return (
        <>
            <div className="sortContainer">
                <button
                    className={`sortBtn ${selected === 0 ? "active" : ""}`}
                    onClick={() => startSort(0)}
                >
                    최신순
                </button>
                <button
                    className={`sortBtn ${selected === 1 ? "active" : ""}`}
                    onClick={() => startSort(1)}
                >
                    조회순
                </button>
                <button
                    className={`sortBtn ${selected === 2 ? "active" : ""}`}
                    onClick={() => startSort(2)}
                >
                    좋아요순
                </button>
            </div>
            <div className="outercontainer">
                <div className="otherArticles">
                    {currentArticles.map((article) => (
                        <div key={article.id} className="item">
                            <ArticleComponent
                                imgSrc={article.imgSrc}
                                category={article.category}
                                title={article.title}
                                liked={article.liked}
                                postedDay={article.postedDay}
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
                {Array.from(
                    { length: Math.ceil(articles.length / ARTICLES_PER_PAGE) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={
                                currentPage === index + 1 ? "active" : ""
                            }
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </>
    );
}

export default MainPostBoard;
