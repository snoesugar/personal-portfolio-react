import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

const NotFound = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/", { replace: true });
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  // --- 邏輯 2：負責「只跑一次」的進場與 404 漂浮動畫 ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 404 數字：無限重複的漂浮，不會被倒數影響
      gsap.to(".err-digit", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2
      });

      // 內容文字：進場時淡入一次
      gsap.from(".content-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- 邏輯 3：負責「隨秒數跳動」的數字縮放動畫 ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 只有倒數數字會每秒縮放一下
      gsap.fromTo(".countdown-text", 
        { scale: 1.6, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [countdown]);

  return (
    <div 
      ref={containerRef} 
      className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-white overflow-hidden"
    >
      <div className="text-center">
        {/* 視覺主體：404 數字 */}
        <div className="display-1 fw-bold text-primary mb-2 d-flex justify-content-center">
          <span className="err-digit d-inline-block">4</span>
          <span className="err-digit d-inline-block mx-2">0</span>
          <span className="err-digit d-inline-block">4</span>
        </div>

        <div className="content-fade">
          <h2 className="fw-bold mb-3">喔不！你進入了未知的領域</h2>
          
          <p className="text-secondary mb-4">
            別擔心，我們將在 
            <span 
              className="countdown-text h3 align-middle d-inline-block fw-bold text-danger mx-2" 
            >
              {countdown}
            </span> 
            秒後帶你回首頁。
          </p>

          <div className="d-flex gap-3 justify-content-center">
            <Link to="/" replace className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm fw-bold">
              立即回到首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;