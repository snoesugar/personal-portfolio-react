import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// 類別定義保持在外部 (Good Practice)
class LogicLine {
  constructor(canvasWidth, canvasHeight, gridSize, context) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.gridSize = gridSize;
    this.ctx = context;
    this.init();
  }

  init() {
    this.x = Math.floor(Math.random() * (this.canvasWidth / this.gridSize)) * this.gridSize;
    this.y = Math.floor(Math.random() * (this.canvasHeight / this.gridSize)) * this.gridSize;
    this.length = Math.random() * 100 + 50;
    this.speed = Math.random() * 2 + 1;
    this.opacity = 0;
    this.color = Math.random() > 0.5 ? "#8fb49d" : "#fbb376";
    this.vertical = Math.random() > 0.5;
  }

  draw() {
    const c = this.ctx;
    if (!c) return; // 安全檢查
    c.beginPath();
    c.strokeStyle = this.color;
    c.globalAlpha = this.opacity;
    c.lineWidth = 1;
    if (this.vertical) {
      c.moveTo(this.x, this.y);
      c.lineTo(this.x, this.y + this.length);
    } else {
      c.moveTo(this.x, this.y);
      c.lineTo(this.x + this.length, this.y);
    }
    c.stroke();
  }

  update() {
    this.opacity += 0.01;
    if (this.opacity > 0.3) {
      this.opacity = 0.3;
      if (this.vertical) this.y += this.speed;
      else this.x += this.speed;
    }
    // 檢查是否超出當前畫布邊界
    if (this.x > this.canvasWidth || this.y > this.canvasHeight) {
      this.init();
    }
  }
}

const Skills = () => {
  const componentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      const c = canvas.getContext("2d");
      let lines = [];
      const gridSize = 40;
      let animationFrameId;

      const initScene = () => {
        canvas.width = window.innerWidth;
        canvas.height = componentRef.current.offsetHeight;
        lines = [];
        for (let i = 0; i < 15; i++) {
          // 修正：傳入正確的參數
          lines.push(new LogicLine(canvas.width, canvas.height, gridSize, c));
        }
      };

      function render() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        // 繪製背景網格
        c.beginPath();
        c.strokeStyle = "rgba(0, 0, 0, 0.03)";
        c.lineWidth = 0.5;
        for (let x = 0; x < canvas.width; x += gridSize) {
          c.moveTo(x, 0); c.lineTo(x, canvas.height);
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          c.moveTo(0, y); c.lineTo(canvas.width, y);
        }
        c.stroke();

        lines.forEach(line => {
          line.update();
          line.draw();
        });
        
        animationFrameId = requestAnimationFrame(render);
      }

      initScene();
      render();

      const handleResize = () => {
        initScene();
      };
      window.addEventListener("resize", handleResize);

      // --- 進場動畫維持原樣 ---
      gsap.from(".skills-header", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-header", start: "top 85%" }
      });

      gsap.from(".tech-card-wrapper", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".tech-grid-container", start: "top 80%" }
      });

      gsap.from(".highlight-box", {
        scaleX: 0, opacity: 0, duration: 1.2, transformOrigin: "left", ease: "expo.out",
        scrollTrigger: { trigger: ".highlight-box", start: "top 90%" }
      });

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={componentRef} className="skills-page-wrapper bg-white py-10">
      {/* 背景 Canvas */}
      <canvas
        ref={canvasRef}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ pointerEvents: "none", zIndex: 0 }}
      />
      <div className="container position-relative z-index-1">
        {/* --- Header: 核心競爭力 --- */}
        <div className="skills-header text-center mb-10">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3 fw-bold">EXPERTISE & STACK</span>
          <h2 className="display-4 fw-bold text-dark mb-4">技術矩陣與實戰解法</h2>
          <p className="text-secondary mx-auto lead">
            將食品科學的<strong>嚴謹品管</strong>轉化為程式開發的<strong>品質防線</strong>。<br className="d-none d-md-block" />
            我專注於建構具備高度可擴充性、穩定資料流與極致互動體驗的 Web 應用。
          </p>
        </div>

        {/* --- Grid: 四大核心領域 --- */}
        <div className="row g-4 tech-grid-container mb-12">
          
          {/* 1. React 生態系與資料流 (Logic) */}
          <div className="col-md-6 col-lg-3 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift border-top border-primary border-4">
              <div className="mb-4 text-primary"><i className="bi bi-braces-asterisk fs-1"></i></div>
              <h4 className="fw-bold mb-3">React 核心實作</h4>
              <ul className="list-unstyled mb-0 small text-muted lh-lg">
                <li><i className="bi bi-check2-circle text-primary me-2"></i><strong>Redux Toolkit (RTK)</strong> 處理跨分頁全域狀態（如購物車、異步訊息）。</li>
                <li><i className="bi bi-check2-circle text-primary me-2"></i>整合 <strong>React Hook Form</strong> 實作複雜表單即時驗證機制。</li>
                <li><i className="bi bi-check2-circle text-primary me-2"></i><strong>RESTful API</strong> 高效串接與非同步資料處理（Axios）。</li>
                <li><i className="bi bi-check2-circle text-primary me-2"></i>自定義 <strong>Hooks</strong> 封裝，提升 UI 組件邏輯複用率。</li>
              </ul>
              <div className="d-flex gap-2 mt-auto pt-3 border-top">
                <span className="badge bg-light text-dark fw-normal border">Boardreams</span>
              </div>
            </div>
          </div>

          {/* 2. 視覺美學與動態交互 (UX/UI) */}
          <div className="col-md-6 col-lg-3 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift border-top border-success border-4">
              <div className="mb-4 text-success"><i className="bi bi-magic fs-1"></i></div>
              <h4 className="fw-bold mb-3">視覺動態交互</h4>
              <ul className="list-unstyled mb-0 small text-muted lh-lg">
                <li><i className="bi bi-check2-circle text-success me-2"></i><strong>GSAP (ScrollTrigger)</strong> 打造沉浸式滾動視差與轉場。</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i><strong>SASS 7-1 Pattern</strong> 結構化組織大型專案樣式系統。</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i><strong>EJS 樣板引擎</strong> 達成元件化開發，優化靜態頁面管理。</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i><strong>Responsive Design</strong> 達成像素級的 RWD 多裝置適應性。</li>
              </ul>
              <div className="d-flex gap-2 mt-auto pt-3 border-top">
                <span className="badge bg-light text-dark fw-normal border">WorkWay</span>
                <span className="badge bg-light text-dark fw-normal border">URBNSTEP</span>
              </div>
            </div>
          </div>

          {/* 3. 工程自動化與協作 (DevOps) */}
          <div className="col-md-6 col-lg-3 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift border-top border-info border-4">
              <div className="mb-4 text-info"><i className="bi bi-terminal-split fs-1"></i></div>
              <h4 className="fw-bold mb-3">工程自動化協作</h4>
              <ul className="list-unstyled mb-0 small text-muted lh-lg">
                <li><i className="bi bi-check2-circle text-info me-2"></i><strong>Vite / Gulp</strong> 配置優化，加速開發編譯與打包效能。</li>
                <li><i className="bi bi-check2-circle text-info me-2"></i><strong>Git Flow</strong> 團隊協作，熟練 PR 審核與衝突排解流程。</li>
                <li><i className="bi bi-check2-circle text-info me-2"></i><strong>ESLint / Prettier</strong> 強制執行代碼規範，降低維護門檻。</li>
                <li><i className="bi bi-check2-circle text-info me-2"></i><strong>GH-Pages / Deployment</strong> 自動化部署流程建置與排錯。</li>
              </ul>
              <div className="d-flex gap-2 flex-wrap mt-auto pt-3 border-top">
                <span className="badge bg-light text-dark fw-normal border">Boardreams</span>
                <span className="badge bg-light text-dark fw-normal border">Mofu-Diary</span>
                <span className="badge bg-light text-dark fw-normal border">Portfolio</span>
              </div>
            </div>
          </div>

          {/* 4. 資料分析與品質控管 (QA/QC) */}
          <div className="col-md-6 col-lg-3 tech-card-wrapper">
            <div className="card h-100 border-0 shadow-sm p-4 hover-lift border-top border-warning border-4">
              <div className="mb-4 text-warning"><i className="bi bi-clipboard-data fs-1"></i></div>
              <h4 className="fw-bold mb-3">品質與數據分析</h4>
              <ul className="list-unstyled mb-0 small text-muted lh-lg">
                <li><i className="bi bi-check2-circle text-warning me-2"></i><strong>Chart.js</strong> 數據視覺化，將複雜心情與商業資料圖表化。</li>
                <li><i className="bi bi-check2-circle text-warning me-2"></i><strong>Edge Case Testing</strong> 承襲品管經驗，執行嚴謹的邊界測試。</li>
                <li><i className="bi bi-check2-circle text-warning me-2"></i><strong>SOP Documentation</strong> 堅持編寫高品質 README 與註解。</li>
                <li><i className="bi bi-check2-circle text-warning me-2"></i><strong>Performance Tuning</strong> 針對網頁加載速度進行資源優化。</li>
              </ul>
              <div className="d-flex gap-2 mt-auto pt-3 border-top">
                <span className="badge bg-light text-dark fw-normal border">Mofu-Diary</span>
                <span className="badge bg-light text-dark fw-normal border">ZOBAA</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- 3. 新增：實戰挑戰與克服 (Challenge Section) --- */}
        <div className="challenge-section mb-12">
          <div className="text-center mb-8">
            <h2 className="display-4 fw-bold text-dark mb-4">實戰挑戰與對策</h2>
            <p className="text-secondary mx-auto lead">面對技術痛點，我如何透過工程化思維尋找最優解</p>
          </div>

          <div className="row g-4">
            {/* 挑戰 1: 狀態管理 */}
            <div className="col-lg-6 challenge-item">
              <div className="p-4 bg-light rounded-4 h-100 border-start border-primary border-5">
                <div className="d-flex align-items-start mb-3">
                  <span className="badge bg-primary me-2 mt-1">挑戰</span>
                  <h5 className="fw-bold mb-0">電商平台狀態同步與持久化 (Boardreams)</h5>
                </div>
                <p className="small text-secondary mb-3">隨著功能增加，Props Drilling 導致購物車資料流難以維護，且頁面重新整理後資料容易遺失。</p>
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">克服</span>
                  <p className="small text-dark mb-0 fw-medium">導入 <strong>Redux Toolkit (RTK)</strong> 統一全域狀態，並實作 <strong>LocalStorage 持久化機制</strong>，確保使用者操作體驗的連續性。</p>
                </div>
              </div>
            </div>

            {/* 挑戰 2: 多人協作與樣式衝突 */}
            <div className="col-lg-6 challenge-item">
              <div className="p-4 bg-light rounded-4 h-100 border-start border-info border-5">
                <div className="d-flex align-items-start mb-3">
                  <span className="badge bg-info me-2 mt-1">挑戰</span>
                  <h5 className="fw-bold mb-0">團隊協作下的樣式污染與 Git 衝突 (Mofu-Diary)</h5>
                </div>
                <p className="small text-secondary mb-3">多人並行開發時常發生 CSS 類名互相覆蓋，且 Git 合併時頻繁產生代碼衝突。</p>
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">克服</span>
                  <p className="small text-dark mb-0 fw-medium">建立專屬 <strong>Design System</strong> 與 <strong>SASS 變數規範</strong>，並擔任技術領頭實施 <strong>Git Flow 流程</strong>，成功將衝突發生率大幅降低。</p>
                </div>
              </div>
            </div>

            {/* 挑戰 3: 動效效能優化 */}
            <div className="col-lg-6 challenge-item">
              <div className="p-4 bg-light rounded-4 h-100 border-start border-success border-5">
                <div className="d-flex align-items-start mb-3">
                  <span className="badge bg-success me-2 mt-1">挑戰</span>
                  <h5 className="fw-bold mb-0">GSAP 動效在行動裝置的流暢度 (WorkWay)</h5>
                </div>
                <p className="small text-secondary mb-3">複雜的滾動觸發動畫在手機端出現卡頓感，且動畫生命週期管理不當導致記憶體洩漏。</p>
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">克服</span>
                  <p className="small text-dark mb-0 fw-medium">運用 <strong>gsap.context()</strong> 精確回收資源，並使用硬體加速與 <strong>ScrollTrigger 優化</strong>，達成全平台一致的絲滑體驗。</p>
                </div>
              </div>
            </div>

            {/* 挑戰 4: 模組化與重構 */}
            <div className="col-lg-6 challenge-item">
              <div className="p-4 bg-light rounded-4 h-100 border-start border-warning border-5">
                <div className="d-flex align-items-start mb-3">
                  <span className="badge bg-warning text-dark me-2 mt-1">挑戰</span>
                  <h5 className="fw-bold mb-0">靜態網頁架構的維護困難 (ZOBAA / URBNSTEP)</h5>
                </div>
                <p className="small text-secondary mb-3">原生開發時，重複的組件（Header/Footer）導致上百行重複代碼，修改難度極高。</p>
                <div className="d-flex align-items-start">
                  <span className="badge bg-success me-2 mt-1">克服</span>
                  <p className="small text-dark mb-0 fw-medium">導入 <strong>EJS 樣板引擎</strong> 實現前端組件化，將結構與資料解耦，提升了 50% 以上的維護效率與開發速度。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. 價值宣言 (Highlight Box) --- */}
        <div className="highlight-box mt-5 p-5 bg-dark text-white rounded-5 shadow-lg position-relative overflow-hidden">
          <div className="row align-items-center position-relative z-2">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-3 text-primary">「從實驗室走向瀏覽器，精確是我的核心語言。」</h3>
              <p className="text-white-50 mb-0 lead">
                結合食品科學碩士的邏輯洞察與前端工程的實踐力，我擅長在複雜的需求中理出秩序。
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link to="/portfolio" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold transition-all">
                檢視 6 大實戰成果 <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;