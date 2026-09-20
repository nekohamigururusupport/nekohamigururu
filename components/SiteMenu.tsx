'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa6';
import { LANG_OPTIONS, type Lang } from '@/lib/i18n';

const HoverPaw = ({ show, snapOut = false }: { show: boolean; snapOut?: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.span
        initial={{ opacity: 0, scale: 0.15, y: 10, rotate: -28 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 16 }}
        exit={snapOut ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.2, y: 8, rotate: 32 }}
        transition={{ type: 'spring', stiffness: 620, damping: 13 }}
        className="relative inline-flex"
        aria-hidden
      >
        <FaPaw className="absolute inset-0 text-red-400/90 blur-[7px] scale-[1.45]" />
        <FaPaw className="relative text-xl sm:text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]" />
      </motion.span>
    )}
  </AnimatePresence>
);

export type SiteMenuItem = {
  key: string;
  href: string;
  mobileHref?: string;
  label: string;
};

export const SiteMenu = ({
  open,
  onOpen,
  onClose,
  items,
  lang,
  onLang,
  luckyLabel,
  onLucky,
  menuLabel,
  closeLabel,
  onHoverLink,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  items: SiteMenuItem[];
  lang: Lang;
  onLang: (next: Lang) => void;
  luckyLabel: string;
  onLucky: () => void;
  menuLabel: string;
  closeLabel: string;
  onHoverLink: (hovering: boolean) => void;
}) => {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setHovered(null);
  }, [open]);

  const hover = (key: string | null) => {
    setHovered(key);
    onHoverLink(key !== null);
  };

  const go = (item: SiteMenuItem) => {
    const wide = window.matchMedia('(min-width: 1280px)').matches;
    const href = wide ? item.href : (item.mobileHref ?? item.href);
    onClose();
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <>
      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => (open ? onClose() : onOpen())}
        onMouseEnter={() => hover('menu')}
        onMouseLeave={() => hover(null)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.86, y: 3 }}
        transition={{ type: 'spring', stiffness: 540, damping: 16 }}
        className="fixed top-2 right-2 sm:right-4 z-[70] w-[3.6rem] sm:w-[4.1rem] bg-transparent p-0 origin-center"
      >
        <span className="relative block aspect-[775/805]">
          <AnimatePresence initial={false}>
            <motion.img
              key={open ? 'close' : 'menu'}
              src={open ? '/img/menu-close.png' : '/img/menu-button.png'}
              alt=""
              initial={{ opacity: 0, scale: 0.55, rotate: open ? -16 : 16 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.55, rotate: open ? 16 : -16 }}
              transition={{ type: 'spring', stiffness: 480, damping: 18 }}
              className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(180,28,28,0.4)] pointer-events-none"
            />
          </AnimatePresence>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              aria-label={closeLabel}
              className="absolute inset-0 bg-black/62 backdrop-blur-[2px]"
              onClick={onClose}
            />

            <motion.aside
              initial={{ x: '42%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '28%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="relative h-full w-[min(100%,34rem)] border-l border-red-300/20 shadow-[-24px_0_60px_rgba(0,0,0,0.45)] overflow-hidden"
            >
              <img
                src="/img/menu-bg.jpg"
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.78] scale-x-[-1]"
              />

              <div className="relative h-full overflow-y-auto pt-24 pb-10 px-8 sm:px-12">
              <nav className="relative grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-7 sm:gap-y-9">
                {items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => go(item)}
                    onMouseEnter={() => hover(item.key)}
                    onMouseLeave={() => hover(null)}
                    className={`text-left text-white text-lg sm:text-xl font-black tracking-[0.14em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)] inline-flex items-center gap-2.5 transition-[filter,transform] ${
                      hovered === item.key ? 'scale-[1.05] drop-shadow-[0_0_14px_rgba(255,255,255,0.55)]' : ''
                    }`}
                  >
                    <span className="w-7 sm:w-8 inline-flex justify-center shrink-0">
                      <HoverPaw show={hovered === item.key} />
                    </span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                type="button"
                onClick={onLucky}
                onMouseEnter={() => hover(null)}
                className="group relative mt-10 w-full flex items-center gap-3 rounded-2xl border border-red-300/35 bg-red-400/12 px-4 py-3.5 hover:bg-red-400/20 hover:border-red-300/60 transition-colors"
              >
                <img
                  src="/lucky/tube.png"
                  alt=""
                  className="h-14 w-14 object-contain shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:-rotate-6"
                />
                <span className="text-left text-white text-lg sm:text-xl font-black tracking-wider drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                  {luckyLabel}
                </span>
              </button>

              <div className="relative mt-10 grid grid-cols-3 gap-2">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onLang(opt.id)}
                    onMouseEnter={() => hover(`lang-${opt.id}`)}
                    onMouseLeave={() => hover(null)}
                    className={`px-2 py-3 rounded-2xl text-sm sm:text-base font-black tracking-wide border-2 transition-colors inline-flex items-center justify-center gap-1.5 ${
                      opt.id === lang
                        ? 'border-red-300 bg-red-400/35 text-white'
                        : 'border-white/25 bg-white/5 text-white hover:border-white/70'
                    }`}
                  >
                    {opt.label}
                    {opt.id === lang ? (
                      <FaPaw className="text-sm text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    ) : (
                      <HoverPaw show={hovered === `lang-${opt.id}`} snapOut />
                    )}
                  </button>
                ))}
              </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
