import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill의 스타일시트를 가져옵니다.
import { useNavigate } from "react-router-dom";
import MessageModal from "../../SideComponent/Modal/MessageModal";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import "./WriteArticle.css";

function WriteArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    const { logout } = useAuth();

    async function postArticle(url, articleData) {
        const token = localStorage.getItem("userToken");

        if (!token) {
            setModalMessage("로그인이 필요한 서비스입니다.");
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(articleData),
            });

            const data = await response.json();

            // if (data.code === "M006" || data.code === "H001") {
            //     setModalMessage("세션이 만료되었습니다. 다시 로그인 해주세요.");
            //     setIsModalOpen(true);
            //     logout();
            //     return;
            // }

            if (!response.ok) {
                console.log(data);
                throw new Error(data.message || "Network response was not ok");
            }

            console.log("Article posted successfully:", data);
            setModalMessage("게시글 작성에 성공하였습니다!");
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error posting article:", error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const articleData = {
            title,
            content,
        };

        try {
            await postArticle("http://43.202.192.54:8080/api/boards/happy", articleData);
        } catch (error) {
            console.error("Failed to post article:", error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        if (modalMessage === "게시글 작성에 성공하였습니다!") {
            navigate("/post");
        } else {
            navigate("/login");
        }
    };

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"], // 볼드, 이탤릭, 밑줄
            [{ color: [] }], // 글자 색상
            [{ align: [] }], // 정렬
        ],
    };

    return (
        <>
            <div className="selectCategori">
                <form action="#" onSubmit={handleSubmit}>
                    <div className="typeArea">
                        <div className="writeHeader">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="제목을 입력하세요"
                            />
                        </div>
                        <div className="writePara">
                            <ReactQuill
                                className="contentInput"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                placeholder="내용을 입력하세요"
                            />
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <MessageModal message={modalMessage} onClose={handleModalClose} buttonText="확인" isOpen={isModalOpen} />
        </>
    );
}

export default WriteArticle;
