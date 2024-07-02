import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WriteArticle.css";

function WriteArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function postArticle(url, articleData) {
        const token = localStorage.getItem("userToken");

        if (!token) {
            console.error("No token found. Please log in first.");
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

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(errorData.message || "Network response was not ok");
            }

            const data = await response.json();
            console.log("Article posted successfully:", data);
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
            navigate("/"); // 게시물 작성 후 메인 페이지로 이동
        } catch (error) {
            console.error("Failed to post article:", error);
        }
    };

    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.textContent);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
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
                                onInput={handleContentChange}
                                placeholder="내용을 입력하세요"
                                suppressContentEditableWarning={true}
                            ></div>
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}

export default WriteArticle;
