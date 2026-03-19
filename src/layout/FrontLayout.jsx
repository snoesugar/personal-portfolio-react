import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const FrontLayout = () => {
  const navRef = useRef(null);
  const linkRef = useRef([]); // 用來存放多個 nav-item 的參考

  // 定義導覽項目
  const navItems = [
    { name: "自我介紹", path: "/about" },
    { name: "作品集", path: "/portfolio" },
    { name: "技術細節", path: "/skills" }, // 可選，或改為你想放的項目
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. 整條 Navbar 下降
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // 2. 項目交錯浮現 (Stagger)
    tl.fromTo(linkRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4" // 提早 0.4 秒開始，讓動畫更流暢
    );
  }, []);

  return (
    <>
      <nav ref={navRef} className="navbar navbar-expand-lg fixed-top bg-white navbar-custom shadow-sm">
        <div className="container">
          {/* Logo 區塊 */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src={`${import.meta.env.BASE_URL}logo-aloha.svg`} 
              alt="logo" 
              style={{ height: '35px', marginRight: '10px' }} 
            />
            <span className="fw-bold tracking-wider" style={{ letterSpacing: '1px' }}>YU LIN Portfolio</span>
          </Link>
          
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {navItems.map((item, index) => (
                <li 
                  className="nav-item" 
                  key={item.name}
                  ref={(el) => (linkRef.current[index] = el)}
                >
                  <Link className="nav-link px-3 py-2 mx-1" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* 亮點按鈕：聯絡我 */}
              <li className="nav-item ms-lg-3" ref={(el) => (linkRef.current[navItems.length] = el)}>
                <button className="btn btn-outline-dark rounded-pill px-4 btn-sm fw-bold">
                  CONTACT
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="pt-13">
        <Outlet />
      </main>
    </>
  );
};

export default FrontLayout;