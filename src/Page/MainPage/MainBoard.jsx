import React, { useEffect, useRef } from "react";
import "./MainBoard.css";
import CustomContainer from "../../SideComponent/Container/CustomContainer";
import posts from "./MainBoardItem";
import { useNavigate } from "react-router-dom";

function MainBoard() {
    const topRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                } else {
                    entry.target.classList.remove("animate");
                }
            });
        };
        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        if (topRef.current) observer.observe(topRef.current);

        return () => {
            if (topRef.current) observer.unobserve(topRef.current);
        };
    }, []);

    return (
        <>
            <div className="MainBoard-Container">
                <div
                    className="MainBoard-top"
                    ref={topRef}
                    style={{ margin: "60px 0px 30px 0px" }}
                >
                    <p>
                        긍정 게시판에서는 여러 사용자들의 긍정 에너지와 값진
                        위로를 느낄 수 있어요
                    </p>
                </div>
                <div className="sortby-new-post">
                    <p
                        className="view-more"
                        onClick={() => {
                            navigate("/post");
                        }}
                    >
                        더보러 가기
                    </p>
                    <ul>
                        {posts.map((post, index) => (
                            <CustomContainer
                                key={index}
                                date={post.date}
                                author={post.author}
                                title={post.title}
                                content={post.content}
                                likes={post.likes}
                                onClick={() => {
                                    navigate("/post");
                                }}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MainBoard;
