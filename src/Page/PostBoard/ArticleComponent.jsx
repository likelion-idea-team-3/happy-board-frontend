import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleComponent.css';

function ArticleComponent(props) {
    return (
        <>
            <div className="articleComponent">
                <Link to="#">
                    <div className="imgbox">
                        <img src={props.imgSrc} alt="article" />
                    </div>
                    <div className="textbox">
                        <div className="textcategori">{props.category}</div>
                        <div className="textheader">{props.title}</div>
                        <div className="textinfo">{props.postedDay}</div>
                    </div>
                </Link>
                <div></div>
            </div>
        </>
    );
}

ArticleComponent.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    postedDay: PropTypes.string.isRequired,
};

export default ArticleComponent;
