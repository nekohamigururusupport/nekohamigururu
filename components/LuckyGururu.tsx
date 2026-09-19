'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaw, FaXTwitter } from 'react-icons/fa6';
import type { Copy, Lang } from '@/lib/i18n';
import { playOmikujiShake, playOmikujiPop, playOmikujiLine, stopOmikujiShake, OMIKUJI_SHAKE_MS } from '@/lib/se';
import {
  LUCKY_COMPAT,
  LUCKY_DM_URL,
  LUCKY_FACTS,
  LUCKY_GIFTS,
  LUCKY_MASH_URL,
  LUCKY_RANK_COPY,
  LUCKY_TAGS,
  loadTodayDraw,
  luckyShareUrl,
  markDrawPlayed,
  type LuckyDraw,
} from '@/lib/lucky-gururu';

type Phase = 'closed' | 'shake' | 'draw' | 'reveal';

const RANK_INK: Record<LuckyDraw['rankId'], string> = {
  daikichi: 'text-[#9b182c]',
  chukichi: 'text-[#b43348]',
  kichi: 'text-[#a8454e]',
  shokichi: 'text-[#8a4a52]',
  suekichi: 'text-[#6e4a50]',
  kyo: 'text-[#4a3538]',
};

const sparks = [
  { x: -70, y: -36, r: -24, d: 0 },
  { x: 62, y: -44, r: 18, d: 0.05 },
  { x: -40, y: 28, r: 12, d: 0.08 },
  { x: 48, y: 22, r: -16, d: 0.12 },
  { x: 8, y: -58, r: 6, d: 0.04 },
  { x: -12, y: 46, r: 22, d: 0.1 },
];

export type LuckyGururuHandle = { start: () => void };

export const LuckyGururu = forwardRef<LuckyGururuHandle, {
  lang: Lang;
  t: Copy;
  onTagNavigate: (e: MouseEvent<HTMLAnchorElement>, tag: string) => void;
  onHoverLink: (hovering: boolean) => void;
  hideFab?: boolean;
}>(({
  lang,
  t,
  onTagNavigate,
  onHoverLink,
  hideFab = false,
}, ref) => {
  const [phase, setPhase] = useState<Phase>('closed');
  const [draw, setDraw] = useState<LuckyDraw | null>(null);
  const [showRank, setShowRank] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [fabHover, setFabHover] = useState(false);
  const lineSeRef = useRef(new Set<string>());

  const open = phase !== 'closed';
  const copy = draw ? LUCKY_RANK_COPY[lang][draw.rankId] : null;

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (phase === 'closed') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'closed') return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (phase === 'reveal' || reduced)) {
        setPhase('closed');
        setShowRank(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== 'shake') {
      stopOmikujiShake();
      return undefined;
    }
    if (!reduced) playOmikujiShake();
    const next = window.setTimeout(() => setPhase('draw'), reduced ? 80 : OMIKUJI_SHAKE_MS);
    return () => {
      window.clearTimeout(next);
      stopOmikujiShake();
    };
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== 'draw') return undefined;
    if (!reduced) playOmikujiPop();
    const next = window.setTimeout(() => setPhase('reveal'), reduced ? 80 : 820);
    return () => window.clearTimeout(next);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== 'reveal') {
      setShowRank(false);
      lineSeRef.current.clear();
      return undefined;
    }
    const next = window.setTimeout(() => setShowRank(true), reduced ? 200 : 2100);
    return () => window.clearTimeout(next);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== 'reveal' || !draw) return;
    if (draw.played) return;
    const next = markDrawPlayed(draw);
    setDraw(next);
  }, [phase]);

  const pingLine = (key: string) => {
    if (lineSeRef.current.has(key)) return;
    lineSeRef.current.add(key);
    playOmikujiLine();
  };

  useEffect(() => {
    if (phase !== 'reveal') return undefined;
    const rows: [number, string][] = reduced
      ? [
          [200, 'mood'],
          [250, 'compat'],
          [300, 'gift'],
          [350, 'fact'],
          [400, 'share'],
          [450, 'tags'],
        ]
      : [
          [2100, 'mood'],
          [2550, 'compat'],
          [2850, 'gift'],
          [3150, 'fact'],
          [3500, 'share'],
          [3800, 'tags'],
        ];
    const ids = rows.map(([ms, key]) => window.setTimeout(() => pingLine(key), ms));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [phase, reduced]);

  const start = () => {
    const today = loadTodayDraw();
    setDraw(today);
    setShowRank(false);
    setFabHover(false);
    setPhase(reduced ? 'reveal' : 'shake');
  };

  useImperativeHandle(ref, () => ({ start }), [reduced]);

  const close = () => {
    setPhase('closed');
    setShowRank(false);
  };

  return (
    <>
      {!hideFab && (
      <div
        className={`fixed top-[4.6rem] right-3 sm:right-4 md:right-6 z-[58] ${open ? 'opacity-0 pointer-events-none' : ''}`}
        onMouseEnter={() => {
          setFabHover(true);
          onHoverLink(true);
        }}
        onMouseLeave={() => {
          setFabHover(false);
          onHoverLink(false);
        }}
      >
        <div className="relative h-14 w-14 sm:h-16 sm:w-16">
          <AnimatePresence>
            {fabHover && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.86 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 520, damping: 16 }}
                className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <span className="relative inline-flex items-center gap-1 whitespace-nowrap rounded-2xl bg-[#fff3ee] px-3 py-1.5 text-sm sm:text-base font-[family-name:var(--font-yomogi),cursive] text-[#d45a6a] shadow-[3px_5px_0_rgba(212,90,106,0.28)]">
                  {t.luckyFabHint}
                  <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-0 w-0 border-y-[7px] border-y-transparent border-l-[9px] border-l-[#fff3ee]" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            type="button"
            onClick={start}
            aria-label={t.luckyFab}
            className="h-full w-full rounded-full border-2 border-[#ffd7a8]/80 bg-[#fff3ee] shadow-[0_0_22px_rgba(248,113,113,0.55)] overflow-hidden group"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0, y: [0, -4, 0] }}
            transition={{
              scale: { type: 'spring', stiffness: 380, damping: 16, delay: 0.15 },
              rotate: { type: 'spring', stiffness: 280, damping: 14, delay: 0.15 },
              y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <img src="/lucky/tube.png" alt="" className="relative h-full w-full object-contain p-1 scale-110" />
            <span className="absolute inset-0 rounded-full ring-2 ring-red-300/30 group-hover:ring-red-200/70 transition" />
          </motion.button>
        </div>
      </div>
      )}

      <AnimatePresence>
        {open && draw && copy && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center px-3 sm:px-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label={t.luckyClose}
              className="absolute inset-0 bg-black/72 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => phase === 'reveal' && close()}
            />

            {(phase === 'shake' || phase === 'draw') && (
              <motion.div
                className="relative z-10 pointer-events-none"
                initial={{ y: 90, opacity: 0, scale: 0.82 }}
                animate={
                  phase === 'shake'
                    ? { y: 0, opacity: 1, scale: 1 }
                    : { y: 36, opacity: 0, scale: 0.9 }
                }
                transition={{ duration: phase === 'shake' ? 0.28 : 0.45, ease: 'easeOut' }}
              >
                <motion.div
                  className="relative"
                  style={{ transformOrigin: '50% 82%' }}
                  animate={
                    phase === 'shake'
                      ? {
                          x: [0, -10, 11, -9, 8, -7, 6, -4, 2, 0],
                          y: [0, -7, 5, -10, 4, -6, 3, -2, 0],
                          rotate: [0, -9, 10, -8, 7, -6, 4, -3, 1, 0],
                        }
                      : { x: 0, y: 0, rotate: 0 }
                  }
                  transition={
                    phase === 'shake'
                      ? { duration: 1.45, ease: 'linear', times: [0, 0.1, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.9, 1] }
                      : { duration: 0.3 }
                  }
                >
                  <img
                    src="/lucky/tube.png"
                    alt=""
                    className="w-52 sm:w-64 md:w-72 drop-shadow-[0_14px_22px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>
              </motion.div>
            )}

            {phase === 'draw' && (
              <motion.div
                className="absolute z-20 w-10 sm:w-12 rounded-[2px] overflow-hidden shadow-xl origin-bottom"
                initial={{ y: 70, opacity: 0, scaleY: 0.3 }}
                animate={{ y: -120, opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src="/lucky/paper.png" alt="" className="w-full h-28 object-cover" />
              </motion.div>
            )}

            {phase === 'reveal' && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="lucky-gururu-title"
                className="relative z-10 w-full max-w-lg max-h-[86vh] overflow-x-hidden overflow-y-auto rounded-[1.4rem] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
                initial={{ y: 48, scale: 0.72, opacity: 0, rotate: -4 }}
                animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
                exit={{ y: 24, opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              >
                <div
                  className="relative overflow-x-hidden px-5 sm:px-8 pt-7 pb-6 text-[#3f2d31]"
                  style={{
                    backgroundImage: "url('/lucky/paper.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[#fff7ef]/35 mix-blend-soft-light" />

                  <motion.img
                    src="/lucky/seal.png"
                    alt=""
                    className="pointer-events-none absolute top-2 right-3 w-16 sm:w-20 drop-shadow-md"
                    style={{
                      WebkitMaskImage: 'radial-gradient(circle, #000 64%, transparent 70%)',
                      maskImage: 'radial-gradient(circle, #000 64%, transparent 70%)',
                    }}
                    initial={{ scale: 1.8, rotate: -25, opacity: 0 }}
                    animate={{ scale: 1, rotate: 12, opacity: 1 }}
                    transition={{ delay: 0.18, type: 'spring', stiffness: 380, damping: 12 }}
                  />

                  <button
                    type="button"
                    onClick={close}
                    className="absolute top-3 left-3 z-10 text-[11px] font-black tracking-widest text-[#7a3038]/80 hover:text-[#7a3038]"
                  >
                    ✕ {t.luckyClose}
                  </button>

                  <div className="relative">
                    <motion.h2
                      id="lucky-gururu-title"
                      className="font-[family-name:var(--font-yomogi),cursive] text-center text-2xl sm:text-3xl text-[#7a3038] leading-tight pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                    >
                      {t.luckyTitle}
                    </motion.h2>
                    <div className="mx-auto mt-3 mb-6 h-[2px] w-16 bg-[#c45c6a]/50" />

                    <motion.div
                      className="flex items-end justify-between gap-3 border-b border-[#7a3038]/15 pb-4"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <p className="text-sm sm:text-base font-bold leading-relaxed">{t.luckyMoodLead}</p>
                      <div className="min-w-[5.5rem] text-right">
                        <AnimatePresence>
                          {showRank ? (
                            <motion.div
                              key={copy.rank}
                              className="relative inline-block overflow-visible"
                              initial={{ scale: 2.2, rotate: -18, opacity: 0 }}
                              animate={{ scale: 1, rotate: -6, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 520, damping: 14 }}
                            >
                              {sparks.map((spark) => (
                                <motion.span
                                  key={`${spark.x}-${spark.y}`}
                                  className="absolute left-1/2 top-1/2 text-red-400 pointer-events-none"
                                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                                  animate={{ opacity: [0, 1, 0], x: spark.x * 0.45, y: spark.y * 0.45, scale: 1, rotate: spark.r }}
                                  transition={{ duration: 0.7, delay: spark.d }}
                                >
                                  <FaPaw className="text-sm" />
                                </motion.span>
                              ))}
                              <span
                                className={`block font-black text-4xl sm:text-5xl tracking-widest ${RANK_INK[draw.rankId]}`}
                                style={{ textShadow: '1px 2px 0 rgba(255,244,246,0.7)' }}
                              >
                                {copy.rank}
                              </span>
                              <span className="block text-[11px] font-bold tracking-widest text-[#7a3038]/70 mt-1">
                                {copy.mood}
                              </span>
                            </motion.div>
                          ) : (
                            <motion.span
                              className="inline-block text-2xl font-black text-[#c45c6a]/40 tracking-[0.4em]"
                              animate={{ opacity: [0.25, 0.8, 0.25] }}
                              transition={{ duration: 1.1, repeat: Infinity }}
                            >
                              …
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <div className="mt-5 space-y-4 text-left">
                      {[
                        { delay: 2.55, label: t.luckyCompat, value: LUCKY_COMPAT[lang][draw.compatIndex] },
                        { delay: 2.85, label: t.luckyGift, value: LUCKY_GIFTS[lang][draw.giftIndex] },
                        { delay: 3.15, label: t.luckyFact, value: LUCKY_FACTS[lang][draw.factIndex] },
                      ].map((row) => (
                        <motion.div
                          key={row.label}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduced ? 0.15 : row.delay }}
                          className="rounded-xl bg-[#fffaf4]/55 border border-[#7a3038]/10 px-3.5 py-3"
                        >
                          <p className="text-[10px] sm:text-[11px] font-black tracking-[0.22em] text-[#a33c4a] mb-1">
                            {row.label}
                          </p>
                          <p className="text-sm sm:text-base font-bold leading-relaxed">{row.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-6 space-y-3"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduced ? 0.2 : 3.5 }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={LUCKY_MASH_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 min-w-0 rounded-full bg-[#c45c6a] text-white text-[10px] sm:text-xs font-black tracking-wider py-3 px-2 shadow-[0_8px_20px_rgba(196,92,106,0.35)] hover:bg-[#b44e5c]"
                          onMouseEnter={() => onHoverLink(true)}
                          onMouseLeave={() => onHoverLink(false)}
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {t.luckyMash}
                        </a>
                        <a
                          href={LUCKY_DM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 min-w-0 rounded-full border-2 border-[#7a3038]/25 bg-white/55 text-[#7a3038] text-[10px] sm:text-xs font-black tracking-wider py-3 px-2 hover:border-[#c45c6a]"
                          onMouseEnter={() => onHoverLink(true)}
                          onMouseLeave={() => onHoverLink(false)}
                        >
                          <FaXTwitter /> {t.luckyDm}
                        </a>
                      </div>
                      <a
                        href={luckyShareUrl(lang, draw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-full border-2 border-[#c45c6a]/50 bg-[#fff6f4] text-[#7a3038] text-xs sm:text-sm font-black tracking-widest py-3 hover:bg-[#ffe8ec]"
                        onMouseEnter={() => onHoverLink(true)}
                        onMouseLeave={() => onHoverLink(false)}
                      >
                        <FaXTwitter /> {t.luckyShare}
                      </a>
                    </motion.div>

                    <motion.div
                      className="pt-5"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduced ? 0.25 : 3.8 }}
                    >
                        <p className="text-center text-sm font-black text-[#7a3038]">{t.luckyTagLead}</p>
                        <p className="text-center text-[11px] text-[#7a3038]/70 mt-1 mb-3">{t.luckyTagBody}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {LUCKY_TAGS.map((item) => (
                            <a
                              key={item.tag}
                              href={`https://x.com/search?q=${encodeURIComponent(item.tag)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => onTagNavigate(e, item.tag)}
                              className="rounded-2xl border border-[#c45c6a]/35 bg-white/60 px-3 py-2.5 text-center hover:border-[#c45c6a] hover:bg-white/90 transition"
                              onMouseEnter={() => onHoverLink(true)}
                              onMouseLeave={() => onHoverLink(false)}
                            >
                              <span className="block text-[10px] font-black tracking-widest text-[#a33c4a]">
                                {t[item.labelKey]}
                              </span>
                              <span className="block text-sm font-black text-[#3f2d31] mt-0.5">{item.tag}</span>
                            </a>
                          ))}
                        </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

LuckyGururu.displayName = 'LuckyGururu';
