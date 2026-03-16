'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXTwitter, FaYoutube, FaTiktok } from 'react-icons/fa6';
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
                ? 'text-[#f4ebeb] drop-shadow-md' 
                : 'text-red-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]' 
            }`}
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

// 既存のスケジュールパーツ
const PawFinger = ({ date, title, rotate }: { date: string, title: string, rotate: string }) => (
  <div className={`relative w-32 h-32 md:w-40 md:h-40 bg-[#544b4d]/80 backdrop-blur-md border border-white/10 rounded-[50%_50%_40%_40%] ${rotate} shadow-lg flex flex-col items-center justify-center p-4 transition-all duration-300 hover:scale-110 hover:-translate-y-4 cursor-pointer group`}>
    <div className="absolute top-[-22%] left-[calc(50%-10px)] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-red-400 opacity-80 z-[-1] transition-transform duration-300 group-hover:scale-110"></div>
    <span className="text-sm md:text-base font-bold text-red-300">{date}</span>
    <span className="text-[11px] md:text-xs text-[#d1c5c7] mt-2 text-center leading-snug font-medium">{title}</span>
  </div>
);

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const snsLinks = [
    { n: 'X (Twitter)', icon: <FaXTwitter className="text-lg" />, c: 'bg-red-400/15 text-red-300 border-red-400/30' },
    { n: 'YouTube', icon: <FaYoutube className="text-lg" />, c: 'bg-white/10 text-[#f4ebeb] border-white/20' },
    { n: 'TwitCasting', icon: <TbBroadcast className="text-lg" />, c: 'bg-sky-400/10 text-sky-200 border-sky-400/20' },
    { n: 'TikTok', icon: <FaTiktok className="text-lg" />, c: 'bg-amber-400/10 text-amber-200 border-amber-400/20' }
  ];

  const isLive = true; 

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <main className={`min-h-screen bg-[#453e40] text-[#f4ebeb] font-sans selection:bg-red-500/30 relative ${showSplash ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-dark.png')] z-50"></div>

        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden text-black select-none">
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
        </div>

        <div className="w-full min-h-screen relative z-10">
          
          <header className="fixed top-0 w-full h-16 bg-[#453e40]/90 backdrop-blur-sm border-b border-white/10 z-[60] flex items-center justify-between px-6 md:px-16 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl opacity-80">🐾</span>
              <div className="text-[#f4ebeb] font-bold text-base tracking-[0.1em] cursor-default">
                猫喰<span className="text-red-300 drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]">ぐるる</span>
              </div>
            </div>

            <nav className="hidden md:flex gap-10 text-[20px] tracking-wide text-[#d1c5c7] font-bold">
              {['TOP', 'PROFILE', 'TAGS', 'MESSAGE', 'MUSIC', 'SCHEDULE'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-red-300 transition-all uppercase">{item}</a>
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
                className="fixed top-16 left-0 w-full bg-[#3a3335]/95 backdrop-blur-md border-b border-white/10 flex flex-col items-center py-4 gap-3 md:hidden z-[55] shadow-xl"
              >
                {['TOP', 'PROFILE', 'TAGS', 'MESSAGE', 'MUSIC', 'SCHEDULE'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#f4ebeb] font-bold text-[11px] tracking-[0.2em] hover:text-red-300 transition-colors uppercase"
                  >
                    {item}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <section id="top" className="min-h-[80vh] md:min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 pt-16 lg:mb-32 relative scroll-mt-24 gap-12 md:gap-0 -translate-y-10 md:translate-y-0">
            
            <div className="flex-none md:flex-1 text-center md:text-left z-10 lg:pl-10 flex flex-col items-center md:items-start">
              <div className="inline-block px-3 py-1 rounded-full border border-red-300/40 text-red-300/90 text-[13px] md:text-[20px] tracking-widest mb-4 md:mb-6 bg-red-900/10">
                新人Vtuber
              </div>
              <h1 className="text-[38px] md:text-7xl lg:text-9xl font-black text-[#f4ebeb] tracking-[15px] leading-tight drop-shadow-md">
                猫喰<span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]">ぐるる</span>
              </h1>
              <p className="text-[#c2b6b8] text-[10px] md:text-xs lg:text-sm tracking-[1em] mt-2 font-bold uppercase">Nekohami Gururu</p>
            </div>

            <div className="flex-none md:flex-1 w-full flex items-center justify-center relative z-10">
              <div className="w-64 h-64 md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] bg-[#544b4d] border border-white/10 rounded-[4rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden group transition-all">
                <span className="text-white/10 text-9xl absolute -bottom-8 -right-8 rotate-12 group-hover:rotate-0 transition-transform duration-700 drop-shadow-lg">🦴</span>
                <p className="text-[#a89c9e] text-xs italic tracking-widest">CHARACTER VIEW</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-400/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </section>

          {isLive && (
            <section className="px-6 md:px-24 lg:px-40 mb-12 max-w-7xl mx-auto scroll-mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 opacity-5 z-0 rounded-[2rem]"></div>
              <div className="bg-gradient-to-r from-red-500/15 to-[#544b4d]/90 border border-red-400/30 rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_20px_rgba(248,113,113,0.15)] relative overflow-hidden z-10">
                <div className="absolute -right-10 top-0 text-red-500/5 text-9xl rotate-12">🐾</div>
                <div className="w-full md:w-72 aspect-video bg-[#3a3335] rounded-2xl flex items-center justify-center text-sm text-gray-500 shadow-inner border border-white/5">
                  配信サムネイル
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block bg-red-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 animate-pulse">
                    🔴 NOW LIVE
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#f4ebeb] mb-2 tracking-wide">ゲリラ！ちょっとだけ雑談するよ🐾</h3>
                  <p className="text-sm text-[#d1c5c7] mb-6">TwitCastingにて配信中！遊びにきてね！</p>
                  <button className="bg-red-400 hover:bg-red-50 text-white font-bold py-3 px-8 rounded-full text-xs tracking-widest shadow-lg transition-colors flex items-center gap-2 mx-auto md:mx-0">
                    <TbBroadcast className="text-lg" />
                    配信を見に行く
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="py-16 lg:py-24 px-6 relative">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 max-w-[340px] md:max-w-none mx-auto z-10 relative">
              {snsLinks.map((sns) => (
                <div key={sns.n} className={`w-full md:w-auto px-2 md:px-6 py-3 border ${sns.c} rounded-2xl text-[10px] md:text-xs font-bold tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 md:gap-3`}>
                  {sns.icon}
                  <span className="mt-[2px]">{sns.n}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 👇 PROFILEセクション：全体をコンパクトにし、スマホではテキストを両端いっぱいに */}
          <section id="profile" className="px-6 md:px-24 lg:px-40 mb-32 lg:mb-64 max-w-7xl mx-auto scroll-mt-24">
            {/* 👇 min-h-[70vh] で高さをコンパクトにし、スマホの上下余白を py-8 に短縮 */}
            <div className="bg-[#544b4d] rounded-[2.5rem] md:rounded-[4rem] px-8 pt-10 pb-10 md:p-16 lg:p-24 border border-white/10 relative overflow-hidden shadow-2xl min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center">
              <div className="absolute top-10 right-10 text-9xl opacity-[0.01] rotate-12">🐾</div>
              
              {/* 👇 mb-6 にしてタイトルとテキストの隙間を詰める */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-red-300 mb-10 md:mb-16 flex items-center gap-4 tracking-widest drop-shadow-sm">
                <span className="text-red-400 opacity-50">🐾</span> 噛み跡紹介
              </h2>
              
              {/* 👇 gap-6 にして上下要素の隙間を詰める */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-10 items-center w-full">
                
                {/* 👇 テキストを両端いっぱい (w-full) かつ 左寄せ (text-left) に固定 */}
                <div className="w-full text-left space-y-4 md:space-y-8 text-[#d1c5c7] text-[16x] md:text-lg lg:text-xl leading-relaxed md:leading-loose font-bold tracking-wide">
                  <p>
                    {/* 👇 余計なクラスを消して、ただの <br /> に戻したよ！ */}
                    猫喰ぐるる（Nekohami Gururu）<br />
                    ポップな可愛さの裏に魚の骨のような<br />
                    鋭いこだわりを隠し持つ<br />
                    新人Vチューバー
                  </p>
                  <p>
                    ゲーム実況や歌ってみたを中心に<br />
                    リスナーの皆と楽しく<br />
                    空間を作っていくよ！
                  </p>
                </div>

                <div className="bg-[#453e40] p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 space-y-4 md:space-y-8 shadow-inner w-full">
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4">
                    <span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">誕生日</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">7月18日</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4">
                    <span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">好きなもの</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">ゲーム</span>
                  </div>
                  <div className="flex justify-between pb-1 md:pb-2">
                    <span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">ファンマーク</span><span className="text-lg md:text-xl lg:text-2xl text-[#f4ebeb]">🐾🦴</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="tags" className="px-6 md:px-24 mb-32 lg:mb-64 max-w-5xl mx-auto scroll-mt-24">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e8dbdd] mb-12 tracking-widest text-center">OFFICIAL TAGS</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {[
                { label: '総合タグ', tag: '#ぐるるの爪痕' },
                { label: 'ファンアート', tag: '#ぐるるの噛み跡' },
              ].map((t) => (
                <a 
                  key={t.label} 
                  href={`https://x.com/search?q=${encodeURIComponent(t.tag)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-1/2 bg-[#544b4d] border border-red-400/20 rounded-[3rem] py-12 px-6 text-center shadow-lg hover:border-red-400 hover:-translate-y-2 hover:shadow-red-500/20 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <p className="text-sm lg:text-base text-red-300/80 mb-4 font-black">{t.label}</p>
                  <p className="text-2xl lg:text-3xl font-black text-[#f4ebeb] tracking-wider group-hover:text-red-300 transition-colors">{t.tag}</p>
                  <div className="mt-6 text-xs text-gray-400 animate-pulse">X (Twitter) で検索 ↗</div>
                </a>
              ))}
            </div>
          </section>

          <section id="message" className="px-6 md:px-24 lg:px-40 mb-32 lg:mb-64 max-w-6xl mx-auto scroll-mt-24">
            <div className="bg-[#544b4d]/60 border border-white/5 rounded-[4rem] p-10 lg:p-20 text-center shadow-2xl relative overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
              <div className="absolute -top-10 -right-10 text-9xl opacity-[0.02] -rotate-12">🍬</div>
              <h2 className="text-3xl lg:text-5xl font-black text-red-300 mb-12 tracking-widest drop-shadow-sm flex items-center gap-3">
                ぐるるに質問ある？🐾
              </h2>
              <p className="text-base lg:text-xl text-[#d1c5c7] mb-16 leading-[2.5] max-w-2xl mx-auto font-bold tracking-wide">
                配信の感想とか、やってほしいゲームとか、どうでもいい日常の報告とか。気が向いた時に、気まぐれに配信で拾ってあげるかも。……別に、ずっと待ってるわけじゃないけどね.
              </p>
              <button className="bg-white hover:bg-red-50 text-red-400 font-black py-6 px-24 rounded-full text-lg lg:text-xl tracking-widest shadow-xl transition-all hover:scale-110 hover:shadow-red-500/30">
                マシュマロを送る
              </button>
            </div>
          </section>

          <section id="music" className="px-6 md:px-24 lg:px-40 mb-16 lg:mb-32 max-w-7xl mx-auto scroll-mt-24">
            <h2 className="text-2xl lg:text-4xl font-black text-[#f4ebeb] mb-16 tracking-tight drop-shadow-sm">LISTEN MUSIC</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {[1, 2].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video bg-[#544b4d] border border-white/10 rounded-[3rem] mb-6 flex items-center justify-center overflow-hidden relative shadow-xl">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform backdrop-blur-sm">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-red-300 border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#d1c5c7] group-hover:text-red-300 transition-colors px-4">歌ってみた動画のタイトル {i}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-24 px-6 border-b border-white/5 mb-32 lg:mb-64">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 max-w-[340px] md:max-w-none mx-auto">
              {snsLinks.map((sns) => (
                <div key={`dup-${sns.n}`} className={`w-full md:w-auto px-2 md:px-6 py-3 border ${sns.c} rounded-2xl text-[10px] md:text-xs font-bold tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 md:gap-3`}>
                  {sns.icon}
                  <span className="mt-[2px]">{sns.n}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="schedule" className="px-6 md:px-24 lg:px-40 mb-32 lg:mb-64 max-w-7xl mx-auto flex flex-col items-center scroll-mt-24">
            <div className="text-center mb-8 relative">
              <h2 className="text-3xl lg:text-5xl font-black text-red-300 tracking-[0.2em] drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">
                気まぐれ配信スケジュール
              </h2>
              <p className="text-[#a89c9e] text-xs lg:text-sm tracking-[0.4em] mt-4 font-black uppercase">Whimsical Schedule</p>
            </div>

            <div className="relative w-full max-w-2xl h-[80vh] flex flex-col items-center justify-center">
              <div className="flex gap-16 md:gap-24 mb-[-20px] relative z-10 w-full justify-center h-32">
                <div className="absolute top-[-130px] left-[-10px]">
                    <PawFinger date="3/13 (水)" title="ホラーゲーム実況" rotate="-rotate-[20deg]" />
                </div>
                <div className="absolute top-[-190px] left-[calc(50%-4.5rem)] md:left-[calc(50%-5rem)] z-10">
                    <PawFinger date="3/14 (木)" title="お歌の練習枠" rotate="rotate-0" />
                </div>
                <div className="absolute top-[-130px] right-[-10px]">
                    <PawFinger date="3/15 (金)" title="雑談枠" rotate="rotate-[20deg]" />
                </div>
              </div>

              <div className="absolute bottom-[5%] left-[15%] w-[70%] max-w-lg aspect-[1/0.8] bg-gradient-to-b from-red-500/10 to-[#544b4d]/90 backdrop-blur-md border border-red-400/30 rounded-[40%_40%_50%_50%] shadow-2xl flex flex-col items-center justify-center p-10 transition-all duration-300 hover:scale-105 hover:translate-y-2 z-20 cursor-pointer">
                <div className="inline-block bg-red-500/20 text-red-300 text-xs font-black tracking-widest px-5 py-2 rounded-full mb-6 animate-pulse">NEXT LIVE</div>
                <span className="text-4xl md:text-5xl font-black text-[#f4ebeb] mb-6 tracking-wider drop-shadow-md">3月12日（火）</span>
                <span className="text-lg md:text-xl text-[#d1c5c7] font-bold border-t border-white/10 pt-6 w-3/4 text-center leading-relaxed">ゲーム配信 / 雑談</span>
              </div>
              
              <div className="absolute bottom-[-2vh] left-[calc(50%-150px)] w-[300px] h-10 bg-black/30 rounded-[50%] blur-xl opacity-80 z-0"></div>
            </div>
          </section>

          <section id="contact" className="px-6 md:px-24 lg:px-40 mb-16 lg:mb-32 max-w-6xl mx-auto scroll-mt-24">
            <div className="p-12 lg:p-16 bg-gradient-to-br from-[#544b4d] to-[#453e40] border border-red-400/20 rounded-[4rem] text-center shadow-2xl min-h-[60vh] flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute -top-10 -left-10 text-9xl opacity-[0.02] -rotate-45">🐾</div>
              <div className="absolute -bottom-10 -right-10 text-9xl opacity-[0.02] rotate-12">🐾</div>

              <p className="text-3xl lg:text-5xl font-black text-red-300 tracking-[0.4em] mb-12 drop-shadow-md flex items-center gap-3">
                お仕事のご相談は<br></br>こちらへ🐾
              </p>
              <p className="text-lg lg:text-2xl text-[#c2b6b8] leading-loose mb-16 font-bold tracking-wide max-w-xl mx-auto">
                お仕事やコラボのご相談はDMにて承ってます🐾
              </p>
              <div className="py-6 px-16 bg-red-400/90 text-white text-lg lg:text-xl font-black tracking-widest rounded-3xl hover:bg-red-400 transition-all cursor-pointer shadow-[0_8px_30px_rgba(248,113,113,0.3)] hover:scale-105 flex items-center gap-4 group relative overflow-hidden">
                SEND MESSAGE <span className="text-2xl animate-bounce">🐾</span>
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-white/10 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-700"></div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-24 mb-32 max-w-5xl mx-auto text-center border-t border-white/10 pt-20 relative z-10 scroll-mt-24">
            <h2 className="text-sm lg:text-base font-bold text-[#c2b6b8] mb-6 tracking-widest">二次創作・ガイドラインについて</h2>
            <p className="text-xs lg:text-sm text-[#a89c9e] leading-relaxed max-w-3xl mx-auto font-medium">
              ファンアートや切り抜き動画の制作は原則大歓迎です！制作の際は、他の方の迷惑にならない範囲で、愛を持って楽しんでいただけると嬉しいです。（※センシティブな内容や、公式と誤認されるような表現はお控えください）
            </p>
          </section>

          <footer className="py-20 px-6 text-center bg-[#3a3335] border-t border-white/5 relative z-20">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 max-w-[340px] md:max-w-none mx-auto mb-16">
              {snsLinks.map((sns) => (
                <div key={`footer-${sns.n}`} className={`w-full md:w-auto px-2 md:px-6 py-3 border ${sns.c} rounded-2xl text-[10px] md:text-[11px] font-bold tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2`}>
                  {sns.icon}
                  <span className="mt-[2px]">{sns.n}</span>
                </div>
              ))}
            </div>

            <div className="mb-12 flex flex-col items-center gap-6">
              <span className="text-red-400 text-3xl lg:text-4xl italic font-black select-none tracking-widest drop-shadow-md">猫喰ぐるる</span>
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