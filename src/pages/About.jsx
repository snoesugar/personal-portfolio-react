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
          <span className="text-primary fw-bold tracking-widest mb-2 d-block">QUALITY CONTROL × FRONT-END</span>
          <h1 className="display-2 fw-bold about-title mb-4">
            精密轉譯<br />
            <span className="text-primary text-outline">數位產品的每一行代碼</span>
          </h1>
          <p className="lead text-secondary max-w-lg mx-auto">
            「擁有食品研發與品管背景的嚴謹工程師，擅長以系統化邏輯與數據思維，打造高品質的前端網頁。」
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
                <p className="text-white-50 small">曾利用反應曲面法成功找出金針菇飲品最優發酵配方，並獨立完成碩士論文。這種「數據導向」的優化思維，現在被我應用於前端狀態管理與效能調優中。</p>
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
                除了實驗室的嚴謹，成長於家族經營超市的環境，讓我從小就對「商業流轉」有直覺的理解。一個成功的系統必須具備：
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 border border-secondary rounded-4 h-100 advantage-card">
                    <h4 className="text-primary h5 fw-bold">營運效率</h4>
                    <p className="small mb-0 text-white-50">如同超市的庫存管理，網頁的資料結構與狀態管理須高度組織化，才能因應高頻次的業務變動。</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 border border-secondary rounded-4 h-100 advantage-card">
                    <h4 className="text-primary h5 fw-bold">使用者動線</h4>
                    <p className="small mb-0 text-white-50">習慣從消費者的購物路徑出發，思考如何透過前端介面優化，降低使用者操作阻力。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: 具體事實 (專案成果) --- */}
      <section className="about-section py-9 container">
        <div className="text-center mb-6">
          <h2 className="fw-bold mb-3">具體事實佐證</h2>
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
              <h5 className="fw-bold">SOP 精神</h5>
              <p className="small text-secondary">品管經驗使我習慣編寫清晰的 SOP。在開發中能確保專案一致性與可維護性，大幅提升團隊協作效率。</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 bg-light p-4">
              <h3 className="h1 fw-bold text-primary-emphasis opacity-25">03</h3>
              <h5 className="fw-bold">永續維護</h5>
              <p className="small text-secondary">深入研究 Vite 與 SCSS 模組化，解決靜態資源載入與跨裝置不穩定痛點，實現代碼的永續開發。</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: 結語與標籤 --- */}
      <section className="about-section py-12 bg-light overflow-hidden">
        <div className="container text-center skills-container">
          <h2 className="fw-bold mb-5">從數據中找到開發的樂趣</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="text-secondary mb-5">
                我致力於將後端複雜數據，轉化為使用者直覺、順暢且好用的網頁介面。每一行代碼，都是我對品質的承諾。
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {["溝通轉譯", "系統化思考", "高品質代碼", "數據導向", "React 實戰", "Git 衝突管理", "品質管理 DNA"].map(tag => (
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