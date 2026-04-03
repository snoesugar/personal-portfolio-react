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
    // 1. 選取所有的作品卡片元素
    const cards = cardRefs.current.filter(el => el !== null); // 確保沒有空值

    if (cards.length === 0) return; // 安全檢查

    // 2. 使用 fromTo 指令，並在其中設定 stagger 與 ScrollTrigger
    gsap.fromTo(cards, 
      // 初始狀態：在下方且透明
      { 
        y: 80, 
        opacity: 0 
      }, 
      // 目標狀態與動畫設定
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        
        // 關鍵核心：設定交錯時間 (每張卡片間隔 0.2 秒)
        stagger: 0.2, 
        
        // 關鍵核心：將 ScrollTrigger 綁定在「整組卡片的容器」或「第一張卡片」上
        scrollTrigger: {
          trigger: ".row.g-5",      // 觸發目標設為卡片所在的 row 容器
          start: "top 85%",        // 容器頂部到達視窗 85% 時觸發
          toggleActions: "play none none none", // 只播放一次，不重複
          // once: true,            // 或者使用 once: true 確保只跑一次
        }
      }
    );
  }, mainRef);

  return () => ctx.revert();
}, []);

  return (
    <div ref={mainRef} className="container-fluid p-0 bg-white">
      {/* 作品集區塊 */}
      <section id="portfolio" className="container py-5">
        <div className="row g-5">
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