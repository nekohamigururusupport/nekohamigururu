'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaXTwitter, FaYoutube, FaTiktok, FaPaw } from 'react-icons/fa6';
import { TbBroadcast } from 'react-icons/tb';

// 🐾 オープニング用：ネオンガラス肉球の花火エフェクトパーツ
const SplashNeonPaw = ({ top, left, rotate, delay, scale }: { top: string, left: string, rotate: string, delay: number, scale: string }) => (
  <motion.div
    className={`absolute w-32 h-32 md:w-48 md:h-48 ${scale}`}
    style={{ top, left, rotate }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 1.5] }}
    transition={{ delay, duration: 1.5, ease: "easeOut" }}
  >
    <div className="relative w-full h-full drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]">
      <div className="absolute top-[10%] left-[15%] w-[20%] h-[25%] bg-red-500/30 backdrop-blur-md border border-red-400/80 rounded-[50%_50%_40%_40%] -rotate-[25deg]"></div>
      <div className="absolute top-[0%] left-[40%] w-[20%] h-[25%] bg-red-500/30 backdrop-blur-md border border-red-400/80 rounded-[50%_50%_40%_40%]"></div>
      <div className="absolute top-[10%] right-[15%] w-[20%] h-[25%] bg-red-500/30 backdrop-blur-md border border-red-400/80 rounded-[50%_50%_40%_40%] rotate-[25deg]"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[45%] bg-red-500/30 backdrop-blur-md border border-red-400/80 rounded-[40%_40%_50%_50%]"></div>
    </div>
  </motion.div>
);

// 🐾 オープニング画面コンポーネント
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const chars = ["猫", "喰", "ぐ", "る", "る"];

  const paws = [
    { top: '20%', left: '20%', rotate: '-15deg', delay: 0.3, scale: 'scale-75' },
    { top: '60%', left: '70%', rotate: '30deg', delay: 0.8, scale: 'scale-110' },
    { top: '15%', left: '60%', rotate: '45deg', delay: 1.2, scale: 'scale-50' },
    { top: '70%', left: '25%', rotate: '-30deg', delay: 1.6, scale: 'scale-90' },
    { top: '35%', left: '40%', rotate: '10deg', delay: 2.1, scale: 'scale-125' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {paws.map((p, i) => (
        <SplashNeonPaw key={i} top={p.top} left={p.left} rotate={p.rotate} delay={p.delay} scale={p.scale} />
      ))}

      <div className="flex gap-1 md:gap-2 relative z-10">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className={`text-5xl md:text-7xl lg:text-8xl font-black ${
              i < 2 
                ? 'text-[#f4ebeb]' 
                : 'text-red-400' 
            }`}
            style={{ 
              filter: i < 2 
                ? "drop-shadow(0 0 8px rgba(244,114,182,0.2))" 
                : "drop-shadow(0 0 5px #f472b6) drop-shadow(0 0 15px #f472b6)" 
            }}
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// 既存の背景パーツ
const GlassPawBG = ({ className }: { className: string }) => (
  <div className={`absolute ${className} opacity-30 pointer-events-none`}>
    <div className="relative w-full h-full">
      <div className="absolute top-[10%] left-[15%] w-[20%] h-[25%] bg-white/5 backdrop-blur-md border border-white/10 rounded-[50%_50%_40%_40%] -rotate-[25deg]"></div>
      <div className="absolute top-[0%] left-[40%] w-[20%] h-[25%] bg-white/5 backdrop-blur-md border border-white/10 rounded-[50%_50%_40%_40%]"></div>
      <div className="absolute top-[10%] right-[15%] w-[20%] h-[25%] bg-white/5 backdrop-blur-md border border-white/10 rounded-[50%_50%_40%_40%] rotate-[25deg]"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[45%] bg-white/5 backdrop-blur-md border border-white/10 rounded-[40%_40%_50%_50%]"></div>
    </div>
  </div>
);

// PC用スケジュールパーツ
const PawFinger = ({ date, title, rotate }: { date: string, title: string, rotate: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className={`relative w-32 h-32 md:w-40 md:h-40 bg-[#544b4d]/80 backdrop-blur-md border border-white/10 rounded-[50%_50%_40%_40%] ${rotate} shadow-lg flex flex-col items-center justify-center p-4 transition-all duration-300 hover:-translate-y-4 cursor-pointer group`}
  >
    <div className="absolute top-[-22%] left-[calc(50%-10px)] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-red-400 opacity-80 z-[-1] transition-transform duration-300 group-hover:scale-110"></div>
    <span className="text-sm md:text-base font-bold text-red-300">{date}</span>
    <span className="text-[11px] md:text-xs text-[#d1c5c7] mt-2 text-center leading-snug font-medium whitespace-pre-wrap">{title}</span>
  </motion.div>
);

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [isTicketCut, setIsTicketCut] = useState(false);
  const cutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // マウス位置取得用
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // マウス位置を滑らかにするSpring
  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 20 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // 立ち絵の3Dチルト用
  const tiltRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 10 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 10 });
  const tiltRotateX = useTransform(springTiltY, [-0.5, 0.5], [10, -10]);
  const tiltRotateY = useTransform(springTiltX, [-0.5, 0.5], [-10, 10]);

  // 背景のパララックス用マップ
  const bgX = useTransform(cursorX, [0, 1200], [-30, 30]);
  const bgY = useTransform(cursorY, [0, 800], [-30, 30]);

  // ✅ カレンダー用state
  const [nextLive, setNextLive] = useState<{date: string, title: string}>({ date: "読込中🐾", title: "..." });
  const [scheduleList, setScheduleList] = useState<{date: string, title: string}[]>([
    { date: "未定🐾", title: "COMING SOON" },
    { date: "未定🐾", title: "COMING SOON" },
    { date: "未定🐾", title: "COMING SOON" }
  ]);

  // ✅ カレンダー取得Effect（裏口経由で安全に！）
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await fetch('/api/calendar');
        
        // ▼ 修正：throw new Error をやめて、静かにCOMING SOONを表示させる！ ▼
        if (!res.ok) {
          console.warn('裏口(API)が鍵を見つけられなかったぜ！COMING SOONを表示するぞ！');
          const fallback = Array(4).fill({ date: "未定🐾", title: "COMING SOON" });
          setNextLive(fallback[0]);
          setScheduleList(fallback.slice(1, 4));
          return;
        }
        // ▲ 修正ここまで ▲

        const data = await res.json();

        let formattedEvents: { date: string, title: string }[] = [];

        if (data.items && data.items.length > 0) {
          formattedEvents = data.items.map((event: any) => {
            const dateObj = new Date(event.start.dateTime || event.start.date);
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();
            const days = ['日', '月', '火', '水', '木', '金', '土'];
            const dayOfWeek = days[dateObj.getDay()];

            let timeString = '';
            if (event.start.dateTime) {
              const hours = dateObj.getHours();
              const minutes = String(dateObj.getMinutes()).padStart(2, '0');
              timeString = `${hours}:${minutes}〜\n`; 
            }

            return {
              date: `${month}/${day} (${dayOfWeek})`,
              title: `${timeString}${event.summary || '秘密の予定🐾'}`
            };
          });
        }

        while (formattedEvents.length < 4) {
          formattedEvents.push({
            date: "未定🐾",
            title: "COMING SOON"
          });
        }

        setNextLive(formattedEvents[0]);
        setScheduleList(formattedEvents.slice(1, 4));

      } catch (error) {
        console.error('カレンダーの取得に失敗したぜ:', error);
        const fallback = Array(4).fill({ date: "未定🐾", title: "COMING SOON" });
        setNextLive(fallback[0]);
        setScheduleList(fallback.slice(1, 4));
      }
    };

    fetchCalendar();
  }, []);

  const snsLinks = [
    { n: 'X (Twitter)', url: 'https://x.com/h_neko20?s=21', icon: <FaXTwitter className="text-lg" />, c: 'bg-red-400/15 text-red-300 border-red-400/30' },
    { n: 'YouTube', url: 'https://youtube.com/channel/UC_u4f-7IHt12WxU05JNctIQ?si=bzIZIOaWskbPPSX2', icon: <FaYoutube className="text-lg" />, c: 'bg-white/10 text-[#f4ebeb] border-white/20' },
    { n: 'TwitCasting', url: 'https://twitcasting.tv/h_neko20', icon: <TbBroadcast className="text-lg" />, c: 'bg-sky-400/10 text-sky-200 border-sky-400/20' },
    { n: 'TikTok', url: '#', icon: <FaTiktok className="text-lg" />, c: 'bg-amber-400/10 text-amber-200 border-amber-400/20' }
  ];

  // ✅ ツイキャス＆YouTube API用
  const [liveInfo, setLiveInfo] = useState<{ isLive: boolean, platform: string, title: string, url: string, thumbnail: string }>({
    isLive: false,
    platform: '',
    title: '',
    url: '',
    thumbnail: ''
  });

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const res = await fetch('/api/live');
        
        // ▼ 修正：こっちも静かに止める！ ▼
        if (!res.ok) {
          console.warn('配信APIがエラーを返したぜ！');
          return;
        }
        // ▲ 修正ここまで ▲

        const data = await res.json();
        if (data.isLive) {
          setLiveInfo({
            isLive: true,
            platform: data.platform,
            title: data.title,
            url: data.url,
            thumbnail: data.thumbnail || ''
          });
        }
      } catch (error) {
        console.error('配信状態のチェックに失敗したぜ:', error);
      }
    };

    checkLiveStatus();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  const handleCutTicket = () => {
    if (!isTicketCut) {
      setIsTicketCut(true);
      if (cutTimeoutRef.current) clearTimeout(cutTimeoutRef.current);
      cutTimeoutRef.current = setTimeout(() => {
        setIsTicketCut(false);
      }, 1500); 
    }
  };

  // ==========================================
  // ✅ 対策2：公開フラグ（魔法の1行！）
  // ==========================================
  const isReleased = process.env.NODE_ENV === 'development'; 

  if (!isReleased) {
    return (
      <>
        <AnimatePresence>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>

        {!showSplash && (
          <main className="min-h-screen bg-[#453e40] text-[#f4ebeb] font-sans selection:bg-red-500/30 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-dark.png')] z-0"></div>
            <GlassPawBG className="w-64 h-64 top-[10%] left-[10%] rotate-12" />
            <GlassPawBG className="w-40 h-40 bottom-[20%] right-[10%] -rotate-45" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center gap-8 p-6 text-center"
            >
              <FaPaw className="text-red-400/50 text-6xl md:text-8xl mb-4 animate-bounce drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
              
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-[#f4ebeb] tracking-[10px] md:tracking-[20px] whitespace-nowrap ml-[10px] md:ml-[20px]">
                猫喰
                <span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">ぐるる</span>
              </h1>
              
              <div className="w-24 h-[2px] bg-red-400/50 rounded-full mt-4"></div>
              
              <p className="text-2xl md:text-4xl text-red-300 font-black tracking-[0.3em] md:tracking-[0.5em] drop-shadow-[0_0_8px_rgba(248,113,113,0.6)] mt-2">
                COMING SOON
              </p>
              
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-[#a89c9e] text-sm md:text-base font-bold tracking-[0.2em] border border-white/10 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm">
                  2026 DEBUT🐾
                </p>
                <a 
                  href="https://x.com/h_neko20?s=21" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-300/80 hover:text-red-400 text-xs tracking-widest mt-4 flex items-center gap-2 transition-colors"
                >
                  <FaXTwitter /> Official X をフォローして待っててね！
                </a>
              </div>
            </motion.div>
          </main>
        )}
      </>
    );
  }
  // ==========================================


  // 🚀 👇ここから下はデビュー後に表示される本物のサイトコード👇 🚀
  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <motion.div
        className="fixed inset-0 z-[10000] pointer-events-none hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div 
          className="absolute top-[-10px] left-[-10px] w-5 h-5 flex items-center justify-center text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]"
          initial={{ scale: 1 }}
          animate={{ scale: isHoveringLink ? 1.5 : (isClicking ? 0.8 : 1) }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
        >
          {isHoveringLink ? <FaTiktok className="text-lg" /> : <FaPaw className="text-lg rotate-12" />}
        </motion.div>
        
        <AnimatePresence>
          {isClicking && (
            <motion.div
              className="absolute top-[-10px] left-[-10px] w-5 h-5 flex flex-col items-center justify-center gap-1.5"
              initial={{ opacity: 1, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaPaw className="text-[12px] text-[#ffdce3] opacity-80" />
              <FaPaw className="text-[12px] text-[#ffdce3] opacity-80 mt-[-3px] ml-[-5px]" />
              <FaPaw className="text-[12px] text-[#ffdce3] opacity-80 mt-[-3px] mr-[-5px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <main className={`min-h-screen bg-[#453e40] text-[#f4ebeb] font-sans selection:bg-red-500/30 relative ${showSplash ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-dark.png')] z-50"></div>

        <motion.div 
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden text-black select-none"
          style={{ x: bgX, y: bgY }}
        >
          <GlassPawBG className="w-48 h-48 top-[5%] left-[5%] rotate-12" />
          <GlassPawBG className="hidden md:block w-96 h-96 top-[60%] right-[-10%] -rotate-45 opacity-20" />
          <GlassPawBG className="w-32 h-32 top-[35%] right-[15%] rotate-[70deg]" />
          <GlassPawBG className="hidden md:block w-64 h-64 top-[80%] left-[10%] rotate-[-20deg]" />
          <GlassPawBG className="w-40 h-40 top-[20%] left-[45%] rotate-[180deg]" />
          <GlassPawBG className="hidden md:block w-24 h-24 top-[50%] left-[5%] rotate-45 opacity-25" />
          <GlassPawBG className="w-80 h-80 top-[10%] left-[80%] -rotate-[30deg] opacity-15" />
          <GlassPawBG className="hidden md:block w-56 h-56 top-[60%] left-[60%] rotate-[120deg]" />
          <GlassPawBG className="w-32 h-32 top-[70%] left-[25%] rotate-[15deg] opacity-35" />
          <GlassPawBG className="hidden md:block w-44 h-44 bottom-[5%] right-[30%] -rotate-[100deg]" />
          <span className="absolute top-[25%] right-[5%] text-6xl opacity-[0.02] -rotate-12">🦴</span>
          <span className="hidden md:block absolute top-[75%] left-[40%] text-5xl opacity-[0.03] rotate-45">🦴</span>
        </motion.div>

        <div className="w-full min-h-screen relative z-10">
          
          <header className="fixed top-0 w-full h-16 bg-[#453e40]/90 backdrop-blur-sm border-b border-white/10 z-[60] flex items-center justify-between px-6 md:px-16 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl opacity-80">🐾</span>
              <div className="text-[#f4ebeb] font-bold text-base tracking-[0.1em] cursor-default">
                猫喰<span className="text-red-300 drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]">ぐるる</span>
              </div>
            </div>

            <nav className="hidden md:flex gap-10 text-[20px] tracking-wide text-[#d1c5c7] font-bold">
              {['TOP', 'PROFILE', 'TAGS', 'MUSIC', 'MESSAGE', 'SCHEDULE'].map((item) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-red-300 transition-all uppercase"
                  onHoverStart={() => setIsHoveringLink(true)}
                  onHoverEnd={() => setIsHoveringLink(false)}
                >{item}</motion.a>
              ))}
            </nav>

            <button 
              className="md:hidden text-[#f4ebeb] p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </header>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-16 left-0 w-full bg-[#3a3335]/95 backdrop-blur-md border-b border-white/10 flex flex-col items-center py-4 gap-3 md:hidden z-[55] shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-5 h-5 text-[#ffdce3] opacity-60 drop-shadow-[0_0_8px_rgba(255,220,227,0.4)]"
                      style={{ left: `${Math.random() * 80 + 10}%`, top: `-10%` }}
                      animate={{ 
                        y: ['0vh', '100vh'],
                        opacity: [0, 0.6, 0.6, 0],
                        rotate: [Math.random() * 360, Math.random() * 360 * 2] 
                      }}
                      transition={{ 
                        delay: i * 0.3, 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      <FaPaw className="text-sm rotate-12" />
                    </motion.div>
                  ))}
                </div>

                {['TOP', 'PROFILE', 'TAGS', 'MUSIC', 'MESSAGE', 'SCHEDULE'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#f4ebeb] font-bold text-[11px] tracking-[0.2em] hover:text-red-300 transition-colors uppercase relative z-10"
                  >
                    {item}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <section id="top" className="min-h-[80vh] md:min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 pt-28 md:pt-16 lg:mb-32 relative scroll-mt-24 gap-12 md:gap-0">
            <div className="flex-none md:flex-1 text-center md:text-left z-10 lg:pl-10 flex flex-col items-center md:items-start">
              <div className="inline-block px-3 py-1 rounded-full border border-red-300/40 text-red-300/90 text-[13px] md:text-[20px] tracking-widest mb-4 md:mb-6 bg-red-900/10">
                新人Vtuber
              </div>
              <h1 className="text-[38px] md:text-7xl lg:text-9xl font-black text-[#f4ebeb] tracking-[15px] leading-tight whitespace-nowrap ml-[10px] md:ml-[20px]">
                猫喰<span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">ぐるる</span>
              </h1>
              
              <p className="text-[#c2b6b8] text-[10px] md:text-xs lg:text-[21px] tracking-[1em] mt-2 font-bold uppercase lg:ml-[30px]">
                NEKOHAMI GURURU
              </p>

              {/* ========================================== */}
              {/* ▼ PC用サブタイトル（スマホでは消える） ▼ */}
              {/* ========================================== */}
              <div className="hidden md:flex items-center justify-start mt-6 mb-2 text-[#ffdce3] font-bold tracking-widest drop-shadow-[0_0_12px_rgba(244,114,182,0.6)] whitespace-nowrap w-full">
                <span className="text-[28px] lg:text-[40px]">手懐けられないわがまま猫な</span>
                <span className="flex flex-row items-center mx-3 whitespace-nowrap">
                  <span className="text-[24px] lg:text-[30px] opacity-90 tracking-normal">🐈‍⬛⛓️</span>
                  <span className="text-[28px] lg:text-[40px] mx-3">新人Vtuber</span>
                  <span className="text-[24px] lg:text-[30px] opacity-90 tracking-normal">🐈‍⬛⛓️</span>
                </span>
              </div>

              {/* ========================================== */}
              {/* ▼ スマホ用サブタイトル（PCでは消える） ▼ */}
              {/* ========================================== */}
              <div className="flex md:hidden flex-col items-center justify-center mt-6 mb-2 text-[#ffdce3] font-bold tracking-widest drop-shadow-[0_0_12px_rgba(244,114,182,0.6)] w-full">
                <span className="text-[17px] sm:text-[20px] whitespace-nowrap">手懐けられないわがまま猫な</span>
                <span className="flex flex-row items-center mt-2 whitespace-nowrap">
                  <span className="text-[16px] sm:text-[18px] opacity-90 tracking-normal">🐈‍⬛</span>
                  <span className="text-[22px] sm:text-[24px] mx-2">新人Vtuber</span>
                  <span className="text-[16px] sm:text-[18px] opacity-90 tracking-normal">⛓️</span>
                </span>
              </div>
              
            </div>

            <div 
              ref={tiltRef}
              className="flex-none md:flex-1 w-full flex items-center justify-center relative z-10"
              style={{ perspective: 1000 }}
              onMouseMove={(e) => {
                const rect = tiltRef.current?.getBoundingClientRect();
                if (rect) {
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  tiltX.set(x);
                  tiltY.set(y);
                }
              }}
              onMouseLeave={() => {
                tiltX.set(0);
                tiltY.set(0);
              }}
            >
              <motion.div 
                className="w-64 h-64 md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] bg-[#544b4d] border border-white/10 rounded-[4rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden group transition-all"
                style={{ rotateX: tiltRotateX, rotateY: tiltRotateY }}
              >
                <span className="text-white/10 text-9xl absolute -bottom-8 -right-8 rotate-12 group-hover:rotate-0 transition-transform duration-700 drop-shadow-lg pointer-events-none">🦴</span>
                <p className="text-[#a89c9e] text-xs italic tracking-widest pointer-events-none">CHARACTER VIEW</p>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-400/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            </div>
          </section>

          {/* ▼▼▼ YouTubeとツイキャスでデザインが変わるハイブリッドバナー ▼▼▼ */}
          {liveInfo.isLive && (
            <section className="px-6 md:px-24 lg:px-40 mb-12 max-w-7xl mx-auto scroll-mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 opacity-5 z-0 rounded-[2rem]"></div>
              <div className={`bg-gradient-to-r ${liveInfo.platform === 'youtube' ? 'from-red-600/20' : 'from-sky-500/15'} to-[#544b4d]/90 border ${liveInfo.platform === 'youtube' ? 'border-red-500/30' : 'border-sky-400/30'} rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_20px_rgba(248,113,113,0.1)] relative overflow-hidden z-10`}>
                <div className={`absolute -right-10 top-0 ${liveInfo.platform === 'youtube' ? 'text-red-500/5' : 'text-sky-500/5'} text-9xl rotate-12`}>🐾</div>
                
                {/* サムネイル部分 */}
                <div className="w-full md:w-72 aspect-video bg-[#3a3335] rounded-2xl flex items-center justify-center text-sm text-gray-500 shadow-inner border border-white/5 overflow-hidden">
                  {liveInfo.thumbnail ? (
                    <img src={liveInfo.thumbnail} alt="配信サムネイル" className="w-full h-full object-cover" />
                  ) : (
                    <span>配信サムネイル🐾</span>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block bg-red-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 animate-pulse">
                    🔴 NOW LIVE
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#f4ebeb] mb-2 tracking-wide line-clamp-2">{liveInfo.title}</h3>
                  <p className="text-sm text-[#d1c5c7] mb-6">
                    {liveInfo.platform === 'youtube' ? 'YouTubeにて配信中！遊びにきてね！' : 'TwitCastingにて配信中！遊びにきてね！'}
                  </p>
                  
                  <motion.a 
                    href={liveInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex ${liveInfo.platform === 'youtube' ? 'bg-red-500 hover:bg-red-400' : 'bg-sky-500 hover:bg-sky-400'} text-white font-bold py-3 px-8 rounded-full text-xs tracking-widest shadow-lg transition-colors items-center gap-2 mx-auto md:mx-0`}
                    onHoverStart={() => setIsHoveringLink(true)}
                    onHoverEnd={() => setIsHoveringLink(false)}
                  >
                    {liveInfo.platform === 'youtube' ? <FaYoutube className="text-lg" /> : <TbBroadcast className="text-lg" />}
                    配信を見に行く
                  </motion.a>
                </div>
              </div>
            </section>
          )}
          {/* ▲▲▲ ハイブリッドバナーここまで ▲▲▲ */}

          <motion.section 
            id="profile"
            className="px-6 md:px-24 lg:px-40 mb-32 lg:mb-64 max-w-7xl mx-auto scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-[#544b4d] rounded-[2.5rem] md:rounded-[4rem] px-8 pt-10 pb-10 md:p-16 lg:p-24 border border-white/10 relative overflow-hidden shadow-2xl min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center">
              <div className="absolute top-10 right-10 text-9xl opacity-[0.01] rotate-12">🐾</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-red-300 mb-10 md:mb-16 flex items-center gap-4 tracking-widest drop-shadow-sm">
                <span className="text-red-400 opacity-50">🐾</span> 噛み跡紹介
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-10 items-center w-full">
                <div className="w-full text-left space-y-4 md:space-y-8 text-[#d1c5c7] text-[16px] md:text-lg lg:text-xl leading-relaxed md:leading-loose font-bold tracking-wide">
                  <p>猫喰ぐるる（Nekohami Gururu）<br className="hidden md:inline" />ポップな可愛さの裏に魚の骨のような<br className="hidden md:inline" />鋭いこだわりを隠し持つ<br className="hidden md:inline" />新人Vチューバー</p>
                  <p>ゲーム実況や歌ってみたを中心に<br className="hidden md:inline" />リスナーの皆と楽しい<br className="hidden md:inline" />空間を作っていくよ！</p>
                </div>
                <div className="bg-[#453e40] p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 space-y-4 md:space-y-8 shadow-inner w-full">
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">誕生日</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">7月18日</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">好きなもの</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">ゲーム</span></div>
                  <div className="flex justify-between pb-1 md:pb-2"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">ファンマーク</span><span className="text-lg md:text-xl lg:text-2xl text-[#f4ebeb]">🐈‍⬛⛓️</span></div>
                </div>
              </div>
            </div>
          </motion.section>

          <section className="py-16 lg:py-24 px-6 relative">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 max-w-[340px] md:max-w-none mx-auto z-10 relative">
              {snsLinks.map((sns) => (
                <a 
                  key={sns.n} 
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full md:w-auto px-2 md:px-6 py-3 border ${sns.c} rounded-2xl text-[10px] md:text-xs font-bold tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 md:gap-3`}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  {sns.icon}
                  <span className="mt-[2px]">{sns.n}</span>
                </a>
              ))}
            </div>
          </section>

          <motion.section 
            id="tags"
            className="px-6 md:px-24 mb-32 lg:mb-64 max-w-5xl mx-auto scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e8dbdd] mb-12 tracking-widest text-center">OFFICIAL TAGS</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {[
                { label: '総合タグ', tag: '#ぐるるの爪痕' },
                { label: 'ファンアート', tag: '#ぐるるの噛み跡' },
              ].map((t) => (
                <motion.a 
                  key={t.label} 
                  href={`https://x.com/search?q=${encodeURIComponent(t.tag)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-1/2 bg-[#544b4d] border border-red-400/20 rounded-[3rem] py-12 px-6 text-center shadow-lg hover:border-red-400 hover:-translate-y-2 hover:shadow-red-500/20 transition-all cursor-pointer group relative overflow-hidden"
                  onHoverStart={() => setIsHoveringLink(true)}
                  onHoverEnd={() => setIsHoveringLink(false)}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <p className="text-sm lg:text-base text-red-300/80 mb-4 font-black">{t.label}</p>
                  <p className="text-2xl lg:text-3xl font-black text-[#f4ebeb] tracking-wider group-hover:text-red-300 transition-colors">{t.tag}</p>
                  <div className="mt-6 text-xs text-gray-400 animate-pulse">X (Twitter) で検索 ↗</div>
                </motion.a>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="music"
            className="px-6 md:px-24 lg:px-40 mb-32 lg:mb-64 max-w-7xl mx-auto scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl lg:text-4xl font-black text-[#f4ebeb] mb-16 tracking-tight drop-shadow-sm">LISTEN MUSIC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {[1, 2].map((i) => (
                <motion.div 
                  key={i} 
                  className="group cursor-pointer"
                  onHoverStart={() => setIsHoveringLink(true)}
                  onHoverEnd={() => setIsHoveringLink(false)}
                >
                  <motion.div 
                    className="aspect-video bg-[#544b4d] border border-white/10 rounded-[3rem] mb-6 flex items-center justify-center overflow-hidden relative shadow-xl"
                  >
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform backdrop-blur-sm relative z-10">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-red-300 border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </motion.div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#d1c5c7] group-hover:text-red-300 transition-colors px-4">歌ってみた動画のタイトル {i}</h3>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="message"
            className="px-6 md:px-24 lg:px-40 mb-16 lg:mb-32 max-w-6xl mx-auto scroll-mt-24 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            onHoverStart={() => setIsHoveringLink(true)}
            onHoverEnd={() => setIsHoveringLink(false)}
          >
            <div className="bg-[#544b4d]/80 backdrop-blur-md border border-white/5 rounded-2xl md:rounded-[2.5rem] p-8 md:p-16 lg:p-20 text-center shadow-2xl relative overflow-hidden min-h-[60vh] flex flex-col justify-center items-center group z-10 cursor-pointer transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(244,114,182,0.2)]">
              
              <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <FaPaw className="absolute bottom-10 left-[10%] text-6xl text-[#3a3335] -rotate-12" />
                <FaPaw className="absolute top-[60%] left-[25%] text-6xl text-[#3a3335] rotate-12" />
                <FaPaw className="absolute top-[35%] left-[45%] text-6xl text-[#3a3335] -rotate-6" />
                <FaPaw className="absolute top-10 left-[65%] text-6xl text-[#3a3335] rotate-6" />
                <FaPaw className="absolute top-[-20px] left-[85%] text-6xl text-[#3a3335] rotate-12" />
              </div>

              <div className="absolute top-0 left-0 w-full h-[120px] md:h-[200px] border-t border-white/5 bg-gradient-to-b from-white/5 to-transparent [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 w-[50%] h-[120px] md:h-[200px] border-l border-white/5 bg-gradient-to-tr from-white/5 to-transparent [clip-path:polygon(0_100%,100%_100%,0_0)] pointer-events-none z-10"></div>
              <div className="absolute bottom-0 right-0 w-[50%] h-[120px] md:h-[200px] border-r border-white/5 bg-gradient-to-tl from-white/5 to-transparent [clip-path:polygon(100%_100%,0_100%,100%_0)] pointer-events-none z-10"></div>

              <div className="absolute inset-0 bg-red-400/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              <div className="relative mb-8 md:mb-12 z-20 mt-6 group-hover:drop-shadow-[0_0_8px_rgba(255,220,227,0.4)] transition-all duration-300">
                <div className="inline-block mb-3 text-red-400/30 text-2xl md:text-3xl"><FaPaw /></div>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-[#f4ebeb] mb-0 tracking-widest drop-shadow-sm flex items-center justify-center gap-2 whitespace-nowrap">
                  ぐるるに質問ある？
                </h2>
              </div>

              <div className="w-full max-w-2xl mx-auto relative z-20 mb-12 md:mb-16">
                <p className="text-[13px] md:text-base lg:text-lg text-[#d1c5c7] leading-loose md:leading-[2.5] font-medium tracking-wide group-hover:text-[#e8dbdd] transition-colors">
                  配信の感想とか、やってほしいゲームとか、どうでもいい日常の報告とか。<br className="hidden md:inline" />
                  気が向いた時に、気まぐれに配信で拾ってあげるかも。<br className="hidden md:inline" />
                  ……別に、ずっと待ってるわけじゃないけどね.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="bg-[#3a3335] group-hover:bg-[#453e40] text-red-300 font-bold py-4 px-8 md:py-5 md:px-16 rounded-full text-sm md:text-base tracking-widest shadow-lg transition-all duration-300 border border-red-300/20 flex items-center justify-center gap-3 whitespace-nowrap w-[90%] max-w-[320px] mx-auto active:scale-95 z-20 group-hover:border-red-300"
                onHoverStart={() => setIsHoveringLink(true)}
                onHoverEnd={() => setIsHoveringLink(false)}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 opacity-80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                マシュマロを送る
              </motion.button>
              
            </div>
          </motion.section>

          <section className="py-12 lg:py-24 px-6 border-b border-white/5 mb-32 lg:mb-64">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 max-w-[340px] md:max-w-none mx-auto">
              {snsLinks.map((sns) => (
                <a 
                  key={`dup-${sns.n}`} 
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full md:w-auto px-2 md:px-6 py-3 border ${sns.c} rounded-2xl text-[10px] md:text-xs font-bold tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 md:gap-3`}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  {sns.icon}
                  <span className="mt-[2px]">{sns.n}</span>
                </a>
              ))}
            </div>
          </section>

          <section id="schedule" className="px-6 md:px-24 lg:px-40 mb-32 lg:mb-64 max-w-7xl mx-auto flex flex-col items-center scroll-mt-24">
            <div className="text-center mb-8 relative hidden md:block">
              <h2 className="text-3xl lg:text-5xl font-black text-red-300 tracking-[0.2em] drop-shadow-[0_0_8px_rgba(248,113,113,0.4)] flex items-center justify-center gap-2">
                気まぐれ
                <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-[1.2em] leading-none mt-[-0.1em]">配信</span>
                スケジュール
              </h2>
              <p className="text-[#a89c9e] text-xs lg:text-sm tracking-[0.4em] mt-4 font-black uppercase">Whimsical Schedule</p>
            </div>

            <h2 className="text-3xl font-black text-red-300 tracking-[0.2em] mb-8 text-center md:hidden flex flex-col items-center gap-2">
              <div className="flex items-end gap-1">
                気まぐれ
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] text-[1.25em] leading-none mt-[-0.1em]">配信</span>
              </div>
              <div>スケジュール</div>
            </h2>

            {/* --- PC版表示 --- */}
            <div className="relative w-full max-w-2xl h-[80vh] hidden md:flex flex-col items-center justify-center">
              <div className="flex gap-16 md:gap-24 mb-[-20px] relative z-10 w-full justify-center h-32">
                <div className="absolute top-[-130px] left-[-10px]"><PawFinger date={scheduleList[0].date} title={scheduleList[0].title} rotate="-rotate-[20deg]" /></div>
                <div className="absolute top-[-190px] left-[calc(50%-4.5rem)] md:left-[calc(50%-5rem)] z-10"><PawFinger date={scheduleList[1].date} title={scheduleList[1].title} rotate="rotate-0" /></div>
                <div className="absolute top-[-130px] right-[-10px]"><PawFinger date={scheduleList[2].date} title={scheduleList[2].title} rotate="rotate-[20deg]" /></div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute bottom-[5%] left-[15%] w-[70%] max-w-lg aspect-[1/0.8] bg-gradient-to-b from-red-500/10 to-[#544b4d]/90 backdrop-blur-md border border-red-400/30 rounded-[40%_40%_50%_50%] shadow-2xl flex flex-col items-center justify-center p-10 transition-all duration-300 z-20 cursor-pointer"
                onHoverStart={() => setIsHoveringLink(true)}
                onHoverEnd={() => setIsHoveringLink(false)}
              >
                <div className="inline-block bg-red-500/20 text-red-300 text-xs font-black tracking-widest px-5 py-2 rounded-full mb-6 animate-pulse">NEXT LIVE</div>
                <span className="text-4xl md:text-5xl font-black text-[#f4ebeb] mb-6 tracking-wider drop-shadow-md">{nextLive.date}</span>
                <span className="text-lg md:text-xl text-[#d1c5c7] font-bold border-t border-white/10 pt-6 w-3/4 text-center leading-relaxed whitespace-pre-wrap">{nextLive.title}</span>
              </motion.div>
              <div className="absolute bottom-[-2vh] left-[calc(50%-150px)] w-[300px] h-10 bg-black/30 rounded-[50%] blur-xl opacity-80 z-0"></div>
            </div>

            {/* --- スマホ版表示 --- */}
            <div className="w-full max-w-md mx-auto mt-12 md:hidden relative px-4">
              <div className="absolute left-[38px] top-4 bottom-0 w-[2px] bg-red-400/20"></div>
              
              {/* NEXT LIVE */}
              <div className="relative pl-14 py-6 mb-4">
                <div className="absolute left-[26px] top-8 w-6 h-6 bg-[#3a3335] border-2 border-red-400 rounded-full flex items-center justify-center text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)] z-10"><FaPaw className="text-[10px]" /></div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-red-500/10 to-[#544b4d]/80 border border-red-400/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-6xl opacity-5">🐾</div>
                  <span className="inline-block bg-red-500/20 text-red-300 text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 animate-pulse">NEXT LIVE</span>
                  <h3 className="text-2xl font-black text-[#f4ebeb] tracking-wider mb-2">{nextLive.date}</h3>
                  <p className="text-sm text-[#d1c5c7] font-bold whitespace-pre-wrap">{nextLive.title}</p>
                </motion.div>
              </div>
              
              {/* それ以降の予定 */}
              {scheduleList.map((item, i) => (
                <div key={i} className="relative pl-14 py-3">
                  <div className="absolute left-[33px] top-[1.8rem] w-3 h-3 bg-red-400/40 rounded-full border-2 border-[#453e40] z-10"></div>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-[#544b4d]/40 border border-white/5 rounded-xl p-4">
                    <h3 className="text-base font-bold text-red-300 mb-1">{item.date}</h3>
                    <p className="text-xs text-[#d1c5c7] font-medium whitespace-pre-wrap">{item.title}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>

          <motion.section 
            id="contact" 
            className="px-6 md:px-24 lg:px-40 mb-16 lg:mb-32 max-w-6xl mx-auto scroll-mt-24 relative hidden md:block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative w-full min-h-[60vh] cursor-pointer group"
              onClick={handleCutTicket}
              animate={isTicketCut ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="absolute inset-0 rounded-[4rem] shadow-2xl drop-shadow-[0_0_15px_rgba(244,114,182,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(244,114,182,0.2)] transition-all duration-300 pointer-events-none"></div>

              <motion.div 
                className="absolute inset-0 bg-[#2a2526] border-2 border-red-300/40 rounded-[4rem] pointer-events-none overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(50% - 20px), calc(100% - 20px) 50%, 20px 50%, 0 calc(50% - 20px))' }}
                animate={isTicketCut ? { y: -80, opacity: 0, rotate: -2 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                 <div className="absolute top-10 left-10 text-9xl text-[#ffdce3] opacity-[0.05] -rotate-45 group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-500">🐾</div>
              </motion.div>

              <motion.div 
                className="absolute inset-0 bg-[#2a2526] border-2 border-red-300/40 rounded-[4rem] pointer-events-none overflow-hidden"
                style={{ clipPath: 'polygon(0 calc(50% + 20px), 20px 50%, calc(100% - 20px) 50%, 100% calc(50% + 20px), 100% 100%, 0 100%)' }}
                animate={isTicketCut ? { y: 80, opacity: 0, rotate: 2 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                 <div className="absolute bottom-10 right-10 text-9xl text-[#ffdce3] opacity-[0.05] rotate-12 group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-500">🐾</div>
              </motion.div>

              <motion.div 
                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none flex justify-center items-center z-20 px-[22px]"
                animate={isTicketCut ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                 <div className="w-full border-t-[3px] border-dashed border-gray-300/60 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"></div>
              </motion.div>

              <motion.div 
                className="absolute inset-0 p-10 lg:p-20 flex flex-col justify-between items-center text-center z-30 pointer-events-auto"
                animate={isTicketCut ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex-1 flex items-end justify-center w-full pb-10">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] whitespace-pre-wrap group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)] transition-all duration-500">
                    お仕事のご相談は<br />こちらへ🐾
                  </h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-start w-full pt-10">
                  <p className="text-lg lg:text-2xl text-[#c2b6b8] leading-loose mb-10 font-medium tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,220,227,0.4)] transition-all duration-500">
                    お仕事やコラボのご相談は<span className="font-bold text-[#ffdce3] drop-shadow-[0_0_10px_rgba(255,220,227,0.6)]">DM</span>にて承ってます🐾
                  </p>
                  
                  <motion.a 
                    href="https://twitter.com/messages/compose?recipient_id=2005495955274219520"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center gap-4 py-6 px-16 bg-red-400 text-white text-lg lg:text-xl font-bold tracking-wide rounded-full shadow-lg group-hover:shadow-[0_0_30px_rgba(248,113,113,0.8)] group-hover:bg-red-500 transition-all duration-300 transform group/btn relative overflow-hidden active:scale-95 z-40"
                    onHoverStart={() => setIsHoveringLink(true)}
                    onHoverEnd={() => setIsHoveringLink(false)}
                  >
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover/btn:left-[100%] transition-all duration-700 ease-in-out"></span>
                    <span className="relative z-10">SEND MESSAGE</span>
                    <span className="text-2xl animate-bounce relative z-10">🐾</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section 
            id="contact-mobile" 
            className="px-6 mb-16 max-w-md mx-auto scroll-mt-24 relative md:hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative w-full min-h-[50vh] cursor-pointer group"
              onClick={handleCutTicket}
              animate={isTicketCut ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="absolute inset-0 rounded-[2.5rem] shadow-2xl drop-shadow-[0_0_15px_rgba(244,114,182,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(244,114,182,0.2)] transition-all duration-300 pointer-events-none"></div>

              <motion.div 
                className="absolute inset-0 bg-[#2a2526] border-2 border-red-300/40 rounded-[2.5rem] pointer-events-none overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(50% - 10px), calc(100% - 10px) 50%, 10px 50%, 0 calc(50% - 10px))' }}
                animate={isTicketCut ? { y: -60, opacity: 0, rotate: -2 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                 <div className="absolute top-8 left-8 text-8xl text-[#ffdce3] opacity-[0.05] -rotate-45 group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-500">🐾</div>
              </motion.div>

              <motion.div 
                className="absolute inset-0 bg-[#2a2526] border-2 border-red-300/40 rounded-[2.5rem] pointer-events-none overflow-hidden"
                style={{ clipPath: 'polygon(0 calc(50% + 10px), 10px 50%, calc(100% - 20px) 50%, 100% calc(50% + 10px), 100% 100%, 0 100%)' }}
                animate={isTicketCut ? { y: 60, opacity: 0, rotate: 2 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                 <div className="absolute bottom-8 right-8 text-8xl text-[#ffdce3] opacity-[0.05] rotate-12 group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-500">🐾</div>
              </motion.div>

              <motion.div 
                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none flex justify-center items-center z-20 px-[12px]"
                animate={isTicketCut ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                 <div className="w-full border-t-[3px] border-dashed border-gray-300/60 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"></div>
              </motion.div>

              <motion.div 
                className="absolute inset-0 p-8 flex flex-col justify-between items-center text-center z-30 pointer-events-auto"
                animate={isTicketCut ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex-1 flex flex-col justify-end items-center w-full pb-4">
                  <h2 className="text-2xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-4">
                    お仕事のご相談は<br />こちらへ🐾
                  </h2>
                  <p className="text-base text-[#c2b6b8] font-medium tracking-wide">
                    お仕事やコラボのご相談は
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-start items-center w-full pt-4">
                  <p className="text-base text-[#c2b6b8] font-medium tracking-wide mb-6">
                    <span className="font-bold text-[#ffdce3]">DM</span>にて承ってます🐾
                  </p>
                  <motion.a 
                    href="https://twitter.com/messages/compose?recipient_id=2005495955274219520"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center gap-4 py-5 px-12 bg-red-400 text-white text-base font-bold tracking-wide rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(248,113,113,0.8)] hover:bg-red-500 transition-all duration-300 transform group/btn relative overflow-hidden active:scale-95 z-40 mx-auto"
                    onHoverStart={() => setIsHoveringLink(true)}
                    onHoverEnd={() => setIsHoveringLink(false)}
                  >
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover/btn:left-[100%] transition-all duration-700 ease-in-out"></span>
                    <span className="relative z-10">SEND MESSAGE</span>
                    <span className="text-2xl animate-bounce relative z-10">🐾</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          <section className="px-6 md:px-24 mb-32 max-w-5xl mx-auto text-center border-t border-white/10 pt-20 relative z-10 scroll-mt-24">
            <h2 className="text-sm lg:text-base font-bold text-[#c2b6b8] mb-6 tracking-widest">二次創作・ガイドラインについて</h2>
            <p className="text-xs lg:text-sm text-[#a89c9e] leading-relaxed max-w-3xl mx-auto font-medium">
              ファンアートや切り抜き動画の制作は原則大歓迎です！制作の際は、他の方の迷惑にならない範囲で、愛を持って楽しんでいただけると嬉しいです。（※センシティブな内容や、公式と誤認されるような表現はお控えください）
            </p>
          </section>

          <footer className="py-20 px-6 text-center bg-[#3a3335] border-t border-white/5 relative z-20">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 max-w-[340px] md:max-w-none mx-auto mb-16">
              {snsLinks.map((sns) => (
                <a 
                  key={`footer-${sns.n}`} 
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full md:w-auto px-2 md:px-6 py-3 border ${sns.c} rounded-2xl text-[10px] md:text-[11px] font-bold tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2`}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  {sns.icon}
                  <span className="mt-[2px]">{sns.n}</span>
                </a>
              ))}
            </div>

            <div className="mb-12 flex flex-col items-center gap-6">
              <div className="text-[#f4ebeb] text-3xl lg:text-4xl italic font-black select-none tracking-widest drop-shadow-md cursor-default">
                猫喰<span className="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]">ぐるる</span>
              </div>
              <div className="w-12 h-[1px] bg-red-400/40"></div>
              <p className="text-xs text-[#a89c9e] tracking-widest font-bold">
                サイト制作🐾: <span className="text-white/80">"政獣たちのいるところ：火日"</span>
              </p>
            </div>

            <p className="text-[11px] text-[#8e8184] mb-2 tracking-[0.3em] font-medium">© 2026 猫喰ぐるる / Nekohami Gururu</p>
            <div className="w-10 h-[2px] bg-red-400/20 mx-auto mt-4"></div>
          </footer>

        </div>
      </main>
    </>
  );
}