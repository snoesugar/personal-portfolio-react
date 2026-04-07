import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrowserMockup from "../components/BrowserMockup";

const ProjectCard = ({ proj, index, setCardRefs }) => {
  const placeholderImg = `${import.meta.env.BASE_URL}${proj.title}.png`;
  
  // 建立隨機位置的狀態，確保 SSR 或重新渲染時位置固定
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    const icons = ['<div />', '{...props}', 'useState', 'GSAP', 'React', 'const', '=>'].map((text) => ({
      text,
      left: `${Math.random() * 85}%`,
      top: `${Math.random() * 85}%`,
      delay: `${Math.random() * 5}s`
    }));
    
    // 使用 requestAnimationFrame 避開同步更新警告
    requestAnimationFrame(() => {
      setFloatingIcons(icons);
    });
  }, []);

  return (
    <div className="col-md-6 col-lg-4 d-flex" ref={(el) => setCardRefs(el, index)}>
      <div className="card project-card w-100 position-relative border-0 shadow-sm-hover bg-transparent overflow-hidden">
        
        {/* --- 漂浮代碼背景層 --- */}
        <div 
          className="portfolio-bg position-absolute w-100 h-100" 
          style={{ 
            top: 0, 
            left: 0, 
            zIndex: -1, 
            opacity: 0.4,
            pointerEvents: 'none' // 確保不會干擾滑鼠點擊卡片
          }}
        >
          {floatingIcons.map((item, i) => (
            <span 
              key={i} 
              className="floating-code fs-5 fw-bold position-absolute" 
              style={{ 
                left: item.left,
                top: item.top,
                color: 'var(--bs-primary)',
                filter: 'blur(3px)', // 增加深度感
                opacity: 0.15,
                animation: `float-subtle 6s ease-in-out infinite alternate`,
                animationDelay: item.delay
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* --- 原有內容層 --- */}
        <Link 
          to={`/piece/${proj.id}`} 
          className="card-img-link d-block mb-3"
          style={{ transition: 'transform 0.3s ease', cursor: 'pointer', zIndex: 2 }}
        >
          <div className="card-img-wrapper p-3 bg-light rounded-4 overflow-hidden shadow-sm">
            <BrowserMockup img={placeholderImg} url={proj.url} />
          </div>
        </Link>
        
        <div className="card-body p-2 d-flex flex-column flex-grow-1" style={{ zIndex: 2 }}>
          <Link to={`/piece/${proj.id}`} className="text-decoration-none text-dark">
            <h4 className="project-title fw-bold text-uppercase mb-2">{proj.title}</h4>
          </Link>

          <p className="project-desc text-secondary small line-clamp-2 mb-3">
            {proj.desc}
          </p>

          <div className="mb-4 d-flex flex-wrap gap-2">
            {proj.tags.map(tag => (
              <span key={tag} className="badge border text-secondary rounded-pill px-2 py-1 fw-normal bg-white">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="d-flex gap-3 mt-auto">
            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm rounded-pill px-3 fw-bold">
              Live Demo
            </a>
            <a 
              href={proj.gitHubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold"
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;