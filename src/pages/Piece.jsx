import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import projectData from "../data/projects.json";

const Piece = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  
  const project = projectData.find(p => p.id.toString() === id);

  // 2. 初始化主圖狀態 (如果 JSON 沒 images，就用原本的預設圖)
  const [mainImage, setMainImage] = useState(
    project?.images?.[0] || `${import.meta.env.BASE_URL}/${project?.title}.png`
  );

  if (!project) {
    return <div className="container py-5">找不到該作品</div>;
  }

  return (
    <div className="piece-page">
      {/* --- START: 強烈感-浮雕霓虹背景特效 --- */}
      <div className="aesthetic-bg">
        {/* 1. 全域雜訊質感 (讓白色不生硬，像紙張) */}
        <div className="grain-overlay"></div>
        
        {/* 2. 極細動態格線 (像建築圖紙) */}
        <div className="thin-lines"></div>

        {/* 3. 漂浮的幾何色塊 (低飽和度，像水彩渲染) */}
        <div className="soft-blob blob-top"></div>
        <div className="soft-blob blob-bottom"></div>

        {/* 4. 文青標誌性裝飾：圓點矩陣與編號 */}
        <div className="deco-dots"></div>
        <div className="deco-text">PROJECT_DETAIL_Nº{project.id}</div>
      </div>
      <div className="container py-5 position-relative z-index-1">
        {/* 優化返回按鈕：直接使用 button 配合 navigate 邏輯更清晰 */}
        <button 
          className="btn btn-outline-primary mb-4" 
          onClick={() => navigate(-1)}
        >
          ← 返回作品集
        </button>
        
        <div className="row">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-3">{project.title}</h1>
            <p className="lead text-secondary mb-4">{project.desc}</p>
            
            {/* --- 大圖展示區 --- */}
            <div className="img-container border overflow-hidden rounded-4 shadow-sm mb-3">
              <img 
                src={mainImage} 
                alt={project.title} 
                className="img-fluid w-100 object-fit-cover" 
                style={{ transition: '0.3s', aspectRatio: '1/1' }} // 依需求調整比例
              />
            </div>

            {/* --- 下方縮圖列表 --- */}
            {project.images && (
              <div 
                className="d-flex gap-2 mb-4 overflow-auto pb-2" 
              >
                {project.images.map((img, index) => (
                  <button
                    key={index}
                    className="p-0 border-0 bg-transparent flex-shrink-0" // 加上 flex-shrink-0 防止圖片被壓縮
                    onClick={() => setMainImage(img)}
                    style={{ width: '80px', height: '80px' }}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index}`}
                      className={`img-fluid rounded-2 object-fit-cover w-100 h-100 ${
                        mainImage === img ? 'border border-2 border-primary' : 'border border-2 opacity-75'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <h4 className="fw-bold mb-3">專案開發核心</h4>
              <hr className="opacity-10" />
              
              <div className="mb-4 p-3 rounded-3 bg-light border-start border-primary border-4">
                <p className="fw-bold text-dark mb-2">
                  <i className="bi bi-lightbulb-fill text-warning me-2"></i>開發動機
                </p>
                <p className="text-secondary small lh-lg mb-0">{project.motivation}</p>
              </div>

              <div className="mb-4">
                <p className="fw-bold text-dark mb-2">
                  <i className="bi bi-cpu-fill text-primary me-2"></i>技術重點與解決方案
                </p>
                <p className="text-secondary small lh-lg" style={{ whiteSpace: 'pre-line' }}>
                  {project.function}
                </p>
              </div>

              {/* --- 挑戰與克服整合區塊 --- */}
              <div className="mb-4 p-4 rounded-4 bg-primary-subtle bg-opacity-10 border border-primary border-opacity-10">
                <div className="mb-3">
                  <p className="fw-bold text-dark mb-2 d-flex align-items-center">
                    <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                    面臨挑戰
                  </p>
                  <p className="text-secondary small lh-lg mb-0" style={{ whiteSpace: 'pre-line' }}>
                    {project.challenge}
                  </p>
                </div>

                <hr className="my-3 opacity-10" />

                <div>
                  <p className="fw-bold text-dark mb-2 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    解決方案
                  </p>
                  <p className="text-secondary small lh-lg mb-0" style={{ whiteSpace: 'pre-line' }}>
                    {project.overcome}
                  </p>
                </div>
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
    </div>
  );
};

export default Piece;
