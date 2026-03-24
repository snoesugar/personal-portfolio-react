import { useEffect, useRef } from "react";
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
      {/* 卡片本體：移除潛在的連結衝突 */}
      <div className="card project-card w-100 position-relative border-0 shadow-sm-hover bg-transparent">
        
        {/* 1. 圖片區域：包裹連結，增加點擊範圍與視覺回饋 */}
        <a 
          href={proj.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="card-img-link d-block mb-3"
          style={{ transition: 'transform 0.3s ease' }}
        >
          <div className="card-img-wrapper p-3 bg-light rounded-4 overflow-hidden">
            <BrowserMockup img={placeholderImg} url={proj.url} />
          </div>
        </a>
        
        {/* 2. 內容區域：純文字與標籤，不具備連結功能 */}
        <div className="card-body p-0 d-flex flex-column flex-grow-1">
          <h4 className="project-title fw-bold text-uppercase mb-2">{proj.title}</h4>
          <p className="project-desc text-secondary small line-clamp-2 mb-3">
            {proj.desc}
          </p>
          
          <div className="project-tags mb-4 d-flex flex-wrap gap-2">
            {proj.tags.map(tag => (
              <span key={tag} className="badge border text-secondary rounded-pill px-2 py-1 fw-normal">
                {tag}
              </span>
            ))}
          </div>
          
          {/* 3. 按鈕區域：獨立按鈕連結 */}
          <div className="d-flex gap-4 mt-auto">
            <a 
              href={proj.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm rounded-pill px-4 fw-bold"
            >
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
      // Hero 文字進場
      gsap.from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 作品卡片交錯進場
      cardRefs.current.forEach((el) => {
        gsap.fromTo(el, 
          { y: 80, opacity: 0 }, 
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
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