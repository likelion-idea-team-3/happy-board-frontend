import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BirdImg from "./testsrc/bird.jpeg";
import "./ArticleComponent.css";

function ArticleComponent(props) {
    return (
        <>
            <div className="articleComponent">
                <Link to="#" style={{ textDecoration: "none" }}>
                    <div className="imgbox">
                        <img src={props.imgSrc} alt="article" />
                    </div>
                    <div className="textbox">
                        <div className="textheader">{props.title}</div>
                        <div className="writer">{props.writer}</div>
                        <div className="postedDay">{props.postedDay}</div>
                    </div>
                </Link>
                {props.showEditButton && (
                    <>
                        <button className="editBtn" onClick={props.onEdit}>
                            수정
                        </button>
                        <button className="deleteBtn" onClick={props.onDelete}>
                            삭제
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

ArticleComponent.defaultProps = {
    imgSrc: BirdImg, // 여기에 사용할 기본 이미지의 URL을 넣으세요
    showEditButton: false,
    onEdit: () => {},
    onDelete: () => {},
};

ArticleComponent.propTypes = {
    imgSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
    postedDay: PropTypes.string.isRequired,
    showEditButton: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ArticleComponent;
