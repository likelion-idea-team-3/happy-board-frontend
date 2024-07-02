import React, { useEffect, useRef } from "react";
import "./MoreNews.css";

function MoreNews() {
  const benefitRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    benefitRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      benefitRef.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="more-news">
      <header className="header">
        <h1>긍정 게시판</h1>
        <p>여러분의 삶에 긍정의 에너지를 더하세요!</p>
      </header>
      
      <section className="overview">
        <p>긍정 게시글은 여러분의 일상 속에서 긍정적인 순간들을 공유하고, 서로의 긍정을 응원하는 공간입니다.</p> 
          <p>일상에서의 작은 행복부터 큰 성취까지, 긍정적인 이야기들을 나누며 더 나은 하루를 만들어갑니다.</p>
      </section>
      
      <section className="benefits">
        <ul>
          {["긍정적인 사고방식을 키울 수 있습니다.", 
            "다른 사람들과의 교류를 통해 서로에게 힘이 됩니다.", 
            "일상의 스트레스를 해소하는데 도움이 됩니다.", 
            "삶의 만족도가 높아집니다."].map((text, index) => (
              <li key={index} ref={el => benefitRef.current[index] = el}>
                <div className="benefit-step">
                  <div className="step-number">point {index + 1}.</div>
                  {text}
                </div>
              </li>
            ))}
        </ul>
      </section>
      

      <section className="testimonials">
        <h2>후기</h2>
        <div className="testimonial">
          <p>"긍정 게시글을 통해 매일 아침을 활기차게 시작할 수 있게 되었습니다. 정말 감사합니다!"</p>
          <span>- 김건우</span>
        </div>
        <div className="testimonial">
          <p>"힘들 때마다 긍정 게시글을 보면서 많은 위로를 받았습니다. 서로에게 힘이 되는 좋은 공간입니다."</p>
          <span>- 김건좌</span>
        </div>
        <div className="testimonial">
          <p>"긍정적인 이야기들을 읽으며 나도 긍정적인 사람이 되어가고 있는 것을 느낍니다."</p>
          <span>- 김건상</span>
        </div>
      </section>
      
      <footer className="footer">
        <p>여러분도 긍정 게시판에 참여해보세요!</p>
      </footer>
    </div>
  );
}

export default MoreNews;
