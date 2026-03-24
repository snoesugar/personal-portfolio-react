import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. 標題大字進場
      gsap.from(".about-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      // 2. 區塊交錯淡入
      const sections = gsap.utils.toArray(".about-section");
      sections.forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. 技能標籤噴發效果
      gsap.from(".skill-tag", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 90%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-page bg-white text-dark">
      {/* --- Section 1: Hero (核心理念) --- */}
      <section className="vh-100 d-flex align-items-center justify-content-center px-4 bg-light position-relative overflow-hidden">
        <div className="text-center position-relative z-2">
          <span className="text-primary fw-bold mb-2 d-block">Food Science Tech × Frontend Engineering</span>
          <h1 className="display-2 fw-bold about-title mb-4">
            以品管的嚴謹<br />
            <span className="text-primary text-outline">建構穩健的數位體驗</span>
          </h1>
          <p className="lead text-secondary mx-auto">
            具備食品研發與品管背景的「嚴謹型工程師」。<br />
            我將對規格的極致追求轉化為代碼的強健性，專注於打造兼具系統邏輯與高品質體驗的前端架構。
          </p>
        </div>
      </section>

      {/* --- Section 2: 職人背景 (跨領域沉澱) --- */}
      <section className="about-section py-9 container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="display-6 fw-bold mb-4">跨領域的專業沉澱</h2>
            <p className="text-muted lead">
              過去在食品產業（大成集團、興霖食品）擔任品管與研發專員，這磨練了我對「規格」的極致追求。
            </p>
            <div className="mt-4">
              <div className="mb-4">
                <h5 className="fw-bold text-primary"><i className="bi bi-shield-check me-2"></i>品管經驗</h5>
                <p className="small text-secondary ps-4 border-start">養成對細節的極致敏銳度。深知微小數據偏差可能影響產品安全，這使我對代碼的 Debug 與邊界測試具備天然的警覺性。</p>
              </div>
              <div>
                <h5 className="fw-bold text-primary"><i className="bi bi-lightbulb me-2"></i>研發經驗</h5>
                <p className="small text-secondary ps-4 border-start">習得透過科學實驗尋找最優解。在「定義目標、反覆測試、優化效能」的過程，與優化渲染效能及組件邏輯的本質完全一致。</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="bg-dark text-white p-5 rounded-5 shadow-2xl position-relative">
              <div className="mb-4">
                <span className="badge bg-primary mb-2">科學佐證</span>
                <h4 className="fw-bold">反應曲面法 (RSM)</h4>
                <p className="text-white-50 small">獨立完成碩士論文的過程中，我學會如何在複雜數據中找出規律。現在，我將這份「數據導向思維」應用於 <strong>React 狀態管理</strong> 與 <strong>渲染效能優化</strong>，將複雜的業務邏輯數位化、結構化。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: 商業邏輯 (超市背景) --- */}
      <section className="about-section py-9 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4">超市經營鍛鍊的<br/>商業邏輯</h2>
              <p className="text-white-50">
                成長於家族經營超市，讓我早於同齡人理解「系統效率」與「使用者心理」。
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 border border-secondary rounded-4 h-100 advantage-card">
                    <h4 className="text-primary h5 fw-bold">高頻變動的狀態管理</h4>
                    <p className="small mb-0 text-white-50">如同超市庫存管理需應對龐大的進銷存波動，網頁的資料結構必須具備高擴展性，才能應付高頻次的業務數據更新。</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 border border-secondary rounded-4 h-100 advantage-card">
                    <h4 className="text-primary h5 fw-bold">使用者決策動線</h4>
                    <p className="small mb-0 text-white-50">從消費者貨架路徑出發，思考 UI 介面的資訊層級。透過優化操作流程降低阻力，直接提升產品的轉單率與作業效率。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: 辦公效率與工具 --- */}
      <section className="about-section py-9 container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <h2 className="fw-bold mb-4">數據處理與<br/>視覺化呈現能力</h2>
            <p className="text-muted">除開發技能外，具備強大的辦公效率工具應用能力，能將複雜資訊轉化為直覺的視覺化報告。</p>
          </div>
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-md-6">
                <h6 className="fw-bold"><i className="bi bi-file-earmark-bar-graph me-2"></i>數據視覺化</h6>
                <p className="small text-secondary">精通 Microsoft Office (Excel 樞紐分析) 與專業繪圖軟體 <strong>SigmaPlot</strong>，能精準佈局科學數據圖表。</p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold"><i className="bi bi-palette me-2"></i>多媒體排版設計</h6>
                <p className="small text-secondary">熟練操作 <strong>Canva</strong> 進行技術文件視覺化、簡報設計與平面排版，提升技術文件與展示的產出品質。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: 核心技術實力  --- */}
      <section className="about-section py-9 bg-white">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="fw-bold mb-3">網頁開發技術</h2>
            <div className="bg-primary mx-auto mb-4" style={{ width: '50px', height: '4px' }}></div>
          </div>
          
          <div className="row g-4 tech-grid">
            {/* 前端核心 */}
            <div className="col-lg-4 tech-card">
              <div className="p-4 h-100 border-start border-4 border-primary bg-light shadow-sm">
                <h5 className="fw-bold mb-3"><i className="bi bi-code-slash me-2"></i>前端核心開發</h5>
                <ul className="list-unstyled small text-secondary lh-lg">
                  <li><strong>語言與框架：</strong>React, JavaScript (ES6+), HTML5/CSS3</li>
                  <li><strong>樣式與動態：</strong>SASS(SCSS), GSAP 高互動動畫</li>
                  <li><strong>建置管理：</strong>Vite, Git/GitHub 版本控管</li>
                </ul>
              </div>
            </div>

            {/* UI 實作 */}
            <div className="col-lg-4 tech-card">
              <div className="p-4 h-100 border-start border-4 border-primary bg-light shadow-sm">
                <h5 className="fw-bold mb-3"><i className="bi bi-layout-sidebar-inset me-2"></i>UI 互動與樣式</h5>
                <ul className="list-unstyled small text-secondary lh-lg">
                  <li><strong>CSS 體系：</strong>Bootstrap 5, Tailwind CSS</li>
                  <li><strong>響應式設計：</strong>RWD 獨立切版與跨裝置優化</li>
                  <li><strong>相容性處理：</strong>跨瀏覽器不穩定痛點調修</li>
                </ul>
              </div>
            </div>

            {/* 軟實力 */}
            <div className="col-lg-4 tech-card">
              <div className="p-4 h-100 border-start border-4 border-primary bg-light shadow-sm">
                <h5 className="fw-bold mb-3"><i className="bi bi-cpu-fill me-2"></i>軟實力與工程思維</h5>
                <ul className="list-unstyled small text-secondary lh-lg">
                  <li><strong>QA/QC 思維：</strong>邏輯除錯與邊界條件測試</li>
                  <li><strong>跨部門轉譯：</strong>技術需求與非技術部門對接</li>
                  <li><strong>SOP 化開發：</strong>確保代碼一致性與可維護性</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 6: 具體事實 (專案成果) --- */}
      <section className="about-section py-9 container">
        <div className="text-center mb-6">
          <h2 className="fw-bold mb-3">具體事實與技術實力</h2>
          <div className="bg-primary mx-auto" style={{ width: '40px', height: '4px' }}></div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light p-4">
              <h3 className="h1 fw-bold text-primary-emphasis opacity-25">01</h3>
              <h5 className="fw-bold">團隊發表人</h5>
              <p className="small text-secondary">於 AAPD [Mofu-Diary] 專案擔任核心開發者與技術發表人，成功解決多項 Git 衝突與環境配置問題。</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light p-4">
              <h3 className="h1 fw-bold text-primary-emphasis opacity-25">02</h3>
              <h5 className="fw-bold">專業培訓與認證</h5>
              <p className="small text-secondary">2025-2026 完成六角學院三大直播班，精通 React, JS, Web Layout，並於 GitHub 累積 6 項高完整度的實戰專案。</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light p-4">
              <h3 className="h1 fw-bold text-primary-emphasis opacity-25">03</h3>
              <h5 className="fw-bold">永續維護</h5>
              <p className="small text-secondary">導入 SCSS 模組化與 React 組件化開發，並深入優化 Vite 環境配置，解決靜態資源與跨裝置不穩定痛點。</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 7: 結語與標籤 --- */}
      <section className="about-section py-12 bg-light overflow-hidden">
        <div className="container text-center skills-container">
          <div className="text-center mb-6">
            <h2 className="fw-bold mb-3">每一行代碼，都是對品質的承諾</h2>
            <div className="bg-primary mx-auto" style={{ width: '40px', height: '4px' }}></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="text-secondary mb-5">
                我擅長將繁瑣的跨部門需求轉譯為簡潔的技術實現方案。曾面對麥當勞、全家等大客戶客訴處理的經歷，讓我成為開發團隊與客戶/設計師之間最穩定的橋樑。
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {["React / Redux", "Vite / SCSS", "跨職能溝通", "系統化思考", "數據導向", "Git 衝突管理", "品質管理",  
                  "Debug 敏銳度", "SOP 文檔撰寫", "Git Version Control", "高品質代碼"].map(tag => (
                  <span key={tag} className="badge skill-tag bg-white text-dark border px-4 py-2 rounded-pill shadow-sm">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;