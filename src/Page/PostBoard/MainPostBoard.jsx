import ArticleComponent from './ArticleComponent';
import birdImage from '/Users/minwoo/Documents/GitHub/happy-board-frontend/src/Page/PostBoard/testsrc/bird.jpeg';
import './MainPostBoard.css';
import MovePage from './MovePage';
import Header from '/Users/minwoo/Documents/GitHub/happy-board-frontend/src/SideComponent/Header/Header.jsx';

function MainPostBoard() {
    return (
        <>
            <Header />
            <div className="outercontainer">
                <h2>추천 게시물</h2>
                <div className="mainArticles">
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트1'}
                            title={'제목1'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트2'}
                            title={'제목2'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                </div>
                <h2>그 외 게시물</h2>
                <div className="otherArticles">
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트1'}
                            title={'제목1'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트2'}
                            title={'제목2'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트2'}
                            title={'제목2'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트1'}
                            title={'제목1'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트2'}
                            title={'제목2'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                    <div className="item">
                        <ArticleComponent
                            imgSrc={birdImage}
                            category={'테스트2'}
                            title={'제목2'}
                            postedDay={'2024.00.00'}
                        ></ArticleComponent>
                    </div>
                </div>
            </div>
            <div className="movepage">
                <MovePage />
            </div>
        </>
    );
}

export default MainPostBoard;
