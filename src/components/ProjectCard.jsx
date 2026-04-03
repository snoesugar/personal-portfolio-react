
import { Link } from "react-router-dom";
import BrowserMockup from "../components/BrowserMockup";
// --- 作品集卡片組件  ---
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
        
        <div className="card-body p-2 d-flex flex-column flex-grow-1">
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

export default ProjectCard
