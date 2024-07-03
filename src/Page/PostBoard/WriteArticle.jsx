import { useState, useEffect } from "react";
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

            if (data.code === "M006" || data.code === "H001") {
                setModalMessage("세션이 만료되었습니다. 다시 로그인 해주세요.");
                setIsModalOpen(true);
                logout();
                return;
            }

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

    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };


    const handleContentChange = (e) => {
        setContent(e.target.value);
        console.log(content);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const uploadImage = async (imageBlob) => {
        const formData = new FormData();
        formData.append("file", imageBlob);

        try {
            const token = localStorage.getItem("userToken");
            const response = await fetch("http://43.202.192.54:8080/api/files/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });


            const data = await response.text();

            if (!response.ok || data.code === "M006" || data.code === "H001") {
                setModalMessage('세션이 만료되었습니다. 다시 로그인 해주세요.');
                setIsModalOpen(true);
                logout();
                return null;
            }

            console.log("성공");

            return data;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handlePaste = async (event) => {
        const clipboardData = event.clipboardData;
        if (clipboardData) {
            const items = clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.type.indexOf("image") !== -1) {
                    const blob = item.getAsFile();
                    const imgUrl = await uploadImage(blob);
                    if (imgUrl) {
                        const markdownImage = `![image](${imgUrl})`;
                        setContent((prevContent) => prevContent + markdownImage);
                    }
                }
            }
        }
    };

    useEffect(() => {
        const contentEditableElement = document.getElementById("content");
        if (contentEditableElement) {
            contentEditableElement.addEventListener("paste", handlePaste);
            return () => contentEditableElement.removeEventListener("paste", handlePaste);
        }
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
        if (modalMessage === "게시글 작성에 성공하였습니다!") {
            navigate("/post");
        } else {
            navigate("/login");
        }
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
                            <div className="editorToolbar">
                                <button type="button" onClick={() => document.execCommand("bold")}>
                                    <img className="boldimg" src="https://img.icons8.com/ios-filled/50/b.png" alt="B" />
                                    <span>Bold</span>
                                </button>
                                <button type="button" onClick={() => document.execCommand("italic")}>
                                    <img
                                        className="italicimg"
                                        src="https://img.icons8.com/ios-filled/50/italic.png"
                                        alt="I"
                                    />
                                    <span>Italic</span>
                                </button>
                                <button type="button" onClick={() => document.execCommand("underline")}>
                                    <img
                                        className="underlineimg"
                                        src="https://img.icons8.com/ios-filled/50/underline.png"
                                        alt="U"
                                    />
                                    <span>Underline</span>
                                </button>
                                <button type="button" onClick={() => document.execCommand("foreColor", "red")}>
                                    <img
                                        className="colorimg"
                                        src="https://img.icons8.com/ios-filled/50/color-wheel.png"
                                        alt="Color"
                                    />
                                    <span>Color</span>
                                </button>
                                <button type="button" onClick={() => document.execCommand("justifyLeft")}>
                                    <img
                                        className="alignleftimg"
                                        src="https://img.icons8.com/ios-filled/50/align-left.png"
                                        alt="Left"
                                    />
                                    <span>Left</span>
                                </button>
                                <button type="button" onClick={() => document.execCommand("justifyCenter")}>
                                    <img
                                        className="aligncenterimg"
                                        src="https://img.icons8.com/ios-filled/50/align-center.png"
                                        alt="Center"
                                    />
                                    <span>Center</span>
                                </button>
                                <button type="button" onClick={() => document.execCommand("justifyRight")}>
                                    <img
                                        className="alignrightimg"
                                        src="https://img.icons8.com/ios-filled/50/align-right.png"
                                        alt="Right"
                                    />
                                    <span>Right</span>
                                </button>
                            </div>
                            <textarea
                                id="content"
                                className="contentEditable"
                                value={content}
                                onChange={handleContentChange}
                                placeholder="내용을 입력하세요"
                            ></textarea>
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
