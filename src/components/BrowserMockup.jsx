// --- 瀏覽器 Mockup 組件 ---
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
            Image Missing
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserMockup
