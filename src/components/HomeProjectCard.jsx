import BrowserMockup from "../components/BrowserMockup";

// --- 作品卡片組件 ---
const HomeProjectCard = ({ proj }) => {
  const placeholderImg = `${import.meta.env.BASE_URL}${proj.title}.png`;
  return (
    <div className="h-100 w-100 d-flex">
      <div className="card project-card w-100 position-relative border-0 shadow-sm-hover">
        <div className="card-img-wrapper p-3 bg-light rounded-4">
          <BrowserMockup img={placeholderImg} url={proj.url} />
        </div>
        <div className="card-body p-4 pt-0 d-flex flex-column flex-grow-1">
          <h4 className="fw-bold mt-4 text-uppercase">{proj.title}</h4>
          <p className="text-secondary small line-clamp-2 mb-3">{proj.desc}</p>
          <div className="mb-4 d-flex flex-wrap gap-2">
            {proj.tags.map(tag => <span key={tag} className="badge border text-secondary rounded-pill px-2 py-1 fw-normal">{tag}</span>)}
          </div>
          <div className="mt-auto">
            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm rounded-pill px-4 fw-bold stretched-link">Live Demo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProjectCard
