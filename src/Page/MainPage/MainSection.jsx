import React, { useEffect, useRef } from "react";
import "./MainSection.css";

function MainSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          section.querySelectorAll(".animate-on-view").forEach((el) => {
            el.classList.add("animate");
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="main-section" ref={sectionRef}>
      <div className="image-container animate-on-view">
        <img src="/Components/main_pic_1.png" alt="Main" />
      </div>
      <div className="text-container animate-on-view">
        <h1 className="animate-on-view">모두가 행복할 수 있는 공간</h1>
        <h2 className="animate-on-view">작은 긍정의 나눔이 가져오는 효과</h2>
        <p className="animate-on-view">정신적 건강은 우리 삶의 중요한 부분이며, 신체적 건강과 밀접한 연관이 있습니다.</p>
        <p className="animate-on-view">정신적 건강이 좋으면 우리의 삶의 질이 향상되고, 일상적인 기능과 사회적 상호작용에서도 더 큰 효율성을 발휘할 수 있습니다.</p>
        <p className="animate-on-view">하지만, 불안, 우울, 스트레스와 같은 정신적 문제들은 여전히 많은 사람들에게 도전 과제입니다.</p>
        <p className="animate-on-view">이런 문제들을 해결하는 데에는 전문가의 도움도 필요하지만, 가까운 사람들의 잔잔한 위로의 한마디가 큰 힘이 될 수 있습니다.</p>
        <p className="animate-on-view">작은 관심과 지지의 말들이 모여, 정신적 건강을 지키는 데 큰 도움이 됩니다.</p>
        <p className="animate-on-view">우리는 모두 서로에게 긍정적인 영향을 미칠 수 있는 힘을 가지고 있습니다.</p>
      </div>
    </div>
  );
}

export default MainSection;
