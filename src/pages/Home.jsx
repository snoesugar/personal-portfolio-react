import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom"; // 用於導向 About 頁面
import projectData from "../data/projects.json";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import HomeProjectCard from "../components/HomeProjectCard";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".home-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });
      // 1. Hero 進場
      gsap.from(".hero-content", { y: 60, opacity: 0, duration: 1, ease: "power3.out" });

      // 2. 核心價值卡片交錯進場 (New!)
      gsap.from(".value-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 80%",
        }
      });

      // 3. Swiper 容器進場
      gsap.from(".my-swiper-container", {
        y: 80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".my-swiper-container",
          start: "top 85%",
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="container-fluid p-0 bg-white">
      {/* Hero Section */}
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center hero-content px-3">
          <span className="text-primary fs-7 fw-bold tracking-widest mb-3 d-block text-uppercase about-content">
            <i className="bi bi-hexagon me-2"></i>CORE DEV & FOOD SCIENTIST
          </span>
          <h1 className="display-1 fw-bold mb-4 home-title">精密轉譯<br/>數位體驗</h1>
          <p className="lead text-secondary mx-auto mb-5">
            擁有食品研發與品管背景的嚴謹工程師，擅長以系統化邏輯與數據思維，打造易於維護且兼具高品質的前端網頁。
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a href="#portfolio" className="btn btn-primary rounded-pill px-5 py-2">精選作品庫</a>
            <Link to="/about" className="btn btn-outline-primary rounded-pill px-5 py-2">我的轉職故事</Link>
          </div>
        </div>
      </section>

      {/* 核心價值區塊 */}
      <section className="values-section py-6 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 value-card text-center">
              <div className="p-4 h-100">
                <div className="display-6 mb-3">🧪</div>
                <h5 className="fw-bold">品管等級的嚴謹</h5>
                <p className="small text-secondary">深知微小數據偏差可能影響產品安全，這使我對代碼 Debug 與邊界測試具備天然的警覺性。</p>
              </div>
            </div>
            <div className="col-md-4 value-card text-center">
              <div className="p-4 h-100">
                <div className="display-6 mb-3">🛒</div>
                <h5 className="fw-bold">超市經營的商務感</h5>
                <p className="small text-secondary">網頁資料結構如同庫存管理，須高度組織化；介面動線則以提升轉單率為核心目標。</p>
              </div>
            </div>
            <div className="col-md-4 value-card text-center">
              <div className="p-4 h-100">
                <div className="display-6 mb-3">📊</div>
                <h5 className="fw-bold">數據轉譯的能力</h5>
                <p className="small text-secondary">擅長將複雜數據轉化為結構化資訊，實現從「後端邏輯」到「使用者體驗」的完美銜接。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 作品集區塊 */}
      <section id="portfolio" className="container py-9 overflow-hidden">
        <div className="col-12 text-center mb-5">
          <h2 className="display-5 fw-bold mt-3">作品集</h2>
          <div className="bg-primary mx-auto mt-2" style={{ width: '40px', height: '4px' }}></div>
        </div>
        <div className="my-swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Mousewheel]}
            spaceBetween={30}
            slidesPerView={1}
            mousewheel={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            className="pb-5"
          >
            {projectData.map((proj) => (
              <SwiperSlide key={proj.id} className="h-auto">
                <HomeProjectCard proj={proj} /> 
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-9 bg-dark text-white text-center">
        <div className="container">
          <h2 className="display-4 fw-bold mb-4">追求穩定，但不止於穩定。</h2>
          <p className="lead text-white-50 mb-5">每一行代碼都經過品管檢視，確保您的數位產品不僅美觀，更加可靠。</p>
          <Link to="/skills" className="btn btn-primary rounded-pill px-5 py-3 fw-bold">深入瞭解我的技術實力</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;