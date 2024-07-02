import React, { useEffect, useState } from "react";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import "./Mypage.css";
import { timeSince } from "../DetailPostPage/utils";
import { FaBan } from "react-icons/fa";
import { FaGrinHearts } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Mypage() {
    const { user } = useAuth();
    const [normalPosts, setNormalPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
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
                if (normalData.success === "true") {
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
                if (filteredData.success === "true") {
                    setFilteredPosts(filteredData.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [user.id]);

    return (
        <div className="mypage-container">
            <h1>
                <span className="mypage-username">{user.name}</span>님의
            </h1>

            <h3>
                <FaGrinHearts />
                완전 럭키비키한 게시글
            </h3>
            {normalPosts.length === 0 ? (
                <>
                    <p>아직 작성된 긍정 기운이 없어요..!</p>
                    <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate("/post");
                        }}
                    >
                        지금 기운 쌓으러 가기!
                    </p>
                </>
            ) : (
                <ul className="post-list">
                    {normalPosts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <span>{timeSince(post.createdAt)}</span>
                        </li>
                    ))}
                </ul>
            )}

            <h3 style={{ color: "red" }}>
                {" "}
                <FaBan style={{ color: "red" }} />
                필터링 된 게시글
            </h3>

            {filteredPosts.length === 0 ? (
                <p>다행히도 아직은 없네요..!</p>
            ) : (
                <ul className="post-list">
                    {filteredPosts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <span>{timeSince(post.createdAt)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Mypage;
