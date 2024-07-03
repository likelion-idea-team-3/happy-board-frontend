import "./EditArticle.css";
import { useState, useEffect, useRef } from "react";
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

    const contentRef = useRef(null);

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
                renderContent(fetchedArticle.content);
            }
        } catch (error) {
            console.error("Failed to fetch article:", error);
        }
    };

    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedArticle = {
            title: title,
            content: content,
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

    const handleContentChange = async () => {
        const htmlContent = contentRef.current.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        const textContent = doc.body.innerText;
        const imgElements = Array.from(doc.querySelectorAll("img"));
        let imgUrls = [];

        for (const img of imgElements) {
            if (img.src.startsWith("data:image")) {
                const imgUrl = await uploadImage(img.src);
                imgUrls.push(imgUrl);
            } else {
                imgUrls.push(img.src);
            }
        }

        const combinedContent = `${textContent}\n${imgUrls.join("\n")}`;
        setContent(combinedContent);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const renderContent = (content) => {
        const lines = content.split("\n");
        let html = "";

        lines.forEach((line) => {
            if (line.startsWith("http://") || line.startsWith("https://")) {
                html += `<img src="${line}" alt="image" />`;
            } else {
                html += `<p>${line}</p>`;
            }
        });

        contentRef.current.innerHTML = html;
    };

    const uploadImage = async (base64Image) => {
        const formData = new FormData();
        const blob = await fetch(base64Image).then((res) => res.blob());
        formData.append("file", blob);

        try {
            const response = await fetch("http://43.202.192.54:8080/api/files/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const data = await response.json();
            return data.url; // assuming the server returns the URL in the 'url' field
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

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
                                <button type="button" onClick={() => handleCommand("bold")}>
                                    <img className="boldimg" src="https://img.icons8.com/ios-filled/50/b.png" alt="B" />
                                    <span>Bold</span>
                                </button>
                                <button type="button" onClick={() => handleCommand("italic")}>
                                    <img
                                        className="italicimg"
                                        src="https://img.icons8.com/ios-filled/50/italic.png"
                                        alt="I"
                                    />
                                    <span>Italic</span>
                                </button>
                                <button type="button" onClick={() => handleCommand("underline")}>
                                    <img
                                        className="underlineimg"
                                        src="https://img.icons8.com/ios-filled/50/underline.png"
                                        alt="U"
                                    />
                                    <span>Underline</span>
                                </button>
                                <button type="button" onClick={() => handleCommand("foreColor", "red")}>
                                    <img
                                        className="colorimg"
                                        src="https://img.icons8.com/ios-filled/50/color-wheel.png"
                                        alt="Color"
                                    />
                                    <span>Color</span>
                                </button>
                                <button type="button" onClick={() => handleCommand("justifyLeft")}>
                                    <img
                                        className="alignleftimg"
                                        src="https://img.icons8.com/ios-filled/50/align-left.png"
                                        alt="Left"
                                    />
                                    <span>Left</span>
                                </button>
                                <button type="button" onClick={() => handleCommand("justifyCenter")}>
                                    <img
                                        className="aligncenterimg"
                                        src="https://img.icons8.com/ios-filled/50/align-center.png"
                                        alt="Center"
                                    />
                                    <span>Center</span>
                                </button>
                                <button type="button" onClick={() => handleCommand("justifyRight")}>
                                    <img
                                        className="alignrightimg"
                                        src="https://img.icons8.com/ios-filled/50/align-right.png"
                                        alt="Right"
                                    />
                                    <span>Right</span>
                                </button>
                            </div>
                            <div
                                id="content"
                                className="contentEditable"
                                contentEditable
                                ref={contentRef}
                                onBlur={handleContentChange}
                                dangerouslySetInnerHTML={{ __html: content }}
                                placeholder="내용을 입력하세요"
                                suppressContentEditableWarning={true}
                            ></div>
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
