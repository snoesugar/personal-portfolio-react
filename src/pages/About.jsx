import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- Section 1: Hero (優雅淡入) ---
      const tlHero = gsap.timeline();
      tlHero.from(".about-title", { y: 80, opacity: 0, duration: 1.2, ease: "power4.out" })
            .from(".about-content", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
            .from(".about-tag", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");

      // --- Section 2: 轉職契機 (橫向交錯滑入) ---
      // 讓三個卡片從左右兩邊往中間靠攏
      const transitionCards = gsap.utils.toArray(".about-section:nth-of-type(2) .hover-up");
      transitionCards.forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -100 : 100, // 偶數從左，奇數從右
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      gsap.fromTo(".about-tag", 
        { 
          filter: "brightness(5) blur(10px)",
          opacity: 0 
        }, 
        { 
          filter: "brightness(1) blur(0px)",
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut"
        }
      );

      // --- Section 3: 職人背景 (3D 翻轉效果) ---
      // 模擬品管的「翻開檢驗」感
      gsap.from(".about-section:nth-of-type(3) .bg-dark", {
        rotationY: -45,
        rotationX: 10,
        opacity: 0,
        duration: 1.5,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ".about-section:nth-of-type(3)",
          start: "top 70%",
        }
      });

      // --- Section 4: 商業邏輯 (深色區塊：拉簾式進場) ---
      gsap.fromTo(".advantage-card", 
        {
          y: 60,         // 起始位置（稍微縮小一點距離，避免過度位移）
          opacity: 0,
          visibility: "hidden" // 初始隱藏，防止閃爍
        },
        {
          y: 0,          // 回到原始排版位置
          opacity: 1,
          visibility: "visible",
          stagger: 0.2,
          duration: 1,
          ease: "power3.out", // expo.out 有時太快，power3 較平穩
          scrollTrigger: {
            trigger: ".about-section:nth-of-type(4)",
            start: "top 80%",
            // 建議加上這行，確保排版計算完成後再觸發
            invalidateOnRefresh: true, 
          }
        }
      );

      // --- Section 5: 辦公效率 (文字分行進場) ---
      gsap.from(".about-section:nth-of-type(5) h2, .about-section:nth-of-type(5) .col-md-6", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-section:nth-of-type(5)",
          start: "top 80%",
        }
      });

      // --- Section 6: 核心技術 (網格縮放進場) ---
      gsap.from(".tech-card", {
        scale: 0.9,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 80%",
        }
      });

      // --- Section 7: 專案成果 (數字跳動感) ---
      const projectCards = gsap.utils.toArray(".about-section:nth-of-type(7) .card");
      projectCards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: i % 2 === 0 ? 40 : -40, // 上下交錯
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });
      });

      // --- Section 8: 技能標籤 (噴發效果：保持原本最棒的設計) ---
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
    <div ref={containerRef} className="about-page bg-white text-dark overflow-hidden">
      {/* --- Section 1: Hero (核心理念) --- */}
      <section className="vh-100 d-flex align-items-center justify-content-center px-4 position-relative overflow-hidden">
        {/* 背景閃爍層 */}
        <div className="about-bg">
          <div className="bg-image"></div>
        </div>
        
        <div className="text-center position-relative z-2">
          {/* 1. 專業標籤：縮小並增加字距，提升精緻度 */}
          <span className="text-primary fs-7 fw-bold tracking-widest mb-3 d-block text-uppercase about-content">
            <i className="bi bi-flask me-2"></i>Food Science Tech × Frontend Engineering
          </span>

          {/* 2. 主標題：加強「嚴謹」與「數位體驗」的對比 */}
          <h1 className="display-2 fw-bold about-title mb-4 lh-sm">
            以品管的<span className="text-primary shimmer-text">嚴謹</span><br />
            建構穩健的數位體驗
          </h1>

          {/* 3. 自我介紹：拆分段落，讓閱讀有呼吸感 */}
          <div className="about-text-content about-content">
            <p className="lead text-dark fw-bold mb-2">
              我是 邱煜琳 (Yu-Lin)
            </p>
            
            <p className="text-secondary mx-auto mb-4 lh-lg">
              從大成、興霖食品的<strong>品管與研發</strong>現場，轉身投入程式邏輯的建構。<br />
              我將對規格的零容忍態度，轉化為對代碼強健性的極致追求。
            </p>

            {/* 4. 轉職金句：用更輕量的樣式突顯核心動機 */}
            <p className="fst-italic text-primary border-top border-bottom py-3 d-inline-block px-4 about-tag">
              「比起調配一個新口味，我更嚮往開發一個好用的數位產品。」
            </p>
          </div>
        </div>
      </section>

      {/* --- Section: 轉職契機 --- */}
      <section className="about-section py-9 bg-light">
        <div className="container">
          {/* 標題區：增加副標題層次 */}
          <div className="row justify-content-center text-center mb-6">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill">Career Transition</span>
              <h2 className="display-6 fw-bold mb-3">從「調配味道」到「建構邏輯」</h2>
              <p className="text-secondary">這不是一次衝動的選擇，而是一場對個人職能天賦的深度探索。</p>
            </div>
          </div>

          <div className="row g-4">
            {/* 轉向原因 1：環境與工具 */}
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-0 position-relative overflow-hidden hover-up">
                <div className="mb-4">
                  <i className="bi bi-geo-alt-fill text-primary fs-3"></i>
                </div>
                <h5 className="fw-bold mb-3">場域與本質的覺察</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="small text-muted border-start ps-3 py-1">
                    <span className="text-dark fw-bold">過去：</span>偏遠工廠巡檢與體力作業
                  </div>
                  <div className="small text-primary border-start border-primary ps-3 py-1 bg-primary-subtle bg-opacity-10">
                    <span className="fw-bold">嚮往：</span>數位工作的心流狀態與數據處理
                  </div>
                </div>
                <p className="small text-muted mt-3">
                  我發現比起傳統工廠環境，我更能沉浸在「處理統計數據」與「撰寫技術報告」的專注感中。
                </p>
              </div>
            </div>

            {/* 轉向原因 2：職能天賦 */}
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-0 position-relative overflow-hidden hover-up">
                <div className="mb-4">
                  <i className="bi bi-diagram-3 text-primary fs-3"></i>
                </div>
                <h5 className="fw-bold mb-3">感性 vs 理性的抉擇</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="small text-muted border-start ps-3 py-1">
                    <span className="text-dark fw-bold">過去：</span>主觀且模糊的口味開發
                  </div>
                  <div className="small text-primary border-start border-primary ps-3 py-1 bg-primary-subtle bg-opacity-10">
                    <span className="fw-bold">優勢：</span>結構化的視覺呈現與文檔邏輯
                  </div>
                </div>
                <p className="small text-muted mt-3">
                  在研發職位時，我體認到自己對「結構化資訊」具備更高的敏銳度，擅長將複雜數據轉為直覺呈現。
                </p>
              </div>
            </div>

            {/* 轉向原因 3：價值成就 */}
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-0 position-relative overflow-hidden hover-up">
                <div className="mb-4">
                  <i className="bi bi-code-square text-primary fs-3"></i>
                </div>
                <h5 className="fw-bold mb-3">成就感的核心來源</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="small text-muted border-start ps-3 py-1">
                    <span className="text-dark fw-bold">過去：</span>暫時性的味覺開發滿足
                  </div>
                  <div className="small text-primary border-start border-primary ps-3 py-1 bg-primary-subtle bg-opacity-10">
                    <span className="fw-bold">現況：</span>從無到有建構產品的長效動力
                  </div>
                </div>
                <p className="small text-muted mt-3">
                  開發新口味的滿足感稍縱即逝；但解決 Bug、建構網頁的成就感，卻能支撐我不斷挑戰技術邊界。
                </p>
              </div>
            </div>
          </div>
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