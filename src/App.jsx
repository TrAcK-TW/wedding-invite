import React, { useState, useEffect, useRef } from 'react';

import heroImg from './assets/main-photo.jpg';
import photo1 from './assets/p1.jpg';
import photo2 from './assets/p2.jpg';
import photo3 from './assets/p3.jpg';
import photo4 from './assets/p4.jpg';
import photo5 from './assets/p5.jpg';
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const weddingDate = new Date('2026-12-12T16:00:00').getTime(); 

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderCalendar = () => {
    const days = [];
    const emptySlots = 2; 
    const daysInMonth = 31;

    for (let i = 0; i < emptySlots; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if (i === 12) {
        days.push(
          <div key={i} className="bg-red-700 text-white rounded-full h-7 w-7 flex items-center justify-center mx-auto shadow-md">
            {i}
          </div>
        );
      } else {
        days.push(<div key={i} className="flex items-center justify-center h-7">{i}</div>);
      }
    }
    return days;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20 font-sans text-gray-800 shadow-xl relative overflow-hidden">
      
      <audio ref={audioRef} src="/your-music-file.mp3" loop />

    {/* --- 替換後的：高質感音樂播放器 (毛玻璃膠囊造型 + 跑馬燈) --- */}
      <div className="absolute top-4 right-4 z-50">
        {/* 內嵌一段控制跑馬燈動畫的 CSS */}
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              display: inline-block;
              animation: marquee 8s linear infinite;
            }
            .pause-animation {
              animation-play-state: paused;
            }
            /* 左右邊緣漸層淡出效果，讓文字消失得更自然 */
            .marquee-mask {
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
          `}
        </style>
        
        {/* 膠囊外框：毛玻璃背景 + 微陰影 */}
        <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/50 shadow-sm rounded-full p-1 w-48">
          
          {/* 播放/暫停按鈕 */}
          <button 
            onClick={toggleAudio}
            className="bg-white text-gray-700 h-8 w-8 flex items-center justify-center rounded-full shadow-sm hover:scale-105 hover:bg-gray-50 transition-all shrink-0 z-10"
          >
            {isPlaying ? (
              // 暫停圖示 (俐落的雙直線)
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              // 播放圖示 (俐落的三角形)
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          {/* 跑馬燈文字區塊 */}
          <div className="overflow-hidden flex-1 ml-2 mr-2 relative h-5 marquee-mask flex items-center">
            {/* 根據 isPlaying 狀態來決定是否暫停動畫 */}
            <div className={`whitespace-nowrap text-[11px] text-gray-700 tracking-wider font-light absolute w-full animate-marquee ${!isPlaying ? 'pause-animation' : ''}`}>
              Lucky Me - Jake Miller
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-[80vh] relative overflow-hidden">
        <img 
          src={heroImg} 
          alt="主視覺婚紗照" 
          className="absolute inset-0 w-full h-full object-cover"
        />
       
      </div>

      {/* ========================================= */}
      {/* --- 新增：故事照片與文字排版區塊 --- */}
      {/* ========================================= */}
      <div className="w-full border-b-[1.5px] border-gray-300 flex flex-col font-sans">
        
        {/* 替換後的：照片 1 (滿版大圖) */}
        <div className="w-full h-64 border-b-[1.5px] border-gray-300 relative overflow-hidden">
          <img src={photo1} alt="故事照片1" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* 文字 1 (大段落文字) */}
        <div className="w-full py-20 px-8 bg-white flex items-center justify-center border-b-[1.5px] border-gray-300 text-center">
          <p className="text-gray-800 text-lg tracking-widest leading-loose font-light">
            我們很近，卻走了很遠才遇見。<br />
            <br />
            在彼此眼中，我們找到了安心，<br />
            原來最貼近的歸屬，<br />
            一直都在不遠的地方等待。
          </p>
        </div>

        {/* 替換後的：照片 2 & 照片 3 (雙拼並排) */}
        <div className="w-full grid grid-cols-2 border-b-[1.5px] border-gray-300">
          <div className="h-56 border-r-[1.5px] border-gray-300 relative overflow-hidden">
            <img src={photo2} alt="故事照片2" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="h-56 relative overflow-hidden">
            <img src={photo3} alt="故事照片3" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* 文字 2 (短句分隔) */}
        <div className="w-full py-8 px-6 bg-white flex items-center justify-center border-b-[1.5px] border-gray-300 text-center">
          <p className="text-gray-800 text-lg tracking-[0.2em] font-light">
            有了你，平凡的日子變得值得珍惜
          </p>
        </div>

        {/* 替換後的：照片 4 & 照片 5 (雙拼並排) */}
        <div className="w-full grid grid-cols-2 border-b-[1.5px] border-gray-300">
          <div className="h-56 border-r-[1.5px] border-gray-300 relative overflow-hidden">
            <img src={photo4} alt="故事照片4" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="h-56 relative overflow-hidden">
            <img src={photo5} alt="故事照片5" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        {/* 文字 3 (短句分隔) */}
        <div className="w-full py-8 px-6 bg-white flex items-center justify-center text-center">
          <p className="text-gray-800 text-lg tracking-[0.2em] font-light">
            誠摯地邀請您，<br />
            與我們一同見證這份幸福。
          </p>
        </div>

      </div>
      {/* ========================================= */}
      {/* --- 排版區塊結束 --- */}
      {/* ========================================= */}


      {/* 下方的倒數計時與資訊區塊 */}
      <div className="p-8 space-y-14">
        
        {/* --- 倒數計時 --- */}
        <section className="text-center">
          <h2 className="text-sm tracking-[0.2em] text-gray-500 mb-6">我們正一天天倒數</h2>
          <div className="flex justify-center gap-4 text-2xl font-light">
            <div className="flex flex-col items-center w-12"><span className="text-3xl text-gray-700">{timeLeft.days}</span><span className="text-[10px] tracking-wider text-gray-400 mt-1">DAYS</span></div>
            <span className="text-gray-300 font-normal">:</span>
            <div className="flex flex-col items-center w-12"><span className="text-3xl text-gray-700">{timeLeft.hours}</span><span className="text-[10px] tracking-wider text-gray-400 mt-1">HOURS</span></div>
            <span className="text-gray-300 font-normal">:</span>
            <div className="flex flex-col items-center w-12"><span className="text-3xl text-gray-700">{timeLeft.minutes}</span><span className="text-[10px] tracking-wider text-gray-400 mt-1">MINS</span></div>
            <span className="text-gray-300 font-normal">:</span>
            <div className="flex flex-col items-center w-12"><span className="text-3xl text-gray-700">{timeLeft.seconds}</span><span className="text-[10px] tracking-wider text-gray-400 mt-1">SECS</span></div>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* --- 日曆區塊 --- */}
        <section className="text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl mb-6 font-serif text-gray-800 tracking-widest">2026 <span className="text-red-700">12</span></h2>
          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-sm text-gray-400 mb-4 font-medium tracking-widest">
            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
          </div>
          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-sm text-gray-600">
            {renderCalendar()}
          </div>
        </section>

        {/* --- 婚宴時程 --- */}
        <section>
          <h3 className="text-center text-sm tracking-[0.2em] text-gray-500 mb-6">婚禮時程</h3>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">💍</span>
                <span className="text-gray-600 font-medium tracking-wider">證婚儀式</span>
              </div>
              <span className="font-serif text-gray-800">16:00 - 16:45</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🥂</span>
                <span className="text-gray-600 font-medium tracking-wider">賓客入場</span>
              </div>
              <span className="font-serif text-gray-800">17:00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xl">🍽️</span>
                <span className="text-gray-600 font-medium tracking-wider">準時開席</span>
              </div>
              <span className="font-serif text-gray-800">18:00</span>
            </div>
          </div>
        </section>

        {/* --- 婚宴地點 --- */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-2">
            <span className="text-2xl">💒</span>
          </div>
          <h3 className="text-xl font-medium tracking-widest text-gray-800">晶麒莊園</h3>
          <p className="text-sm text-gray-500 tracking-wider">324 桃園市平鎮區高雙里<br/>復旦路四段116巷51號</p>
          
          <div className="pt-6">
            <a 
              href="https://maps.app.goo.gl/YourGoogleMapLink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full text-sm tracking-widest shadow-lg hover:bg-gray-700 transition-colors"
            >
              開啟導航
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;