import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WriteArticle.css";
import DummyArticles from "./DummyArticles";

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = DummyArticles.find(
        (article) => article.id === parseInt(id)
    );

    const [title, setTitle] = useState(article ? article.title : "");
    const [content, setContent] = useState(article ? article.content : "");
    const [selectedCategory, setSelectedCategory] = useState(
        article ? article.category : ""
    );
    const [selectedFile, setSelectedFile] = useState(null);

    const contentRef = useRef(null);

    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        console.log("Selected file:", file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedArticle = {
            ...article,
            imgSrc: selectedFile
                ? URL.createObjectURL(selectedFile)
                : article.imgSrc,
            category: selectedCategory,
            title: title,
            content: content,
        };

        const articleIndex = DummyArticles.findIndex(
            (art) => art.id === article.id
        );
        DummyArticles[articleIndex] = updatedArticle;

        console.log("Updated Article:", updatedArticle);

        navigate("/");
    };

    const handleContentChange = () => {
        setContent(contentRef.current.innerHTML);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const categories = [
        ...new Set(DummyArticles.map((article) => article.category)),
    ];

    return (
        <>
            <div className="selectCategori">
                <form action="#" onSubmit={handleSubmit}>
                    <select
                        name="categories"
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
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
                                <button
                                    type="button"
                                    onClick={() => handleCommand("bold")}
                                >
                                    <img
                                        className="boldimg"
                                        src="https://img.icons8.com/ios-filled/50/b.png"
                                        alt="B"
                                    />
                                    <span>Bold</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCommand("italic")}
                                >
                                    <img
                                        className="italicimg"
                                        src="https://img.icons8.com/ios-filled/50/italic.png"
                                        alt="I"
                                    />
                                    <span>Italic</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCommand("underline")}
                                >
                                    <img
                                        className="underlineimg"
                                        src="https://img.icons8.com/ios-filled/50/underline.png"
                                        alt="U"
                                    />
                                    <span>Underline</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCommand("foreColor", "red")
                                    }
                                >
                                    <img
                                        className="colorimg"
                                        src="https://img.icons8.com/ios-filled/50/color-wheel.png"
                                        alt="Color"
                                    />
                                    <span>Color</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCommand("justifyLeft")}
                                >
                                    <img
                                        className="alignleftimg"
                                        src="https://img.icons8.com/ios-filled/50/align-left.png"
                                        alt="Left"
                                    />
                                    <span>Left</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCommand("justifyCenter")
                                    }
                                >
                                    <img
                                        className="aligncenterimg"
                                        src="https://img.icons8.com/ios-filled/50/align-center.png"
                                        alt="Center"
                                    />
                                    <span>Center</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCommand("justifyRight")
                                    }
                                >
                                    <img
                                        className="alignrightimg"
                                        src="https://img.icons8.com/ios-filled/50/align-right.png"
                                        alt="Right"
                                    />
                                    <span>Right</span>
                                </button>
                                <label
                                    htmlFor="fileInput"
                                    className="fileInputLabel"
                                >
                                    <img
                                        className="photoimg"
                                        src="https://img.icons8.com/ios-filled/50/photo.png"
                                        alt="Photo"
                                    />
                                    <span>Photo</span>
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    name="file"
                                    onChange={handleFileChange}
                                />
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
