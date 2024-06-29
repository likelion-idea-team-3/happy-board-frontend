import React from "react";
import "./MainBoard.css";
import CustomContainer from "../../SideComponent/Container/CustomContainer";
import posts from "./MainBoardItem";

function MainBoard() {
  return (
    <>
      <div className="MainBoard-Container">
        <div className="Container">
          <div className="Main">
            <p>모두가 참여 가능한</p>
            <p>긍정 게시판</p>
          </div>
          <div className="Secondary">
            <p>매일매일 새롭게 업로드 되는</p>
            <p>모두의 긍정 에너지를 느껴보세요</p>
          </div>
          <button><span>목록 보기</span></button>
        </div>
        <div className="Boards">
          <ul>
            {posts.map((post, index) => (
              <CustomContainer
                key={index}
                date={post.date}
                author={post.author}
                title={post.title}
                content={post.content}
                likes={post.likes}
                views={post.views}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MainBoard;
