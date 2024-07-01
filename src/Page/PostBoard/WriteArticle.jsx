import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteArticle.css';
import DummyArticles from './DummyArticles';

function WriteArticle() {
    const categories = [...new Set(DummyArticles.map((article) => article.category))];
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
    ).padStart(2, '0')}`;

    const handleCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        console.log('Selected file:', file);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 제출 행동 방지

        // 폼 데이터 수집
        const newArticle = {
            id: DummyArticles.length + 1,
            imgSrc: selectedFile ? URL.createObjectURL(selectedFile) : null,
            category: selectedCategory,
            title: title,
            postedDay: formattedDate,
            viewed: 0,
            liked: 0,
            content: content,
        };

        // DummyArticles에 새로운 항목 추가
        DummyArticles.push(newArticle);

        // 콘솔에서 확인
        console.log('Submitted Article:', newArticle);

        // 입력된 데이터 초기화
        setTitle('');
        setSelectedCategory('');
        setContent('');
        setSelectedFile(null);

        // 홈 화면으로 리디렉션
        navigate('/');
    };

    const handleContentChange = (e) => {
        setContent(e.target.textContent); // div 내용을 가져와서 상태 업데이트
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <>
            <div className="selectCategori">
                <form action="#" onSubmit={handleSubmit}>
                    <select name="categories" id="category" value={selectedCategory} onChange={handleCategoryChange}>
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
                                <button type="button" onClick={() => handleCommand('bold')}>
                                    <img className="boldimg" src="https://img.icons8.com/ios-filled/50/b.png" alt="B" />
                                    <span>Bold</span>
                                </button>
                                <button type="button" onClick={() => handleCommand('italic')}>
                                    <img
                                        className="italicimg"
                                        src="https://img.icons8.com/ios-filled/50/italic.png"
                                        alt="I"
                                    />
                                    <span>Italic</span>
                                </button>
                                <button type="button" onClick={() => handleCommand('underline')}>
                                    <img
                                        className="underlineimg"
                                        src="https://img.icons8.com/ios-filled/50/underline.png"
                                        alt="U"
                                    />
                                    <span>Underline</span>
                                </button>
                                <button type="button" onClick={() => handleCommand('foreColor', 'red')}>
                                    <img
                                        className="colorimg"
                                        src="https://img.icons8.com/ios-filled/50/color-wheel.png"
                                        alt="Color"
                                    />
                                    <span>Color</span>
                                </button>
                                <button type="button" onClick={() => handleCommand('justifyLeft')}>
                                    <img
                                        className="alignleftimg"
                                        src="https://img.icons8.com/ios-filled/50/align-left.png"
                                        alt="Left"
                                    />
                                    <span>Left</span>
                                </button>
                                <button type="button" onClick={() => handleCommand('justifyCenter')}>
                                    <img
                                        className="aligncenterimg"
                                        src="https://img.icons8.com/ios-filled/50/align-center.png"
                                        alt="Center"
                                    />
                                    <span>Center</span>
                                </button>
                                <button type="button" onClick={() => handleCommand('justifyRight')}>
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
                                <input type="file" id="fileInput" name="file" onChange={handleFileChange} />
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
