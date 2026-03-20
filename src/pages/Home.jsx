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
    <div 
      className="col-md-6 col-lg-4"
      ref={(el) => setCardRefs(el, index)}
    >
      <div className="card border-0 h-100 project-card bg-transparent">
        <div className="card-img-top p-3 bg-light rounded-4">
          {/* 將圖片路徑傳給 Mockup */}
          <BrowserMockup img={placeholderImg} url={proj.url} />
        </div>
        <div className="card-body p-4 pt-0">
          <h4 className="fw-bold mt-4 text-uppercase tracking-wide" style={{ fontSize: '1.25rem' }}>
            {proj.title}
          </h4>
          <p className="text-secondary small line-clamp-2 mb-3">
            {proj.desc}
          </p>
          
          <div className="mb-4 d-flex flex-wrap gap-2">
            {proj.tags.map(tag => (
              <span key={tag} className="badge border text-secondary rounded-pill px-2 py-1 fw-normal" style={{ fontSize: '0.7rem' }}>
                {tag}
              </span>
            ))}
          </div>
          
          <a href={proj.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm rounded-pill px-4 fw-bold">
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
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
      {/* Hero Section */}
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center hero-content px-3">
          <span className="text-primary fw-bold tracking-widest mb-3 d-block" style={{ fontSize: '0.9rem' }}>HELLO, I'M CHIU YU-LIN</span>
          <h1 className="display-1 fw-bold mb-4 tracking-tighter">Crafting Digital<br/>Products.</h1>
          <p className="lead text-secondary max-w-lg mx-auto mb-5">
            從食品科學的嚴謹到前端開發的創意，我致力於用高品質的代碼，打造流暢且具商業價值的數位體驗。
          </p>
          <a href="#portfolio" className="btn btn-outline-dark rounded-pill px-5 py-2">View Projects</a>
        </div>
      </section>

      {/* 作品集區塊 */}
      <section id="portfolio" className="container py-5">
        <div className="row g-5">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5 fw-bold mt-3">Featured Works</h2>
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

      {/* 自我介紹區塊 */}
      <section id="about" className="vh-100 d-flex align-items-center bg-dark text-white">
        <div className="container text-center px-4">
          <h2 className="display-4 fw-bold">About Me</h2>
          <p className="mt-4 lead text-white-50 max-w-md mx-auto">
            擁有食品技師背景的我，將「品質管理」的 DNA 帶入網頁開發。
            每一行代碼都經過嚴格審視，確保最終產出的產品兼具穩定性與美感。
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;