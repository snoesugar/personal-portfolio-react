import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectData from "../data/projects.json";

gsap.registerPlugin(ScrollTrigger);

// --- 瀏覽器 Mockup 組件 (修改為純圖片版) ---
const BrowserMockup = ({ img, url }) => {
  return (
    <div className="browser-mockup shadow-sm">
      <div className="browser-header">
        <div className="browser-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="browser-address-bar text-muted small">
          {url.replace("https://", "")}
        </div>
      </div>

      <div className="browser-content">
        {img ? (
          <img src={img} alt="Project Cover" className="img-fluid project-img" />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted small">
            Cover Image Missing
          </div>
        )}
      </div>
    </div>
  );
};

// --- 作品卡片組件 (修改圖片傳遞方式) ---
const ProjectCard = ({ proj, index, setCardRefs }) => {
  const placeholderImg = `${import.meta.env.BASE_URL}${proj.title}.png`;

  return (
    <div className="col-md-6 col-lg-4 d-flex" ref={(el) => setCardRefs(el, index)}>
      <div className="card project-card w-100 position-relative border-0 shadow-sm-hover bg-transparent">
        
        <Link 
          to={`/piece/${proj.id}`} 
          className="card-img-link d-block mb-3"
          style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }}
        >
          <div className="card-img-wrapper p-3 bg-light rounded-4 overflow-hidden">
            <BrowserMockup img={placeholderImg} url={proj.url} />
          </div>
        </Link>
        
        <div className="card-body p-0 d-flex flex-column flex-grow-1">
          {/* 如果標題也想點擊進入詳情，也可以加 Link */}
          <Link to={`/piece/${proj.id}`} className="text-decoration-none text-dark">
            <h4 className="project-title fw-bold text-uppercase mb-2">{proj.title}</h4>
          </Link>

          <p className="project-desc text-secondary small line-clamp-2 mb-3">
            {proj.desc}
          </p>

          <div className="mb-4 d-flex flex-wrap gap-2">
            {proj.tags.map(tag => <span key={tag} className="badge border text-secondary rounded-pill px-2 py-1 fw-normal">{tag}</span>)}
          </div>
          
          {/* 保持原本的外部連結按鈕 */}
          <div className="d-flex gap-4 mt-auto">
            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm rounded-pill px-4 fw-bold">
              Live Demo
            </a>
            <a 
              href={proj.gitHubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

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