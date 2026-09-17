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

export const OMIKUJI_SHAKE_MS = 1650;

let shakeAudio: HTMLAudioElement | null = null;
let shakeCtx: AudioContext | null = null;
let shakeGain: GainNode | null = null;
let shakeSource: MediaElementAudioSourceNode | null = null;

export function playOmikujiShake(gain = 1.2) {
  stopOmikujiShake();
  if (typeof window === 'undefined') return;
  const audio = new Audio('/se/omikuji-shake.mp3');
  shakeAudio = audio;
  audio.volume = 1;
  if (!shakeCtx || !shakeGain) {
    shakeCtx = new AudioContext();
    shakeGain = shakeCtx.createGain();
    shakeGain.connect(shakeCtx.destination);
  }
  shakeGain.gain.value = gain;
  shakeSource = shakeCtx.createMediaElementSource(audio);
  shakeSource.connect(shakeGain);
  const fit = () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    audio.playbackRate = Math.min(4, Math.max(1, audio.duration / (OMIKUJI_SHAKE_MS / 1000)));
  };
  audio.addEventListener('loadedmetadata', fit);
  void shakeCtx.resume();
  void audio.play().then(fit).catch(() => {});
}

export function stopOmikujiShake() {
  shakeSource?.disconnect();
  shakeSource = null;
  if (!shakeAudio) return;
  shakeAudio.pause();
  shakeAudio.currentTime = 0;
  shakeAudio = null;
}

export function playOmikujiPop(volume = 0.8) {
  if (typeof window === 'undefined') return;
  const audio = new Audio('/se/omikuji-pop.mp3');
  audio.volume = volume;
  void audio.play().catch(() => {});
}

export function playOmikujiLine(volume = 0.75) {
  if (typeof window === 'undefined') return;
  const audio = new Audio('/se/omikuji-line.mp3');
  audio.volume = volume;
  void audio.play().catch(() => {});
}
