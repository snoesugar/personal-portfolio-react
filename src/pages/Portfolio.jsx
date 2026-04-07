import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const mainRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRefs = (el, index) => {
    if (el) cardRefs.current[index] = el;
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(el => el !== null);
      if (cards.length === 0) return;

      // 作品卡片進場動畫
      gsap.fromTo(cards, 
        { y: 80, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2, 
          scrollTrigger: {
            trigger: ".portfolio-row", 
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    /* 父容器改為 position-relative 以便放置背景 */
    <div ref={mainRef} className="container-fluid p-0 bg-white position-relative overflow-hidden">
      
      {/* 網格背景層 */}
      <div className="portfolio-bg portfolio-grid-animate"></div>

      {/* 作品集內容：確保 z-index 在背景之上 */}
      <section id="portfolio" className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row portfolio-row g-5">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5 fw-bold mt-3">作品集</h2>
            <div className="bg-primary mx-auto mt-2" style={{ width: '40px', height: '4px' }}></div>
          </div>
          
          {projectData.map((proj, i) => (
            <ProjectCard 
              key={proj.id} 
              proj={proj} 
              index={i} 
              setCardRefs={setCardRefs} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;