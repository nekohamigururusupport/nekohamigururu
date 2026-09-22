'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ART_CREDITS } from '@/lib/art-credits';

const SLIDES = [
  { src: '/img/hero-stand.png', alt: '猫喰ぐるる', credit: `作：${ART_CREDITS[0].name}` },
  { src: '/img/hero-sd.png', alt: '猫喰ぐるる', credit: `作：${ART_CREDITS[1].name}` },
] as const;

const HOLD_MS = 3000;
const FADE_S = 0.2;
const GLITCH_MS = 1000;

export const HeroVisual = () => {
  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    let hide = 0;
    const tick = window.setInterval(() => {
      if (!reduced) {
        setGlitch(true);
        hide = window.setTimeout(() => setGlitch(false), GLITCH_MS);
      }
      setIndex((i) => (i + 1) % SLIDES.length);
    }, HOLD_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(hide);
    };
  }, [reduced]);

  const slide = SLIDES[index];

  return (
    <div className="relative w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[30rem] lg:max-w-[36rem] xl:max-w-[40rem] flex flex-col items-center">
      <div className="relative w-full h-[20rem] sm:h-[24rem] md:h-[400px] lg:h-[500px] xl:h-[580px]">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: FADE_S, ease: 'linear' }}
            className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)]"
          />
        </AnimatePresence>
        {glitch && (
          <div className="hero-glitch absolute inset-0" aria-hidden>
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={`hero-glitch-item hero-glitch-item--${n}`}
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            ))}
          </div>
        )}
      </div>
      <p className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg font-black tracking-[0.22em] text-white">
        {slide.credit}
      </p>
    </div>
  );
};
