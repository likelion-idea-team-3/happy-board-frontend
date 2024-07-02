import "./EditArticle.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WriteArticle.css";

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const contentRef = useRef(null);

    useEffect(() => {
        fetchArticle();
    }, []);

    const authenticatedFetch = async (url, options = {}) => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            console.error("No auth token found. Please log in first.");
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Network response was not ok");
        }

        return response.json();
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
            navigate("/");
        } catch (error) {
            console.error("Failed to update article:", error);
        }
    };

    const handleContentChange = () => {
        setContent(contentRef.current.innerHTML);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
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
                                <label htmlFor="fileInput" className="fileInputLabel">
                                    <img
                                        className="photoimg"
                                        src="https://img.icons8.com/ios-filled/50/photo.png"
                                        alt="Photo"
                                    />
                                    <span>Photo</span>
                                </label>
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
        </>
    );
}

export default EditArticle;
