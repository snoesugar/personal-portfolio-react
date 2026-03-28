import { useParams, Link, useNavigate } from "react-router-dom";
import projectData from "../data/projects.json";

const Piece = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  
  const project = projectData.find(p => p.id.toString() === id);

  if (!project) {
    return <div className="container py-5">找不到該作品</div>;
  }

  return (
    <div className="container py-5">
  {/* 優化返回按鈕：直接使用 button 配合 navigate 邏輯更清晰 */}
  <button 
    className="btn btn-outline-primary mb-4" 
    onClick={() => navigate(-1)}
  >
    ← 返回作品集
  </button>
  
  <div className="row">
    <div className="col-lg-7">
      <h1 className="display-4 fw-bold mb-3">{project.title}</h1>
      <p className="lead text-secondary mb-4">{project.desc}</p>
      
      {/* 圖片增加 shadow 與轉換效果 */}
      <div className="img-container overflow-hidden rounded-4 shadow-sm mb-4">
        <img 
          src={`${import.meta.env.BASE_URL}assets/images/${project.title}.png`} 
          alt={project.title} 
          className="img-fluid w-100 object-fit-cover" 
          style={{ transition: 'transform 0.3s ease' }}
        />
      </div>
    </div>

    <div className="col-lg-5">
      <div className="bg-white p-4 rounded-4 shadow-sm border">
        <h4 className="fw-bold mb-3">專案開發核心</h4>
        <hr className="opacity-10" />
        
        <div className="mb-4">
          <p className="fw-bold text-primary mb-1">開發動機：</p>
          <p className="text-muted small">{project.motivation}</p>
        </div>

        <div className="mb-4">
          <p className="fw-bold text-primary mb-1">負責的功能：</p>
          <p className="text-muted small">{project.function}</p>
        </div>

        <div className="mb-4">
          <p className="fw-bold mb-2">技術標籤：</p>
          <div className="d-flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="badge bg-light text-dark border-secondary-subtle px-3 py-2 fw-normal">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-3 mt-4">
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary py-2 px-4 fw-bold flex-grow-1 flex-md-grow-0"
          >
            查看成品 <i className="bi bi-box-arrow-up-right ms-1"></i>
          </a>

          {project.gitHubUrl && (
            <a 
              href={project.gitHubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-primary py-2 px-4 flex-grow-1 flex-md-grow-0"
            >
              GitHub 原始碼
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Piece;
