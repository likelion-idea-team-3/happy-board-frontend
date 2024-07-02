import './MovePage.css';
import { Link } from 'react-router-dom';

function MovePage() {
    return (
        <>
            <div className="btns">
                <div className="numBtn">
                    <Link to="#">1</Link>
                </div>
                <div className="numBtn">
                    <Link to="#">2</Link>
                </div>
                <div className="numBtn">
                    <Link to="#">3</Link>
                </div>
                <div className="numBtn">
                    <Link to="#">4</Link>
                </div>
                <div className="numBtn">
                    <Link to="#">5</Link>
                </div>
            </div>
        </>
    );
}

export default MovePage;
