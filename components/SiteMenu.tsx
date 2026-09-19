'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa6';
import { LANG_OPTIONS, type Lang } from '@/lib/i18n';

const HoverPaw = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.span
        initial={{ opacity: 0, scale: 0.35 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.35 }}
        transition={{ type: 'spring', stiffness: 520, damping: 18 }}
        className="inline-flex text-red-300 drop-shadow-[0_0_10px_rgba(248,113,113,0.85)]"
        aria-hidden
      >
        <FaPaw className="text-base sm:text-lg rotate-12" />
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
              className="relative h-full w-[min(100%,34rem)] bg-[#2f292a]/96 border-l border-red-300/25 shadow-[-24px_0_60px_rgba(0,0,0,0.45)] overflow-y-auto pt-24 pb-10 px-8 sm:px-12"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
                <FaPaw className="absolute top-24 left-6 text-7xl rotate-[-18deg]" />
                <FaPaw className="absolute bottom-16 right-8 text-8xl rotate-12" />
              </div>

              <nav className="relative grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-7 sm:gap-y-9">
                {items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => go(item)}
                    onMouseEnter={() => hover(item.key)}
                    onMouseLeave={() => hover(null)}
                    className="text-left text-[#E7E4DC] text-lg sm:text-xl font-black tracking-[0.14em] hover:text-red-300 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-5 sm:w-6 inline-flex justify-center shrink-0">
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
                <span className="text-left text-[#ffdce3] text-lg sm:text-xl font-black tracking-wider">
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
                        : 'border-white/25 bg-white/5 text-[#E7E4DC] hover:border-red-300/60 hover:text-white'
                    }`}
                  >
                    {opt.label}
                    {opt.id === lang ? (
                      <FaPaw className="text-xs sm:text-sm" />
                    ) : (
                      <HoverPaw show={hovered === `lang-${opt.id}`} />
                    )}
                  </button>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
