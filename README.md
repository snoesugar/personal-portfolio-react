# 🚀 Yulin's Personal Portfolio | 前端開發作品集

## 💡 關於我 (About Me)

你好，我是 **煜琳 (Yulin)**。
擁有食品科學碩士研究背景，我將實驗室追求「精準」與「再現性」的精神帶入前端開發。我擅長處理複雜的跨組件資料流、精準的型別約束與具備邏輯美感的程式架構。

具備 **React** 與 **Vue 3** 雙主流框架的實戰開發能力，能針對不同專案需求靈活切換技術棧，並導入 CI/CD 自動化工作流。我的目標是成為一名能兼顧商業邏輯與極致使用者體驗的前端工程師。

🔗 **線上瀏覽作品集網站：** [點此查看作品集](https://snoesugar.github.io/personal-portfolio-react/)

---

## 🛠️ 技術棧 (Tech Stack)

### 🖥️ 核心框架與狀態管理 (Frameworks & State Management)
* **React 生態系:** React (Functional Components, Hooks), React Router 6, **Redux Toolkit (RTK)**
* **Vue 生態系:** Vue 3 (Composition API, `<script setup>`), Vue Router, **Pinia**

### 📐 開發語言與工具鏈 (Languages & Build Tools)
* **Programming Language:** **TypeScript** (強型別定義、介面約束、空值處理)
* **Build Tool:** Vite
* **API Handling:** Axios / Fetch / RESTful API 整合 / 非同步資料解耦
* **Form Logic:** React Hook Form & Yup 驗證

### 🎨 視覺、樣式與動態效果 (Styling & Animations)
* **CSS Frameworks:** **Tailwind CSS** (原子化樣式擴充、RWD 斷點微調), Bootstrap 5, SASS/SCSS (7-1 Pattern)
* **Animations & Media:** **GSAP** (ScrollTrigger, SplitText), AOS, **Swiper.js** (深度客製化輪播), Chart.js (數據視覺化)

### ⚙️ 工程化與自動化部署 (DevOps & Workflow)
* **Version Control:** Git / GitHub Workflow (PR 審核、衝突解決)
* **CI/CD Pipeline:** **GitHub Actions** (自動化生產環境打包、自動發布至 GitHub Pages)
* **Code Quality:** ESLint / Prettier

---

## 📂 專案核心亮點 (Project Highlights)

### 1. Boardreams 桌遊電商平台
* **專案概述：** 專為桌遊愛好者打造的沉浸式電商與展覽平台，將複雜的商務流程遊戲化。
* **技術重點：** * 使用 **Redux Toolkit** 進行全域狀態管理與前後台 API 串接。
  * 實作前後台**權限控管系統**與動態路由保護。
* **特色亮點：** 高對比潮流視覺設計，優化購物車與結帳資料流，大幅提升使用者沉浸感。

### 2. Mofu-Diary 寵物療癒日記
* **專案概述：** 結合養成系統（Gamification）概念的跨團隊合作寵物健康與心理紀錄 Web App。
* **技術重點：** * 整合 **Chart.js** 進行多維度數據視覺化統計。
  * 擔任核心開發者，主導團隊 **Git 協作模式**，負責分支管理與 PR 審核機制。
* **特色亮點：** 將生硬的健康數據轉化為療癒的圖表交互，兼顧團隊開發的工程規範。

### 3. ART NFT 數位藝術交換與市價排行榜平台
* **專案概述：** 以「硬派黑邊線條感」與「新潮流美學」打破傳統藝廊框架的數位藝術展示與拍賣平台。
* **技術重點：** * **進階 RWD 與 Swiper 3D 特效：** 深度客製化 Swiper 核心，實現非 Active 卡片自動縮小 48% 並套用去色濾鏡（grayscale）的置中聚焦輪播；市價排行榜在雙端採用獨立排版佈局。
  * **非同步資料解耦與多維篩選：** 抽離靜態資料，改以 **API 非同步請求 (Fetch/Axios Mock)** 驅動視圖；利用 Vue 的 **computed 計算屬性** 實作多維度屬性篩選器，達成秒級響應式過濾。
  * **全域狀態管理 (Pinia)：** 將分散的 `isLoading` 狀態統一收納至 Store，實現跨頁面同步的**骨架屏 (Skeleton) 載入體驗**。
  * **高效能 CSS Masonry 瀑布流：** 利用 Tailwind CSS 的 `columns` 佈局完美包容不規則圖片高度，並封裝獨立的絕對定位漸變遮罩，減少瀏覽器重繪 (Repaint) 效能。
  * **強型別約束與動態路徑：** 全面導入 **TypeScript** 為 API 資料建立嚴格的 Interface 定義；使用 Vite 的 `new URL()` 語法確保打包後的靜態圖片路徑完全正確。
  * **CI/CD 自動化部署：** 撰寫 GitHub Actions (`deploy.yml`)，在虛擬機環境中鎖定 Node.js 20、啟用 npm ci 快取加速，落實**自動化型別檢查、生產環境打包與零時差部署**。
* **特色亮點：** 兼具強烈潮流 UI 視覺衝擊與嚴謹的 TypeScript 資料防錯機制。

### 4. DOYOGA 健身輕時尚瑜珈品牌官網
* **專案概述：** 專為瑜珈愛好者設計的響應式品牌官方網站，以簡約、溫柔的視覺傳遞靜謐沉浸體驗。
* **技術重點：** * **Pinia 跨頁面狀態與空值防禦：** 使用 `userReservationStore` 管理多步驟預約表單。全面導入 **TypeScript** 定義介面，精準運用**型別斷言**處理 `string | null` 的潛在空值問題，徹底杜絕初始路由載入時的執行期錯誤（Runtime Error）。
  * **原生手勢拖曳與導覽控制：** 利用 Vue 3 `ref` 直接操作 DOM，計算 `MouseEvent` 物理座標，打造順暢的**滑鼠抓取拖曳 (Drag to Scroll)** 功能，並整合 CSS `snap-x` 實作平滑捲動。
  * **動態媒體渲染：** 行動端採用高載入效能的 `grid` 網格排列，桌面端自動切換並初始化 **Swiper.js** 輪播組件，配置 `slidesPerView: 1.5` 的視覺留白，營造品牌延伸感。
  * **資料驅動與組件解耦：** 將課程、師資、方案全面封裝為結構化陣列並透過 `v-for` 動態渲染；利用 Tailwind 的 `group-hover` 特效實作師資卡片展開與圖片縮放等**硬體加速動畫**。
* **特色亮點：** 跨組件預約邏輯資料流極其嚴謹，且具備極佳的滑動與拖曳手勢微交互。

### 5. WorkWay 職旅資訊平台
* **專案概述：** 以工程思維優化資訊架構的現代求職與職涯規劃資訊平台。
* **技術重點：** 實作高階 **GSAP** 滾動動畫（ScrollTrigger）與流暢的頁面轉場。
* **特色亮點：** 將複雜的職涯數據轉化為高互動性的沉浸式閱讀體驗。

---

## 📈 總結

不論是 **React** 電商系統中的狀態管理（Redux Toolkit），或是 **Vue 3 + TypeScript** 專案中對複雜預約邏輯、自動化 CI/CD 流水線的精準掌控，我都秉持著對資料安全與程式碼品質的嚴格要求。期待能將這份技術實力帶入貴團隊，共同創造兼具商業價值與優良開發者體驗的前端架構！