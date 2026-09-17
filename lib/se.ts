const TAG_SE = ['/se/tag-1.mp3', '/se/tag-2.mp3', '/se/tag-3.mp3', '/se/tag-4.mp3'] as const;
const TICKET_SE = [
  '/se/ticket-1.mp3',
  '/se/ticket-2.mp3',
  '/se/ticket-3.mp3',
  '/se/ticket-4.mp3',
  '/se/ticket-5.mp3',
  '/se/ticket-6.mp3',
  '/se/ticket-7.mp3',
] as const;

const lastTag = { i: -1 };
const lastTicket = { i: -1 };

export const TAG_SE_LOCK_MS = 620;
export const TICKET_NAV_MS = 750;
export const TICKET_RESET_MS = 1500;

function playRandom(urls: readonly string[], last: { i: number }, volume: number) {
  if (typeof window === 'undefined') return;
  const n = urls.length;
  let i = Math.floor(Math.random() * n);
  if (n > 1 && i === last.i) {
    i = (i + 1 + Math.floor(Math.random() * (n - 1))) % n;
  }
  last.i = i;
  const audio = new Audio(urls[i]);
  audio.volume = volume;
  void audio.play().catch(() => {});
}

export function playTagSe(volume = 0.5) {
  playRandom(TAG_SE, lastTag, volume);
}

export function playTicketSe(volume = 0.9) {
  playRandom(TICKET_SE, lastTicket, volume);
}
