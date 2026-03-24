import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. 標題與副標題進場
      gsap.from(".skills-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 85%",
        }
      });

      // 2. 技術卡片交錯飛入效果
      gsap.from(".tech-card-wrapper", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tech-grid-container",
          start: "top 80%",
        }
      });

      // 3. 底部亮點區塊
      gsap.from(".highlight-box", {
        scaleX: 0,
        opacity: 0,
        duration: 1.2,
        transformOrigin: "left",
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".highlight-box",
          start: "top 90%",
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="skills-page-wrapper bg-white py-9">
      <div className="container">
        {/* --- Header: 核心精神 --- */}
        <div className="skills-header text-center mb-9">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">Technical Proficiency</span>
          <h2 className="display-5 fw-bold text-dark mb-4">技術棧與實戰解法</h2>
          <p className="text-secondary max-w-2xl mx-auto lead">
            我不只是編寫代碼，更致力於透過「研發思維」優化效能，<br className="d-none d-md-block" />
            並以「品管精神」確保代碼的永續與維護。
          </p>
        </div>

        {/* --- Grid: 技術矩陣 --- */}
        <div className="row g-4 tech-grid-container">
          
          {/* 1. 前端核心 (Core) */}
          <div className="col-lg-4 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 transition-all">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-box bg-primary text-white rounded-3 p-3 me-3">
                  <i className="bi bi-cpu fs-4"></i>
                </div>
                <h4 className="fw-bold mb-0">核心開發 (Core)</h4>
              </div>
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <h6 className="fw-bold mb-1 text-primary">React / JavaScript (ES6+)</h6>
                  <p className="small text-muted mb-0">擅長組件化開發與 Hook 邏輯拆解，將複雜業務數位化與結構化。</p>
                </li>
                <li>
                  <h6 className="fw-bold mb-1 text-primary">SASS (SCSS) 模組化</h6>
                  <p className="small text-muted mb-0">建立系統化的樣式架構，確保大型專案的一致性與可維護性。</p>
                </li>
              </ul>
              <div className="mt-auto pt-4">
                <div className="small bg-light p-2 rounded border-start border-3 border-primary">
                  <span className="text-dark fw-bold">實戰解法：</span>
                  <span className="text-secondary italic ps-1">降低長期維護成本。</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 工程思維 (Engineering) */}
          <div className="col-lg-4 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 transition-all">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-box bg-success text-white rounded-3 p-3 me-3">
                  <i className="bi bi-gear-wide-connected fs-4"></i>
                </div>
                <h4 className="fw-bold mb-0">建置與協作</h4>
              </div>
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <h6 className="fw-bold mb-1 text-success">Vite 環境配置</h6>
                  <p className="small text-muted mb-0">深入研究打包機制，解決靜態資源引用與跨裝置部署不穩定痛點。</p>
                </li>
                <li>
                  <h6 className="fw-bold mb-1 text-success">Git 版本控管與衝突管理</h6>
                  <p className="small text-muted mb-0">具備多人協作經驗，能冷靜執行版本還原並解決多人衝突問題。</p>
                </li>
              </ul>
              <div className="mt-auto pt-4">
                <div className="small bg-light p-2 rounded border-start border-3 border-success">
                  <span className="text-dark fw-bold">實戰解法：</span>
                  <span className="text-secondary italic ps-1">確保從開發到部署的穩定。</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 品質保證 (QA/QC) */}
          <div className="col-lg-4 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 transition-all">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-box bg-warning text-dark rounded-3 p-3 me-3">
                  <i className="bi bi-clipboard2-check fs-4"></i>
                </div>
                <h4 className="fw-bold mb-0">品質保證 (QA/QC)</h4>
              </div>
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <h6 className="fw-bold mb-1 text-warning-emphasis">邏輯除錯與邊界測試</h6>
                  <p className="small text-muted mb-0">承襲品管敏銳度，針對 UI/UX 進行嚴謹的互動檢查與 Edge Case 測試。</p>
                </li>
                <li>
                  <h6 className="fw-bold mb-1 text-warning-emphasis">SOP 技術文件撰寫</h6>
                  <p className="small text-muted mb-0">堅持編寫清晰的 README 與 Code Comment，打造高品質的工程環境。</p>
                </li>
              </ul>
              <div className="mt-auto pt-4">
                <div className="small bg-light p-2 rounded border-start border-3 border-warning">
                  <span className="text-dark fw-bold">實戰解法：</span>
                  <span className="text-secondary italic ps-1">減少 Bug 率，提升交付品質。</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- Footer Highlight: 核心金句 --- */}
        <div className="highlight-box mt-12 p-5 bg-dark text-white rounded-5 shadow-lg position-relative overflow-hidden">
          <div className="row align-items-center position-relative z-2">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-2 text-primary">「從實驗室走向瀏覽器，精確是我的核心語言。」</h3>
              <p className="text-white-50 mb-0">結合科學邏輯與商業洞察，我擅長將繁瑣的需求轉譯為穩定、直覺且高效的數位解決方案。</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link to="/portfolio" className="btn btn-outline-primary btn-lg rounded-pill px-5 transition-all">
                查看實戰專案
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;