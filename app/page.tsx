'use client';

import { useState, useEffect, useRef, type CSSProperties, type ReactNode, type MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaXTwitter, FaYoutube, FaTiktok, FaPaw } from 'react-icons/fa6';
import { TbBroadcast } from 'react-icons/tb';
import { isSiteReleased } from '@/lib/site-release';
import { translations, LANG_OPTIONS, type Lang } from '@/lib/i18n';

const preReleaseTitleParts = [
  { text: 'とある', className: 'text-[#f4ebeb]' },
  { text: '新人配信者', className: 'text-[#f4ebeb]' },
  { text: '🐾', className: 'text-red-400' },
  { text: '公式サイト', className: 'text-red-400' },
];

const PreReleaseSiteTitle = ({
  variant = 'fv',
  animated = false,
}: {
  variant?: 'splash' | 'fv';
  animated?: boolean;
}) => {
  const sizeClass =
    variant === 'splash'
      ? 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] md:tracking-[0.12em]'
      : 'text-[1.35rem] sm:text-3xl md:text-5xl lg:text-7xl tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.15em]';

  const renderPart = (part: (typeof preReleaseTitleParts)[number], index: number) => {
    const className = `${part.className} drop-shadow-[0_0_10px_rgba(248,113,113,0.35)]`;

    if (animated) {
      return (
        <motion.span
          key={part.text}
          className={className}
          initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          {part.text}
        </motion.span>
      );
    }

    return (
      <span key={part.text} className={className}>
        {part.text}
      </span>
    );
  };

  if (variant === 'splash') {
    return (
      <h1
        className={`font-black leading-tight text-center flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2 gap-y-1 max-w-[min(100%,36rem)] px-2 ${sizeClass}`}
      >
        {preReleaseTitleParts.map((part, i) => renderPart(part, i))}
      </h1>
    );
  }

  const leadParts = preReleaseTitleParts.slice(0, 3);
  const suffixPart = preReleaseTitleParts[3];

  return (
    <h1
      className={`font-black leading-tight flex flex-col items-center justify-center w-full max-w-[min(100%,36rem)] px-2 ${sizeClass}`}
    >
      <span className="inline-flex items-baseline justify-center gap-x-1 sm:gap-x-2 whitespace-nowrap">
        {leadParts.map((part, i) => renderPart(part, i))}
      </span>
      <span className="block text-center">{renderPart(suffixPart, 3)}</span>
    </h1>
  );
};

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

const NAME_NEKO_STYLE: CSSProperties = {
  WebkitTextStroke: '0.014em rgba(255,255,255,0.28)',
  paintOrder: 'stroke fill',
};

const NAME_GURU_STYLE: CSSProperties = {
  WebkitTextStroke: '0.028em #ffdce3',
  paintOrder: 'stroke fill',
};

const NAME_NEKO_CLASS = 'text-[#E7E4DC] drop-shadow-[0_0_3px_rgba(231,228,220,0.35)]';
const NAME_GURU_CLASS = 'text-[#7A3038] drop-shadow-[0_0_4px_rgba(255,220,227,0.4)]';

// 🐾 オープニング画面コンポーネント（公開後のみ名前表示）
const SplashScreen = ({ onComplete, showName }: { onComplete: () => void; showName: boolean }) => {
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

      <div className="relative z-10 px-4 flex justify-center w-full">
        {showName ? (
          <div className="flex gap-1 md:gap-2">
            {chars.map((char, i) => (
            <motion.span
              key={i}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black"
              initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.6, type: 'spring', stiffness: 100 }}
            >
              <span className={i < 2 ? NAME_NEKO_CLASS : NAME_GURU_CLASS} style={i < 2 ? NAME_NEKO_STYLE : NAME_GURU_STYLE}>
                {char}
              </span>
            </motion.span>
            ))}
          </div>
        ) : (
          <PreReleaseSiteTitle variant="splash" animated />
        )}
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

const ACCENT_STROKE: CSSProperties = {
  WebkitTextStroke: '0.8px #fff4f6',
  paintOrder: 'stroke fill',
};

const AccentText = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span className={`text-[#e24e5f] ${className}`} style={ACCENT_STROKE}>
    {children}
  </span>
);

const isUndecidedLabel = (value: string) => /未定|TBD|미정/.test(value);

// PC用スケジュールパーツ
const PawFinger = ({ date, title, rotate }: { date: string, title: string, rotate: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className={`relative w-32 h-32 md:w-40 md:h-40 bg-[#544b4d]/80 backdrop-blur-md border border-white/10 rounded-[50%_50%_40%_40%] ${rotate} shadow-lg flex flex-col items-center justify-center p-4 transition-all duration-300 hover:-translate-y-4 cursor-pointer group`}
  >
    <div className="absolute top-[-22%] left-[calc(50%-10px)] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-red-400 opacity-80 z-[-1] transition-transform duration-300 group-hover:scale-110"></div>
    {isUndecidedLabel(date) ? (
      <AccentText className="text-sm md:text-base font-bold">{date}</AccentText>
    ) : (
      <span className="text-sm md:text-base font-bold text-red-300">{date}</span>
    )}
            <span className="text-[11px] md:text-xs text-[#d1c5c7] mt-2 text-center leading-snug font-medium whitespace-pre-wrap">{title}</span>
  </motion.div>
);

const SiteName = () => (
  <>
    <span className={NAME_NEKO_CLASS} style={NAME_NEKO_STYLE}>
      猫喰
    </span>
    <span className={NAME_GURU_CLASS} style={NAME_GURU_STYLE}>
      ぐるる
    </span>
  </>
);

const menuPawParticles = [
  { left: '18%', rotateFrom: 45, rotateTo: 180 },
  { left: '32%', rotateFrom: 120, rotateTo: 320 },
  { left: '48%', rotateFrom: 200, rotateTo: 90 },
  { left: '62%', rotateFrom: 15, rotateTo: 270 },
  { left: '78%', rotateFrom: 310, rotateTo: 140 },
  { left: '25%', rotateFrom: 80, rotateTo: 400 },
  { left: '55%', rotateFrom: 160, rotateTo: 20 },
  { left: '70%', rotateFrom: 240, rotateTo: 500 },
  { left: '40%', rotateFrom: 30, rotateTo: 220 },
  { left: '85%', rotateFrom: 190, rotateTo: 360 },
];

const mashmallowPawTrail = [
  { left: '8%', top: '76%' },
  { left: '26%', top: '60%' },
  { left: '44%', top: '44%' },
  { left: '62%', top: '28%' },
  { left: '80%', top: '12%' },
];

const LanguageSwitcher = ({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (next: Lang) => void;
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = LANG_OPTIONS.find((l) => l.id === lang)!;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div ref={wrapRef} className="relative z-[70] shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border-2 border-red-400/50 bg-[#3a3335] text-[#E7E4DC] text-[10px] sm:text-xs md:text-sm font-black tracking-wider hover:border-red-300 hover:text-red-300 transition-all shadow-[0_0_12px_rgba(248,113,113,0.25)]"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-[calc(100%+10px)] min-w-[11rem] rounded-2xl border-2 border-red-400/40 bg-[#2a2526]/95 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.45)] overflow-hidden"
            role="listbox"
          >
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={opt.id === lang}
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                className={`w-full px-4 py-3 text-sm font-bold tracking-wide transition-colors flex items-center gap-2 ${
                  opt.id === lang
                    ? 'bg-red-400/20 text-red-300'
                    : 'text-[#E7E4DC] hover:bg-white/10 hover:text-red-200'
                }`}
              >
                <span className="text-[10px] opacity-60">{opt.short}</span>
                <span>{opt.label}</span>
                {opt.id === lang && <FaPaw className="text-xs" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactTapHint = ({
  hidden,
  label,
  onTap,
}: {
  hidden: boolean;
  label: string;
  onTap: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hintBoxClass =
    'rounded-3xl bg-red-500/18 border-2 border-red-400/55 backdrop-blur-md shadow-[0_0_28px_rgba(248,113,113,0.5)]';

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[calc(100%+2.7rem)] pointer-events-auto cursor-pointer select-none z-[40] hidden xl:block"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => {
            e.stopPropagation();
            onTap();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onTap();
            }
          }}
        >
          <motion.div
            className={`flex items-center gap-4 px-7 py-4 ${hintBoxClass}`}
            animate={{ opacity: [0.85, 1, 0.85], x: [0, 11, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="text-[1.8rem] lg:text-[2rem] font-bold tracking-[0.14em] text-[#ffe8ec] drop-shadow-[0_0_10px_rgba(255,200,210,0.65)] whitespace-nowrap">
              {label}
            </span>
            <motion.span
              className="text-[2rem] lg:text-4xl text-red-400 drop-shadow-[0_0_16px_rgba(248,113,113,0.9)] leading-none"
              animate={{ x: [0, 9, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ☞
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TWITTER_DM_URL = 'https://twitter.com/messages/compose?recipient_id=2005495955274219520';

const LiveStreamThumbnail = ({ primarySrc }: { primarySrc: string }) => {
  const [src, setSrc] = useState(primarySrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSrc(primarySrc);
    setFailed(false);
  }, [primarySrc]);

  const fallbacks = [
    primarySrc,
    primarySrc.includes('/api/live/thumbnail') ? null : `/api/live/thumbnail`,
    `https://twitcasting.tv/api/live/thumbnail.php?user=${TWITCASTING_SCREEN_ID}&size=large`,
  ].filter(Boolean) as string[];

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#a89c9e]">
        <FaPaw className="text-red-400/25 text-5xl md:text-6xl" />
        <span className="text-xs tracking-widest">配信中🐾</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="配信サムネイル"
      className="absolute inset-0 w-full h-full object-cover object-center"
      onError={() => {
        const currentIndex = fallbacks.indexOf(src);
        const next = fallbacks[currentIndex + 1];
        if (next) {
          setSrc(next);
          return;
        }
        setFailed(true);
      }}
    />
  );
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('ja');
  const t = translations[lang];
  const fmtDate = (d: string) => (d.includes('未定') ? t.undecided : d);
  
  const [isTicketCut, setIsTicketCut] = useState(false);
  const cutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const [schedulePulse, setSchedulePulse] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fallback = Array(4).fill({ date: "未定🐾", title: "COMING SOON" });
    let hasLoaded = false;
    let lastStamp = '';

    const fetchCalendar = async () => {
      try {
        const res = await fetch(`/api/calendar?t=${Date.now()}`, { cache: 'no-store' });

        if (!res.ok) {
          if (!hasLoaded && !cancelled) {
            setNextLive(fallback[0]);
            setScheduleList(fallback.slice(1, 4));
          }
          return;
        }

        const data = await res.json();
        let formattedEvents: { date: string, title: string }[] = [];

        if (data.items && data.items.length > 0) {
          formattedEvents = data.items.map((event: { start?: { dateTime?: string; date?: string }; summary?: string }) => {
            const dateObj = new Date(event.start?.dateTime || event.start?.date || '');
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();
            const days = ['日', '月', '火', '水', '木', '金', '土'];
            const dayOfWeek = days[dateObj.getDay()];

            let timeString = '';
            if (event.start?.dateTime) {
              const hours = dateObj.getHours();
              const minutes = String(dateObj.getMinutes()).padStart(2, '0');
              timeString = `${hours}:${minutes}〜\n`;
            }

            return {
              date: `${month}/${day} (${dayOfWeek})`,
              title: `${timeString}${event.summary || '秘密の予定🐾'}`,
            };
          });
        }

        while (formattedEvents.length < 4) {
          formattedEvents.push({
            date: "未定🐾",
            title: "COMING SOON",
          });
        }

        if (cancelled) return;
        hasLoaded = true;
        const stamp = JSON.stringify(formattedEvents);
        const changed = stamp !== lastStamp;
        if (changed && lastStamp !== '') setSchedulePulse((n) => n + 1);
        lastStamp = stamp;
        setNextLive(formattedEvents[0]);
        setScheduleList(formattedEvents.slice(1, 4));
      } catch (error) {
        console.error('カレンダーの取得に失敗したぜ:', error);
        if (!hasLoaded && !cancelled) {
          setNextLive(fallback[0]);
          setScheduleList(fallback.slice(1, 4));
        }
      }
    };

    fetchCalendar();
    const timer = window.setInterval(fetchCalendar, 5 * 60 * 1000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') fetchCalendar();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const snsLinks = [
    { n: 'X (Twitter)', url: 'https://x.com/h_neko20?s=21', Icon: FaXTwitter, c: 'bg-red-400/15 text-red-300 border-red-400/30' },
    { n: 'YouTube', url: 'https://youtube.com/channel/UC_u4f-7IHt12WxU05JNctIQ?si=bzIZIOaWskbPPSX2', Icon: FaYoutube, c: 'bg-white/10 text-[#f4ebeb] border-white/20' },
    { n: 'TwitCasting', url: 'https://twitcasting.tv/h_neko20', Icon: TbBroadcast, c: 'bg-sky-400/10 text-sky-200 border-sky-400/20' },
    { n: 'TikTok', url: 'https://www.tiktok.com/@h_neko20?_r=1&_t=ZS-98sisJIc8iz', Icon: FaTiktok, c: 'bg-amber-400/10 text-amber-200 border-amber-400/20' }
  ];

  const navItems = [
    { key: 'top' as const, href: '#top' },
    { key: 'profile' as const, href: '#profile' },
    { key: 'tags' as const, href: '#tags' },
    { key: 'music' as const, href: '#music' },
    { key: 'marshmallow' as const, href: '#message' },
    { key: 'schedule' as const, href: '#schedule' },
    { key: 'contact' as const, href: '#contact', mobileHref: '#contact-mobile' },
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

  useEffect(() => {
    const saved = window.localStorage.getItem('gururu-lang');
    if (saved === 'ja' || saved === 'en' || saved === 'ko') setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('gururu-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const handleCutTicket = () => {
    if (cutTimeoutRef.current) clearTimeout(cutTimeoutRef.current);
    const play = () => {
      setIsTicketCut(true);
      cutTimeoutRef.current = setTimeout(() => {
        setIsTicketCut(false);
      }, 1500);
    };
    if (isTicketCut) {
      setIsTicketCut(false);
      cutTimeoutRef.current = setTimeout(play, 40);
      return;
    }
    play();
  };

  const handleSendMessage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    handleCutTicket();
    if (sendTimeoutRef.current) clearTimeout(sendTimeoutRef.current);
    sendTimeoutRef.current = setTimeout(() => {
      window.open(TWITTER_DM_URL, '_blank', 'noopener,noreferrer');
    }, 750);
  };

  useEffect(() => {
    return () => {
      if (cutTimeoutRef.current) clearTimeout(cutTimeoutRef.current);
      if (sendTimeoutRef.current) clearTimeout(sendTimeoutRef.current);
    };
  }, []);

  // ==========================================
  // 公開フラグ — デビュー時: NEXT_PUBLIC_SITE_RELEASED=true（本番）
  // ==========================================
  const isReleased = isSiteReleased();

  if (!isReleased) {
    return (
      <>
        <AnimatePresence>
          {showSplash && (
            <SplashScreen onComplete={() => setShowSplash(false)} showName={false} />
          )}
        </AnimatePresence>

        {!showSplash && (
          <main className="min-h-screen bg-[#453e40] text-[#f4ebeb] font-sans selection:bg-red-500/30 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-dark.png')] z-0"></div>
            <GlassPawBG className="w-64 h-64 top-[10%] left-[10%] rotate-12" />
            <GlassPawBG className="w-40 h-40 bottom-[20%] right-[10%] -rotate-45" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center gap-8 p-6 text-center"
            >
              <FaPaw className="text-red-400/50 text-6xl md:text-8xl mb-2 animate-bounce drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]" />

              <PreReleaseSiteTitle variant="fv" />

              <div className="w-24 h-[2px] bg-red-400/50 rounded-full"></div>

              <p className="text-2xl md:text-4xl text-red-300 font-black tracking-[0.3em] md:tracking-[0.5em] drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]">
                COMING SOON
              </p>

              <div className="mt-4 flex flex-col items-center gap-3">
                <p className="text-[#a89c9e] text-sm md:text-base font-bold tracking-[0.2em] border border-white/10 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm">
                  2026 DEBUT🐾
                </p>
                <a
                  href="https://x.com/h_neko20?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-300 hover:text-red-200 text-sm md:text-base font-bold tracking-widest mt-2 flex items-center gap-2 transition-colors underline underline-offset-4 decoration-red-400/80 decoration-2 hover:decoration-red-300 drop-shadow-[0_0_10px_rgba(248,113,113,0.35)]"
                >
                  <FaXTwitter className="text-base md:text-lg" />
                  {t.followX}
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
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} showName={isReleased} />}
      </AnimatePresence>

      <motion.div
        className="fixed inset-0 z-[10000] pointer-events-none hidden xl:block"
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

      {/* TODO: PCのみ画面下SD。魚をぐるるが一方通行で追う。端で反転せずリスポーン。肉球トレイル最大3。イラスト待ち。 */}
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
          
          <header className="fixed top-0 w-full h-16 bg-[#453e40]/90 backdrop-blur-sm border-b border-white/10 z-[60] flex items-center justify-between px-4 sm:px-6 md:px-10 xl:px-16 shadow-sm overflow-visible">
            <div className="flex items-center gap-2">
              <span className="text-2xl opacity-80">🐾</span>
              <div className="font-bold text-sm sm:text-base tracking-[0.1em] cursor-default">
                <SiteName />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 xl:gap-6">
            <nav className="hidden xl:flex gap-5 2xl:gap-10 text-[17px] 2xl:text-[20px] tracking-wide text-[#E7E4DC] font-bold">
              {navItems.map((item) => (
                <motion.a 
                  key={item.key} 
                  href={item.href}
                  className="hover:text-red-300 transition-all whitespace-nowrap"
                  onHoverStart={() => setIsHoveringLink(true)}
                  onHoverEnd={() => setIsHoveringLink(false)}
                >{t.nav[item.key]}</motion.a>
              ))}
            </nav>
            <LanguageSwitcher lang={lang} onChange={setLang} />
            <button 
              className="xl:hidden text-[#E7E4DC] p-2 focus:outline-none"
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
            </div>
          </header>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-16 left-0 w-full bg-[#3a3335]/95 backdrop-blur-md border-b border-white/10 flex flex-col items-center py-4 md:py-6 gap-3 md:gap-4 xl:hidden z-[55] shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {menuPawParticles.map((p, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-5 h-5 text-[#ffdce3] opacity-60 drop-shadow-[0_0_8px_rgba(255,220,227,0.4)]"
                      style={{ left: p.left, top: '-10%' }}
                      animate={{
                        y: ['0vh', '100vh'],
                        opacity: [0, 0.6, 0.6, 0],
                        rotate: [p.rotateFrom, p.rotateTo],
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

                {navItems.map((item) => (
                  <a 
                    key={item.key} 
                    href={item.mobileHref ?? item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#E7E4DC] font-bold text-sm md:text-base lg:text-lg tracking-[0.2em] hover:text-red-300 transition-colors relative z-10"
                  >
                    {t.nav[item.key]}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <section id="top" className="min-h-[80vh] md:min-h-0 xl:min-h-screen flex flex-col md:flex-row items-center justify-start xl:justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 pt-24 sm:pt-28 md:pt-28 lg:pt-24 xl:pt-16 pb-16 md:pb-20 xl:pb-0 mb-24 sm:mb-32 lg:mb-48 relative scroll-mt-24 gap-8 sm:gap-12 md:gap-10 lg:gap-12 xl:gap-0">
            <div className="flex-none md:flex-1 text-center md:text-left z-10 lg:pl-6 xl:pl-10 flex flex-col items-center md:items-start">
              <div className="inline-block px-3 py-1 rounded-full border border-red-300/40 text-red-300/90 text-[12px] sm:text-[13px] md:text-[16px] lg:text-[18px] xl:text-[20px] tracking-widest mb-4 md:mb-6 bg-red-900/10">
                {t.fvBadge}
              </div>
              <h1 className="text-[32px] sm:text-[36px] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-black tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] xl:tracking-[15px] leading-tight whitespace-nowrap ml-[6px] sm:ml-[10px] md:ml-[16px] xl:ml-[20px]">
                <SiteName />
              </h1>
              
              <p className="text-[#E7E4DC] text-[9px] sm:text-[10px] md:text-[11px] lg:text-sm xl:text-[21px] tracking-[0.55em] sm:tracking-[0.7em] md:tracking-[0.35em] lg:tracking-[0.4em] xl:tracking-[1em] mt-2 font-bold uppercase whitespace-nowrap lg:ml-[20px] xl:ml-[30px]">
                NEKOHAMI GURURU
              </p>

              {/* ========================================== */}
              {/* ▼ PC用サブタイトル（1280px以上） ▼ */}
              {/* ========================================== */}
              <div className={`hidden xl:flex items-center justify-start mt-6 mb-2 font-bold tracking-widest w-full ${lang === 'ja' ? 'whitespace-nowrap' : 'flex-wrap'}`}>
                <AccentText className={`text-[28px] 2xl:text-[40px] ${lang === 'ja' ? '' : 'whitespace-normal'}`}>{t.fvSubLead}</AccentText>
                <span className="flex flex-row items-center mx-3 whitespace-nowrap">
                  <span className="text-[24px] 2xl:text-[30px] opacity-90 tracking-normal">🐈‍⬛</span>
                  <AccentText className="text-[28px] 2xl:text-[40px] mx-3">{t.fvSubRole}</AccentText>
                  <span className="text-[24px] 2xl:text-[30px] opacity-90 tracking-normal">⛓️</span>
                </span>
              </div>

              {/* ========================================== */}
              {/* ▼ モバイル・タブレット用サブタイトル ▼ */}
              {/* ========================================== */}
              <div className="flex xl:hidden flex-col items-center md:items-start justify-center mt-6 mb-2 font-bold tracking-widest w-full">
                <AccentText className={`text-[15px] sm:text-[18px] md:text-[22px] lg:text-[26px] ${lang === 'ja' ? 'whitespace-nowrap' : 'whitespace-normal text-center md:text-left'}`}>{t.fvSubLead}</AccentText>
                <span className="flex flex-row items-center mt-2 whitespace-nowrap">
                  <span className="text-[15px] sm:text-[16px] md:text-[20px] lg:text-[24px] opacity-90 tracking-normal">🐈‍⬛</span>
                  <AccentText className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] mx-2">{t.fvSubRole}</AccentText>
                  <span className="text-[15px] sm:text-[16px] md:text-[20px] lg:text-[24px] opacity-90 tracking-normal">⛓️</span>
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
                className="relative h-56 sm:h-64 md:h-[360px] lg:h-[460px] xl:h-[550px] aspect-square bg-[#544b4d] border border-white/10 rounded-[3rem] md:rounded-[4rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden group transition-all"
                style={{ rotateX: tiltRotateX, rotateY: tiltRotateY }}
              >
                <div
                  className="absolute inset-0 z-30 rounded-[4rem] pointer-events-none transition-opacity duration-100"
                  style={{
                    opacity: 1,
                    border: '0.75px solid rgba(138, 24, 24, 0.95)',
                    boxShadow: 'inset 0 0 10px rgba(74, 12, 12, 0.9), 0 0 14px rgba(127, 29, 29, 0.95), 0 0 36px rgba(153, 27, 27, 0.95), 0 0 72px rgba(185, 28, 28, 0.85)'
                  }}
                />
                <span className="text-white/10 text-9xl absolute -bottom-8 -right-8 rotate-12 group-hover:rotate-0 transition-transform duration-700 drop-shadow-lg pointer-events-none">🦴</span>
                <img
                  src="/img/fv1.jpg"
                  alt="猫喰ぐるる"
                  className="w-full h-full object-cover object-top scale-150 origin-top"
                />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-400/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            </div>
          </section>

          {/* ▼▼▼ YouTubeとツイキャスでデザインが変わるハイブリッドバナー ▼▼▼ */}
          {liveInfo.isLive && (
            <section className="px-4 sm:px-6 md:px-16 lg:px-24 mb-32 lg:mb-48 max-w-[min(100%,88rem)] mx-auto scroll-mt-24">
              <div
                className={`rounded-[2.5rem] md:rounded-[4rem] border backdrop-blur-md min-h-[60vh] p-6 md:p-8 lg:p-12 relative overflow-hidden bg-[#544b4d]/75 ${
                  liveInfo.platform === 'youtube'
                    ? 'border-red-400/30 shadow-[0_0_35px_rgba(248,113,113,0.12)]'
                    : 'border-sky-400/30 shadow-[0_0_35px_rgba(56,189,248,0.12)]'
                }`}
              >
                <div
                  className={`absolute inset-0 pointer-events-none ${
                    liveInfo.platform === 'youtube'
                      ? 'bg-gradient-to-br from-red-500/15 via-red-400/8 to-transparent'
                      : 'bg-gradient-to-br from-sky-500/15 via-sky-400/8 to-transparent'
                  }`}
                />
                <div
                  className={`absolute -left-20 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
                    liveInfo.platform === 'youtube' ? 'bg-red-400/10' : 'bg-sky-400/10'
                  }`}
                />
                <div
                  className={`absolute -right-10 bottom-0 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
                    liveInfo.platform === 'youtube' ? 'bg-red-300/8' : 'bg-sky-300/8'
                  }`}
                />
                <div className="absolute top-8 right-10 text-8xl opacity-[0.03] rotate-12 pointer-events-none">🐾</div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-14 min-h-[calc(60vh-3rem)] md:min-h-[calc(60vh-4rem)] lg:justify-start">
                  <div className="relative w-full lg:w-[min(62%,44rem)] aspect-[16/9] shrink-0 rounded-[2rem] md:rounded-[2.5rem] bg-[#453e40]/70 border border-white/10 overflow-hidden shadow-inner">
                    {liveInfo.thumbnail ? (
                      <LiveStreamThumbnail primarySrc={liveInfo.thumbnail} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaPaw className={`text-5xl ${liveInfo.platform === 'youtube' ? 'text-red-400/20' : 'text-sky-400/20'}`} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#453e40]/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border animate-pulse bg-red-500/20 border-red-400/40 text-red-200 shadow-[0_0_14px_rgba(248,113,113,0.35)]">
                      🔴 NOW LIVE
                    </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left py-2 lg:py-6 flex-1 lg:min-w-[18rem] xl:min-w-[22rem]">
                    <p
                      className={`text-[10px] md:text-xs font-black tracking-[0.35em] mb-4 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] ${
                        liveInfo.platform === 'youtube' ? 'text-red-300/80' : 'text-sky-200/80'
                      }`}
                    >
                      {liveInfo.platform === 'youtube' ? 'YouTube Live' : 'TwitCasting Live'}
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#f4ebeb] mb-5 tracking-wide line-clamp-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]">
                      {liveInfo.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#d1c5c7] mb-8 max-w-md leading-relaxed font-bold">
                      {liveInfo.platform === 'youtube' ? t.liveYoutube : t.liveTwicast}
                    </p>

                    <motion.a
                      href={liveInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      className={`inline-flex font-bold py-3.5 px-9 rounded-full text-xs md:text-sm tracking-widest transition-all items-center gap-2.5 backdrop-blur-md border ${
                        liveInfo.platform === 'youtube'
                          ? 'bg-red-500/25 border-red-400/45 text-red-100 hover:bg-red-500/35 shadow-[0_0_22px_rgba(248,113,113,0.28)] hover:shadow-[0_0_28px_rgba(248,113,113,0.4)]'
                          : 'bg-sky-500/25 border-sky-400/45 text-sky-50 hover:bg-sky-500/35 shadow-[0_0_22px_rgba(56,189,248,0.28)] hover:shadow-[0_0_28px_rgba(56,189,248,0.4)]'
                      }`}
                      onHoverStart={() => setIsHoveringLink(true)}
                      onHoverEnd={() => setIsHoveringLink(false)}
                    >
                      {liveInfo.platform === 'youtube' ? <FaYoutube className="text-lg" /> : <TbBroadcast className="text-lg" />}
                      {t.liveWatch}
                    </motion.a>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* ▲▲▲ ハイブリッドバナーここまで ▲▲▲ */}

          <motion.section 
            id="profile"
            className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 mb-32 lg:mb-48 max-w-7xl mx-auto scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-[#544b4d] rounded-[2.5rem] md:rounded-[4rem] px-6 sm:px-8 pt-10 pb-10 md:p-12 lg:p-16 xl:p-24 border border-white/10 relative overflow-hidden shadow-2xl min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center">
              <div className="absolute top-10 right-10 text-9xl opacity-[0.01] rotate-12">🐾</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-10 md:mb-16 flex items-center gap-4 tracking-widest">
                <span className="text-red-400 opacity-50">🐾</span> <AccentText>{t.profileTitle}</AccentText>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-10 items-center w-full">
                <div className="w-full text-left space-y-4 md:space-y-8 text-[#d1c5c7] text-[16px] md:text-lg lg:text-xl leading-relaxed md:leading-loose font-bold tracking-wide">
                  <p>
                    {t.bio1.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br className="hidden md:inline" />}
                      </span>
                    ))}
                  </p>
                  <p>
                    {t.bio2.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br className="hidden md:inline" />}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="bg-[#453e40] p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 space-y-4 md:space-y-8 shadow-inner w-full">
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">{t.birthday}</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">{t.birthdayValue}</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">{t.height}</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">{t.heightValue}</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-3 md:pb-4"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">{t.likes}</span><span className="text-base md:text-lg lg:text-xl font-bold text-[#f4ebeb]">{t.likesValue}</span></div>
                  <div className="flex justify-between pb-1 md:pb-2"><span className="text-sm md:text-base lg:text-lg text-[#a89c9e] font-medium">{t.fanMark}</span><span className="text-lg md:text-xl lg:text-2xl text-[#f4ebeb]">🐈‍⬛⛓️</span></div>
                </div>
              </div>
            </div>
          </motion.section>

          <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-32 lg:mb-48 relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full z-10 relative items-stretch">
              {snsLinks.map((sns) => (
                <a 
                  key={sns.n} 
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full h-full px-1.5 sm:px-2 md:px-4 lg:px-5 py-4 sm:py-5 md:py-[18px] border ${sns.c} rounded-2xl sm:rounded-3xl text-[10px] sm:text-[12px] md:text-base lg:text-lg font-bold tracking-wide md:tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-[18px]`}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  <sns.Icon className="text-lg sm:text-xl md:text-2xl lg:text-[22px] xl:text-[27px] shrink-0" />
                  <span className="mt-[2px] whitespace-nowrap">{sns.n}</span>
                </a>
              ))}
            </div>
          </section>

          <motion.section 
            id="tags"
            className="px-4 sm:px-6 md:px-12 lg:px-24 mb-32 lg:mb-48 max-w-5xl mx-auto scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#E7E4DC] mb-12 tracking-widest text-center">OFFICIAL TAGS</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {[
                // TODO: 総合タグは仮置き。配信で募集して決める可能性あり。
                // その場合は表示を「？？？」or「募集中」にし、総合タグだけX検索リンクを無効化する（ファンアートは現状維持）。
                { label: t.tagGeneral, tag: '#ぐるるのおもちゃ' },
                { label: t.tagFanart, tag: '#ぐるるの噛み跡' },
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
                  <p className="text-sm lg:text-base mb-4 font-black"><AccentText>{t.label}</AccentText></p>
                  <p className="text-2xl lg:text-3xl font-black text-[#E7E4DC] tracking-wider group-hover:text-red-300 transition-colors">{t.tag}</p>
                  <div className="mt-6 text-xs text-gray-400 animate-pulse">{t.tagSearch}</div>
                </motion.a>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="music"
            className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 mb-32 lg:mb-48 max-w-7xl mx-auto scroll-mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl lg:text-4xl font-black text-[#E7E4DC] mb-16 tracking-tight drop-shadow-sm">LISTEN MUSIC</h2>
            <motion.div
              className="w-full group"
              onHoverStart={() => setIsHoveringLink(true)}
              onHoverEnd={() => setIsHoveringLink(false)}
            >
              <div className="aspect-video bg-[#544b4d]/80 backdrop-blur-md border border-red-400/20 rounded-[3rem] flex flex-col items-center justify-center overflow-hidden relative shadow-xl transition-all duration-500 hover:border-red-400/40 hover:drop-shadow-[0_0_20px_rgba(244,114,182,0.25)]">
                <GlassPawBG className="w-40 h-40 md:w-64 md:h-64 top-[-10%] left-[-6%] rotate-12" />
                <GlassPawBG className="w-36 h-36 md:w-52 md:h-52 bottom-[-12%] right-[-4%] -rotate-[30deg]" />
                <GlassPawBG className="hidden md:block w-24 h-24 top-[8%] right-[14%] rotate-[50deg]" />

                <div className="absolute inset-0 pointer-events-none opacity-45">
                  <FaPaw className="absolute bottom-[14%] left-[8%] text-4xl md:text-6xl text-[#3a3335] -rotate-12" />
                  <FaPaw className="absolute top-[16%] left-[18%] text-3xl md:text-5xl text-[#3a3335] rotate-12" />
                  <FaPaw className="absolute top-[20%] right-[14%] text-4xl md:text-5xl text-[#3a3335] -rotate-6" />
                  <FaPaw className="absolute bottom-[18%] right-[10%] text-3xl md:text-6xl text-[#3a3335] rotate-[18deg]" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-transparent to-red-300/5 pointer-events-none"></div>
                <div className="absolute inset-0 bg-red-400/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center gap-5 md:gap-7 px-4 md:px-6">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 bg-red-500/15 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-300/30 shadow-[0_0_28px_rgba(248,113,113,0.35)]"
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <FaPaw className="text-2xl md:text-3xl text-red-300 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                  </motion.div>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
                    <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl drop-shadow-[0_0_10px_rgba(255,220,227,0.45)] shrink-0">🐈‍⬛</span>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-[#e24e5f] font-black tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.22em] lg:tracking-[0.28em] xl:tracking-[0.35em] whitespace-nowrap"
                      style={ACCENT_STROKE}
                      animate={{ rotate: [-1.4, 1.4, -1.4], y: [0, -3, 0] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      COMING SOON
                    </motion.p>
                    <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl drop-shadow-[0_0_10px_rgba(255,220,227,0.45)] shrink-0">⛓️</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section 
            id="message"
            className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 mb-32 lg:mb-48 max-w-6xl mx-auto scroll-mt-24 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            onHoverStart={() => setIsHoveringLink(true)}
            onHoverEnd={() => setIsHoveringLink(false)}
          >
            <div className="bg-[#544b4d]/80 backdrop-blur-md border border-white/5 rounded-2xl md:rounded-[2.5rem] p-8 md:p-16 lg:p-20 text-center shadow-2xl relative overflow-hidden min-h-[60vh] flex flex-col justify-center items-center group z-10 cursor-pointer transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(244,114,182,0.2)]">
              
              <div className="absolute inset-0 pointer-events-none z-0">
                {mashmallowPawTrail.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-5xl md:text-6xl rotate-[28deg]"
                    style={{ left: p.left, top: p.top, translateY: i % 2 === 0 ? '-6px' : '6px' }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 5.2,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2.4,
                      ease: 'easeInOut',
                      times: [0, 0.1, 0.72, 1],
                    }}
                  >
                    <span className="relative inline-flex">
                      <FaPaw className="absolute text-red-300/70 scale-[1.07] drop-shadow-[0_0_4px_rgba(252,165,165,0.55)]" />
                      <FaPaw className="relative text-[#3a3335]" />
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="absolute top-0 left-0 w-full h-[120px] md:h-[200px] border-t border-white/5 bg-gradient-to-b from-white/5 to-transparent [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 w-[50%] h-[120px] md:h-[200px] border-l border-white/5 bg-gradient-to-tr from-white/5 to-transparent [clip-path:polygon(0_100%,100%_100%,0_0)] pointer-events-none z-10"></div>
              <div className="absolute bottom-0 right-0 w-[50%] h-[120px] md:h-[200px] border-r border-white/5 bg-gradient-to-tl from-white/5 to-transparent [clip-path:polygon(100%_100%,0_100%,100%_0)] pointer-events-none z-10"></div>

              <div className="absolute inset-0 bg-red-400/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              <div className="relative mb-8 md:mb-12 z-20 mt-6 group-hover:drop-shadow-[0_0_8px_rgba(255,220,227,0.4)] transition-all duration-300">
                <motion.div
                  className="inline-block mb-3 text-red-400/40 text-2xl md:text-3xl"
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaPaw />
                </motion.div>
                <h2 className={`text-lg sm:text-xl md:text-3xl lg:text-4xl font-black text-[#E7E4DC] mb-0 tracking-widest drop-shadow-sm flex items-center justify-center gap-2 px-2 ${lang === 'ja' ? 'whitespace-nowrap' : 'text-center'}`}>
                  {t.mashTitle}
                </h2>
              </div>

              <div className="w-full max-w-2xl mx-auto relative z-20 mb-12 md:mb-16">
                <p className="text-[13px] md:text-base lg:text-lg text-[#d1c5c7] leading-loose md:leading-[2.5] font-medium tracking-wide group-hover:text-[#e8dbdd] transition-colors">
                  {t.mashBody.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br className="hidden md:inline" />}
                    </span>
                  ))}
                </p>
              </div>

              <motion.a
                href="https://marshmallow-qa.com/mc6zg5s50zm51dq?t=qzPt3N&utm_medium=url_text&utm_source=promotion"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 0 0px rgba(248,113,113,0)',
                    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 0 22px rgba(248,113,113,0.4)',
                    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 0 0px rgba(248,113,113,0)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 0.2 },
                }}
                className="bg-[#3a3335] group-hover:bg-[#453e40] text-red-300 font-bold py-4 px-6 sm:px-8 md:py-5 md:px-16 rounded-full text-xs sm:text-sm md:text-base tracking-widest shadow-lg border border-red-300/20 flex items-center justify-center gap-3 whitespace-nowrap w-[90%] max-w-[320px] mx-auto active:scale-95 z-20 group-hover:border-red-300"
                onHoverStart={() => setIsHoveringLink(true)}
                onHoverEnd={() => setIsHoveringLink(false)}
              >
                <motion.svg
                  className="w-5 h-5 md:w-6 md:h-6 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </motion.svg>
                {t.mashButton}
              </motion.a>
              
            </div>
          </motion.section>

          <section className="py-16 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 border-b border-white/5 mb-32 lg:mb-48">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full items-stretch">
              {snsLinks.map((sns) => (
                <a 
                  key={`dup-${sns.n}`} 
                  href={sns.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full h-full px-1.5 sm:px-2 md:px-4 lg:px-5 py-4 sm:py-5 md:py-[18px] border ${sns.c} rounded-2xl sm:rounded-3xl text-[10px] sm:text-[12px] md:text-base lg:text-lg font-bold tracking-wide md:tracking-widest hover:scale-105 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-[18px]`}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  <sns.Icon className="text-lg sm:text-xl md:text-2xl lg:text-[22px] xl:text-[27px] shrink-0" />
                  <span className="mt-[2px] whitespace-nowrap">{sns.n}</span>
                </a>
              ))}
            </div>
          </section>

          <section id="schedule" className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 mb-32 lg:mb-48 max-w-7xl mx-auto flex flex-col items-center scroll-mt-24">
            <motion.div
              className="w-full flex flex-col items-center"
              animate={schedulePulse > 0 ? { opacity: [0.45, 1] } : { opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            <div className="text-center mb-8 relative hidden xl:block">
              <h2 className="text-3xl lg:text-5xl font-black tracking-[0.2em] flex items-center justify-center gap-2">
                <AccentText>{t.scheduleTitleLead}</AccentText>
                <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-[1.2em] leading-none mt-[-0.1em]">{t.scheduleTitleMid}</span>
                <AccentText>{t.scheduleTitleTail}</AccentText>
              </h2>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-[0.2em] mb-8 text-center xl:hidden flex flex-col items-center gap-2">
              <div className="flex items-end gap-1">
                <AccentText>{t.scheduleTitleLead}</AccentText>
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] text-[1.25em] leading-none mt-[-0.1em]">{t.scheduleTitleMid}</span>
              </div>
              <AccentText>{t.scheduleTitleTail}</AccentText>
            </h2>

            {/* --- PC版表示 --- */}
            <div className="relative w-full max-w-2xl h-[80vh] hidden xl:flex flex-col items-center justify-center">
              <div className="flex gap-16 md:gap-24 mb-[-20px] relative z-10 w-full justify-center h-32">
                <div className="absolute top-[-130px] left-[-10px]"><PawFinger date={fmtDate(scheduleList[0].date)} title={scheduleList[0].title} rotate="-rotate-[20deg]" /></div>
                <div className="absolute top-[-190px] left-[calc(50%-4.5rem)] md:left-[calc(50%-5rem)] z-10"><PawFinger date={fmtDate(scheduleList[1].date)} title={scheduleList[1].title} rotate="rotate-0" /></div>
                <div className="absolute top-[-130px] right-[-10px]"><PawFinger date={fmtDate(scheduleList[2].date)} title={scheduleList[2].title} rotate="rotate-[20deg]" /></div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute bottom-[5%] left-[15%] w-[70%] max-w-lg aspect-[1/0.8] bg-gradient-to-b from-red-500/10 to-[#544b4d]/90 backdrop-blur-md border border-red-400/30 rounded-[40%_40%_50%_50%] shadow-2xl flex flex-col items-center justify-center p-10 transition-all duration-300 hover:-translate-y-4 z-20 cursor-pointer"
                onHoverStart={() => setIsHoveringLink(true)}
                onHoverEnd={() => setIsHoveringLink(false)}
              >
                <div className="inline-block bg-red-500/20 text-red-300 text-xs font-black tracking-widest px-5 py-2 rounded-full mb-6 animate-pulse">NEXT LIVE</div>
                {isUndecidedLabel(fmtDate(nextLive.date)) ? (
                  <AccentText className="text-4xl md:text-5xl font-black mb-6 tracking-wider">{fmtDate(nextLive.date)}</AccentText>
                ) : (
                  <span className="text-4xl md:text-5xl font-black text-[#f4ebeb] mb-6 tracking-wider drop-shadow-md">{fmtDate(nextLive.date)}</span>
                )}
                <span className="text-lg md:text-xl text-[#d1c5c7] font-bold border-t border-white/10 pt-6 w-3/4 text-center leading-relaxed whitespace-pre-wrap">{nextLive.title}</span>
              </motion.div>
              <div className="absolute bottom-[-2vh] left-[calc(50%-150px)] w-[300px] h-10 bg-black/30 rounded-[50%] blur-xl opacity-80 z-0"></div>
            </div>

            {/* --- モバイル・タブレット版表示 --- */}
            <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto mt-8 md:mt-4 xl:hidden relative px-2 sm:px-4">
              <div className="absolute left-[38px] top-4 bottom-0 w-[2px] bg-red-400/20"></div>
              
              {/* NEXT LIVE */}
              <div className="relative pl-14 py-6 mb-4">
                <div className="absolute left-[26px] top-8 w-6 h-6 bg-[#3a3335] border-2 border-red-400 rounded-full flex items-center justify-center text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)] z-10"><FaPaw className="text-[10px]" /></div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-red-500/10 to-[#544b4d]/80 border border-red-400/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-6xl opacity-5">🐾</div>
                  <span className="inline-block bg-red-500/20 text-red-300 text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 animate-pulse">NEXT LIVE</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-wider mb-2">
                    {isUndecidedLabel(fmtDate(nextLive.date)) ? (
                      <AccentText>{fmtDate(nextLive.date)}</AccentText>
                    ) : (
                      <span className="text-[#f4ebeb]">{fmtDate(nextLive.date)}</span>
                    )}
                  </h3>
                  <p className="text-sm md:text-base text-[#d1c5c7] font-bold whitespace-pre-wrap">{nextLive.title}</p>
                </motion.div>
              </div>
              
              {/* それ以降の予定 */}
              {scheduleList.map((item, i) => (
                <div key={i} className="relative pl-14 py-3">
                  <div className="absolute left-[33px] top-[1.8rem] w-3 h-3 bg-red-400/40 rounded-full border-2 border-[#453e40] z-10"></div>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-[#544b4d]/40 border border-white/5 rounded-xl p-4">
                    <h3 className="text-base md:text-lg font-bold mb-1">
                      {isUndecidedLabel(fmtDate(item.date)) ? (
                        <AccentText>{fmtDate(item.date)}</AccentText>
                      ) : (
                        <span className="text-red-300">{fmtDate(item.date)}</span>
                      )}
                    </h3>
                    <p className="text-xs md:text-sm text-[#d1c5c7] font-medium whitespace-pre-wrap">{item.title}</p>
                  </motion.div>
                </div>
              ))}
            </div>
            </motion.div>
          </section>

          <motion.section 
            id="contact" 
            className="px-6 xl:pl-40 xl:pr-24 2xl:pl-48 2xl:pr-40 py-10 xl:py-12 mb-32 lg:mb-48 max-w-6xl mx-auto scroll-mt-24 relative hidden xl:block overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative w-full min-h-[60vh] cursor-pointer group overflow-visible"
              onClick={handleCutTicket}
              animate={isTicketCut ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ContactTapHint hidden={false} label={t.tap} onTap={handleCutTicket} />

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
                    {t.contactTitle.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-start w-full pt-10">
                  <p className="text-lg lg:text-2xl text-[#c2b6b8] leading-loose mb-10 font-medium tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,220,227,0.4)] transition-all duration-500">
                    {t.contactBodyBefore}<span className="font-bold text-[#ffdce3] drop-shadow-[0_0_10px_rgba(255,220,227,0.6)]">DM</span>{t.contactBodyAfter} <span className="tracking-normal">🐈‍⬛⛓️</span>
                  </p>
                  
                  <motion.a 
                    href={TWITTER_DM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSendMessage}
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
            className="px-4 sm:px-6 pb-10 mb-32 lg:mb-48 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto scroll-mt-24 relative xl:hidden overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative w-full min-h-[50vh] md:min-h-[52vh] lg:min-h-[56vh] cursor-pointer group overflow-visible"
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
                className="absolute inset-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between items-center text-center z-30 pointer-events-auto"
                animate={isTicketCut ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex-1 flex flex-col justify-end items-center w-full pb-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-4">
                    {t.contactTitle.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-[#c2b6b8] font-medium tracking-wide">
                    {t.contactBodyBefore}
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-start items-center w-full pt-4">
                  <p className="text-sm sm:text-base md:text-lg text-[#c2b6b8] font-medium tracking-wide mb-6">
                    <span className="font-bold text-[#ffdce3]">DM</span>{t.contactBodyAfter} <span className="tracking-normal">🐈‍⬛⛓️</span>
                  </p>
                  <motion.a 
                    href={TWITTER_DM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center gap-3 md:gap-4 py-4 sm:py-5 md:py-6 px-8 sm:px-12 md:px-16 bg-red-400 text-white text-sm sm:text-base md:text-lg font-bold tracking-wide rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(248,113,113,0.8)] hover:bg-red-500 transition-all duration-300 transform group/btn relative overflow-hidden active:scale-95 z-40 mx-auto"
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

          <section className="px-4 sm:px-6 md:px-12 lg:px-24 mb-32 lg:mb-48 max-w-5xl mx-auto text-center border-t border-white/10 pt-20 relative z-10 scroll-mt-24">
            <h2 className="text-sm lg:text-base font-bold text-[#E7E4DC] mb-6 tracking-widest">{t.guidelineTitle}</h2>
            <p className="text-xs lg:text-sm text-[#a89c9e] leading-relaxed max-w-3xl mx-auto font-medium">
              {t.guidelineBody}
            </p>
          </section>

          <footer className="py-20 px-6 text-center bg-[#3a3335] border-t border-white/5 relative z-20">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 max-w-[340px] sm:max-w-[380px] md:max-w-none mx-auto mb-16">
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
                  <sns.Icon className="text-lg" />
                  <span className="mt-[2px]">{sns.n}</span>
                </a>
              ))}
            </div>

            <div className="mb-12 flex flex-col items-center gap-6">
              <div className="text-3xl lg:text-4xl italic font-black select-none tracking-widest cursor-default">
                <SiteName />
              </div>
              <div className="w-12 h-[1px] bg-red-400/40"></div>
              <p className="text-xs text-[#a89c9e] tracking-widest font-bold">
                {t.siteCredit}: <span className="text-white/80">"火日"</span>
              </p>
            </div>

            <p className="text-[11px] text-[#E7E4DC] mb-2 tracking-[0.3em] font-medium">© 2026 猫喰ぐるる / Nekohami Gururu</p>
            <div className="w-10 h-[2px] bg-red-400/20 mx-auto mt-4"></div>
          </footer>

        </div>
      </main>
    </>
  );
}