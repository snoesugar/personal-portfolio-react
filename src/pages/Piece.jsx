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
      <Link 
      className="btn btn-outline-primary mb-4" 
      onClick={() => navigate(-1)}
      >
        ← 返回作品集
      </Link>
      
      <div className="row">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold">{project.title}</h1>
          <p className="lead text-secondary">{project.desc}</p>
          <img 
            src={`${import.meta.env.BASE_URL}${project.title}.png`} 
            alt={project.title} 
            className="img-fluid rounded shadow-lg my-4" 
          />
        </div>
        <div className="col-lg-6">
            <div className="bg-light p-4 rounded-4">
                <h4>專案資訊</h4>
                <hr />
                <p><strong>技術標籤：</strong></p>
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="badge bg-white text-dark border">{tag}</span>
                    ))}
                </div>
                <a href={project.url} target="_blank" className="btn btn-primary w-100 mb-2">前往網站</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Piece;
