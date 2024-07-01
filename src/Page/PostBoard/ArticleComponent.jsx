import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleComponent.css';

function ArticleComponent(props) {
    return (
        <>
            <div className="articleComponent">
                <Link to="#" style={{ textDecoration: 'none' }}>
                    <div className="imgbox">
                        <img src={props.imgSrc} alt="article" />
                    </div>
                    <div className="textbox">
                        <div className="textcategori">{props.category}</div>
                        <div className="textheader">{props.title}</div>
                        <div className="liked">
                            <img src="https://img.icons8.com/ios/50/hearts--v1.png" alt="hearts--v1" />
                            <div className="likedCount">{props.liked}</div>
                        </div>
                        <div className="postedDay">{props.postedDay}</div>
                    </div>
                </Link>
                {props.showEditButton && (
                    <button className="editBtn" onClick={props.onEdit}>
                        수정
                    </button>
                )}
            </div>
        </>
    );
}

ArticleComponent.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    postedDay: PropTypes.string.isRequired,
    liked: PropTypes.number.isRequired,
    showEditButton: PropTypes.bool,
    onEdit: PropTypes.func,
};

export default ArticleComponent;
