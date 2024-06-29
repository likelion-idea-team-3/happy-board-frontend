import React, { useEffect, useRef } from "react";
import "./MainTop.css";

function MainTop() {
  const topRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (topRef.current) observer.observe(topRef.current);
    if (centerRef.current) observer.observe(centerRef.current);

    return () => {
      if (topRef.current) observer.unobserve(topRef.current);
      if (centerRef.current) observer.unobserve(centerRef.current);
    };
  }, []);

  return (
    <>
      <div className="MainTop-Container">
        <div className="Top" ref={topRef}>
          <p>긍정게시판은</p>
          <p>여러분을 기다리고 있습니다</p>
        </div>
        <div className="Center" ref={centerRef}>
          <p>긍정 에너지가 필요한 당신에게</p>
          <p>오늘도 긍정 한줄기를 전해드릴게요</p>
          <button>함께 시작하기
          </button>
        </div>
      </div>
    </>
  );
}

export default MainTop;
