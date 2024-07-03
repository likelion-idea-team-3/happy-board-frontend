import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ArticleComponent.css";

function ArticleComponent(props) {
    return (
        <div className="articleComponent-horizontal">
            <Link to="#" style={{ textDecoration: "none", flex: 1 }}>
                <div className="textbox-horizontal">
                    <div className="textheader">{props.title}</div>
                    <div className="writer">{props.writer}</div>
                    <div className="postedDay">{props.postedDay}</div>
                </div>
            </Link>
            {props.showEditButton && (
                <div className="buttonContainer-horizontal">
                    <button className="editBtn" onClick={props.onEdit}>
                        수정
                    </button>
                    <button className="deleteBtn" onClick={props.onDelete}>
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
}

ArticleComponent.defaultProps = {
    showEditButton: false,
    onEdit: () => {},
    onDelete: () => {},
};

ArticleComponent.propTypes = {
    title: PropTypes.string.isRequired,
    postedDay: PropTypes.string.isRequired,
    writer: PropTypes.string.isRequired,
    showEditButton: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ArticleComponent;
