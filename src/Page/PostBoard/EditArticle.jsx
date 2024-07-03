import "./EditArticle.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WriteArticle.css";
import MessageModal from "../../SideComponent/Modal/MessageModal";
import { useAuth } from "../../SideComponent/Header/AuthContext";

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        fetchArticle();
    }, []);

    const authenticatedFetch = async (url, options = {}) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            setModalMessage("로그인이 필요한 서비스입니다.");
            setIsModalOpen(true);
            return;
        }

        const defaultHeaders = {
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
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

        return data;
    };

    const fetchArticle = async () => {
        try {
            const data = await authenticatedFetch(`http://43.202.192.54:8080/api/boards/happy/${id}`);
            if (data.success === "true" && data.data) {
                const fetchedArticle = data.data;
                setArticle(fetchedArticle);
                setTitle(fetchedArticle.title);
                setContent(fetchedArticle.content);
            }
        } catch (error) {
            console.error("Failed to fetch article:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedArticle = {
            title,
            content,
        };

        try {
            const data = await authenticatedFetch(`http://43.202.192.54:8080/api/boards/happy/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedArticle),
            });
            console.log("Updated Article:", data);
            setModalMessage("게시물 수정에 성공 했습니다!");
            setIsModalOpen(true);
            
        } catch (error) {
            console.error("Failed to update article:", error);
        }
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
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
        if (modalMessage === "게시물 수정에 성공 했습니다!") {
            navigate("/post");
        } else {
            navigate("/login");
        }
    };

    if (!article) {
        return <div>Loading...</div>;
    }

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
                                <label htmlFor="fileInput" className="fileInputLabel">
                                    <img
                                        className="photoimg"
                                        src="https://img.icons8.com/ios-filled/50/photo.png"
                                        alt="Photo"
                                    />
                                    <span>Photo</span>
                                </label>
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
                    <input type="submit" value="Update" />
                </form>
            </div>
            <MessageModal message={modalMessage} onClose={handleModalClose} buttonText="확인" isOpen={isModalOpen} />
        </>
    );
}

export default EditArticle;
