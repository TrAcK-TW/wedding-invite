import React, { useState, useEffect, useRef } from 'react';

import heroImg from './assets/main-photo.jpg';
import photo1 from './assets/p1.jpg';
import photo2 from './assets/p2.jpg';
import photo3 from './assets/p3.jpg';
import photo4 from './assets/p4.jpg';
import photo5 from './assets/p5.jpg';
import photo6 from './assets/p6.jpg';
import bgmFile from './assets/wedding-bgm.mp3';

// 建立輪播圖陣列
const galleryPhotos = [photo2, photo3, photo4, photo5, photo6];

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
  const weddingDate = new Date('2026-12-12T18:00:00').getTime(); 

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
          <div key={i} className="bg-[#1a1a1a] text-white rounded-full h-7 w-7 flex items-center justify-center mx-auto shadow-md">
            {i}
          </div>
        );
      } else {
        days.push(<div key={i} className="flex items-center justify-center h-7 font-light">{i}</div>);
      }
    }
    return days;
  };

  // --- 輪播圖 (無限滑動) 邏輯 ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div className="w-full max-w-md mx-auto tracking-wide overflow-hidden bg-white shadow-2xl relative font-sans">
      
      {/* 👇 1. 將 src 替換為剛剛引入的 bgmFile */}
      <audio ref={audioRef} src={bgmFile} loop />

      {/* --- 全域字體與音樂播放器設定 --- */}
      <div className="fixed top-4 right-4 z-50 max-w-md">
        <style>
          {`
            /* 載入韓系文創風英文字體 */
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');

            /* 強制覆蓋字體設定：英文優先，中文使用微軟正黑體 */
            .font-sans {
              font-family: 'Montserrat', 'Microsoft JhengHei', '微軟正黑體', sans-serif !important;
            }
            .font-serif {
              font-family: 'Cormorant Garamond', 'Microsoft JhengHei', '微軟正黑體', serif !important;
            }

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
            .marquee-mask {
              -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
              mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
          `}
        </style>
        
        <div className="flex items-center bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 rounded-full p-1 w-48">
          <button 
            onClick={toggleAudio}
            className="bg-[#1a1a1a] text-white h-8 w-8 flex items-center justify-center rounded-full shadow-sm hover:scale-105 transition-all shrink-0 z-10"
          >
            {isPlaying ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <div className="overflow-hidden flex-1 ml-2 mr-2 relative h-5 marquee-mask flex items-center">
            <div className={`whitespace-nowrap text-[11px] text-gray-800 tracking-wider font-medium absolute w-full animate-marquee ${!isPlaying ? 'pause-animation' : ''}`}>
              {/* 👇 2. 這裡改成你們的歌名！ */}
              PRYVT - blue salvia
            </div>
          </div>
        </div>
      </div>


      {/* ========================================= */}
      {/* 第一頁：TRACK & BECCA (純白) */}
      {/* ========================================= */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-white text-[#1a1a1a] px-8 text-center border-b border-gray-100">
        <p className="text-[10px] tracking-[0.4em] text-gray-400 mb-8 font-light">WE ARE GETTING MARRIED</p>
        <h1 className="text-4xl font-serif tracking-widest leading-relaxed">
          TRACK<br/>
          <span className="text-2xl text-gray-300 italic block my-2">&</span>
          BECCA
        </h1>
        <div className="mt-16 w-[1px] h-20 bg-gray-300"></div>
      </section>


      {/* ========================================= */}
      {/* 第二頁：婚禮時間與地點 (拉開上下佈局，露出人物) */}
      {/* ========================================= */}
      <section className="relative min-h-[100dvh] flex flex-col justify-between items-center text-white py-16 px-10 text-center overflow-hidden">
        
        {/* 背景圖片與暗色遮罩 */}
        <div className="absolute inset-0 z-0">
          <img src={photo1} alt="Save the date 背景" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div> 
        </div>

        {/* 上方區塊：日期 */}
        <div className="relative z-10 flex flex-col items-center mt-4">
          <p className="text-[10px] tracking-[0.4em] text-gray-300 mb-6 drop-shadow-md font-light">SAVE THE DATE</p>
          <p className="text-4xl font-serif tracking-widest drop-shadow-lg">2026.12.12</p>
        </div>

        {/* 下方區塊：地點與時間 (移除黑色框框) */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-[280px] mb-4">
          
          <div className="w-12 border-t border-white/50 mb-6 shadow-sm"></div>
          
          <h3 className="text-xl tracking-widest mb-2 font-medium drop-shadow-md">晶麒莊園</h3>
          <p className="text-sm tracking-widest text-gray-200 font-light mb-10 drop-shadow-md">露那廳</p>
          
          {/* 無框時程表，純粹用底線與文字陰影呈現 */}
          <div className="w-full space-y-5">
            <div className="flex justify-between items-center border-b border-white/20 pb-4">
              <span className="text-xs font-light tracking-[0.2em] text-gray-200 drop-shadow-md">證婚時間</span>
              <span className="text-sm font-serif tracking-wider text-white drop-shadow-md">16:00 - 16:45</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-white/20 pb-4">
              <span className="text-xs font-light tracking-[0.2em] text-gray-200 drop-shadow-md">入席時間</span>
              <span className="text-sm font-serif tracking-wider text-white drop-shadow-md">17:00</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-light tracking-[0.2em] text-gray-200 drop-shadow-md">開席時間</span>
              <span className="text-sm font-serif tracking-wider text-white drop-shadow-md">18:00</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* 第三頁：地圖與導航連結 (純白) */}
      {/* ========================================= */}
      <section className="relative min-h-[100dvh] flex flex-col bg-white text-[#1a1a1a]">
        
        <div className="w-full h-[55vh] relative bg-gray-100 overflow-hidden border-b border-gray-200">
          <iframe 
            src="https://maps.google.com/maps?q=晶麒莊園&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="晶麒莊園地圖"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none"></div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-8 pb-12">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-6 font-light">LOCATION</p>
          <p className="text-xs text-gray-600 tracking-widest leading-relaxed mb-8">
            324 桃園市平鎮區高雙里<br/>復旦路四段116巷51號
          </p>
          
          <div className="flex flex-col gap-3 w-full max-w-[250px]">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=晶麒莊園+桃園市平鎮區高雙里復旦路四段116巷51號" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#1a1a1a] text-white py-3 rounded text-xs tracking-widest hover:bg-gray-800 transition-colors font-light"
            >
              Google Map 導航
            </a>
            <a 
              href="http://maps.apple.com/?q=晶麒莊園&address=桃園市平鎮區高雙里復旦路四段116巷51號"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded text-xs tracking-widest hover:bg-gray-50 transition-colors font-light"
            >
              Apple Map 導航
            </a>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 第四頁：無限輪迴婚紗照 (深灰) */}
      {/* ========================================= */}
      <section className="relative min-h-[100dvh] flex flex-col bg-[#1a1a1a] text-white py-16 overflow-hidden">
        <p className="text-center text-[10px] tracking-[0.3em] text-gray-500 mb-10 font-light">GALLERY</p>
        
        <div className="relative w-full flex-1 flex items-center justify-center">
          <div 
            className="w-full h-full relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndHandler}
          >
            <div 
              className="flex w-full h-[70vh] transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryPhotos.map((photo, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 px-6">
                  <img 
                    src={photo} 
                    alt={`婚紗照 ${index + 1}`} 
                    className="w-full h-full object-cover rounded-md shadow-2xl"
                  />
                </div>
              ))}
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 rounded-full text-white/50 hover:text-white backdrop-blur-sm z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 rounded-full text-white/50 hover:text-white backdrop-blur-sm z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {galleryPhotos.map((_, index) => (
            <div 
              key={index} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-4' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </section>

      {/* ========================================= */}
      {/* 第五頁：倒數計時與日曆 (純白) */}
      {/* ========================================= */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-white text-[#1a1a1a] p-8 space-y-16">
        
        <div className="text-center w-full">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-8 font-light">COUNTDOWN</p>
          <div className="flex justify-center gap-4 text-2xl font-light">
            <div className="flex flex-col items-center w-12"><span className="text-4xl font-serif">{timeLeft.days}</span><span className="text-[9px] tracking-wider text-gray-400 mt-2">DAYS</span></div>
            <span className="text-gray-300 font-normal">:</span>
            <div className="flex flex-col items-center w-12"><span className="text-4xl font-serif">{timeLeft.hours}</span><span className="text-[9px] tracking-wider text-gray-400 mt-2">HOURS</span></div>
            <span className="text-gray-300 font-normal">:</span>
            <div className="flex flex-col items-center w-12"><span className="text-4xl font-serif">{timeLeft.minutes}</span><span className="text-[9px] tracking-wider text-gray-400 mt-2">MINS</span></div>
            <span className="text-gray-300 font-normal">:</span>
            <div className="flex flex-col items-center w-12"><span className="text-4xl font-serif">{timeLeft.seconds}</span><span className="text-[9px] tracking-wider text-gray-400 mt-2">SECS</span></div>
          </div>
        </div>

        <div className="w-12 border-t border-gray-200"></div>

        <div className="text-center w-full">
          <h2 className="text-2xl mb-8 font-serif tracking-widest text-gray-800">2026 . 12</h2>
          <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-xs text-gray-400 mb-4 font-light tracking-widest">
            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
          </div>
          <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-sm text-gray-700">
            {renderCalendar()}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 第六頁：期待相見 (滿版照片+遮罩，深色系) */}
      {/* ========================================= */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="期待相見背景" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <p className="text-lg tracking-[0.3em] font-light leading-loose mb-12 drop-shadow-md">
            期待那一天，<br/>
            與大家相見。
          </p>
          <div className="w-[1px] h-16 bg-white/50 mb-8 shadow-sm"></div>
          <p className="text-[10px] tracking-[0.4em] text-gray-300 font-light drop-shadow-md">SEE YOU THERE</p>
        </div>
      </section>

    </div>
  );
}

export default App;