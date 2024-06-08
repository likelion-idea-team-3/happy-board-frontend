import React from "react";
import "./MainBoard.css";

function MainBoard() {
  return (
    <>
      <div className="MainBoard-Container">
        <div className="Container">
          <div className="Main">
            <p>누구나 참여 가능한</p>
            <p>긍정 게시판</p>
          </div>
          <div className="Secondary">
            <p>매일매일 새롭게 업로드 되는</p>
            <p>타인의 긍정 에너지를 느껴보세요</p>
          </div>
          <button>목록 보기</button>
        </div>
        <div className="Boards">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default MainBoard;
