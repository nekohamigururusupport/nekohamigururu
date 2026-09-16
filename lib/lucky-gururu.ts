import type { Lang } from '@/lib/i18n';

export const LUCKY_MASH_URL =
  'https://marshmallow-qa.com/mc6zg5s50zm51dq?t=qzPt3N&utm_medium=url_text&utm_source=promotion';

export const LUCKY_DM_URL = 'https://twitter.com/messages/compose?recipient_id=2005495955274219520';

export const LUCKY_TAGS = [
  { labelKey: 'tagGeneral' as const, tag: '#ぐるるのおもちゃ' },
  { labelKey: 'tagFanart' as const, tag: '#ぐるるの噛み跡' },
];

export type LuckyRankId = 'daikichi' | 'chukichi' | 'kichi' | 'shokichi' | 'suekichi' | 'kyo';

export const LUCKY_RANKS: { id: LuckyRankId; weight: number }[] = [
  { id: 'daikichi', weight: 12 },
  { id: 'chukichi', weight: 22 },
  { id: 'kichi', weight: 22 },
  { id: 'shokichi', weight: 20 },
  { id: 'suekichi', weight: 14 },
  { id: 'kyo', weight: 10 },
];

export const LUCKY_RANK_COPY: Record<Lang, Record<LuckyRankId, { rank: string; mood: string }>> = {
  ja: {
    daikichi: { rank: '大吉', mood: 'ご機嫌' },
    chukichi: { rank: '中吉', mood: 'わりといい' },
    kichi: { rank: '吉', mood: 'まあまあ' },
    shokichi: { rank: '小吉', mood: 'ふつう' },
    suekichi: { rank: '末吉', mood: 'だるい' },
    kyo: { rank: '凶', mood: '機嫌がわるい' },
  },
  en: {
    daikichi: { rank: 'Great luck', mood: 'In a great mood' },
    chukichi: { rank: 'Good luck', mood: 'Pretty good' },
    kichi: { rank: 'Luck', mood: 'So-so' },
    shokichi: { rank: 'Small luck', mood: 'Normal' },
    suekichi: { rank: 'Slight luck', mood: 'Listless' },
    kyo: { rank: 'Bad luck', mood: 'In a bad mood' },
  },
  ko: {
    daikichi: { rank: '대길', mood: '기분 좋음' },
    chukichi: { rank: '중길', mood: '꽤 좋음' },
    kichi: { rank: '길', mood: '그럭저럭' },
    shokichi: { rank: '소길', mood: '보통' },
    suekichi: { rank: '말길', mood: '귀찮음' },
    kyo: { rank: '흉', mood: '기분 나쁨' },
  },
};

export const LUCKY_COMPAT: Record<Lang, string[]> = {
  ja: ['最悪', 'いまいち', 'ふつう', 'まあまあ', 'ちょっと良いかも？'],
  en: ['Awful', 'Not great', 'Average', 'Pretty okay', 'Maybe a little good?'],
  ko: ['최악', '별로', '보통', '그럭저럭', '조금 좋을지도?'],
};

/** あげたら喜ぶかも？ のプール。後から追加する。 */
export const LUCKY_GIFTS: Record<Lang, string[]> = {
  ja: [
    'イチゴチョコレートパフェ',
    'イチゴオレ',
    'ガトーショコラ',
    'ぬいぐるみ',
    '新しいゲーム機',
    '塩キャラメル',
    'チョコチップあいす',
  ],
  en: [
    'Strawberry chocolate parfait',
    'Strawberry au lait',
    'Gâteau au chocolat',
    'A plushie',
    'A new game console',
    'Salted caramel',
    'Chocolate chip ice cream',
  ],
  ko: [
    '딸기 초콜릿 파르페',
    '딸기 오레',
    '가토 쇼콜라',
    '인형',
    '새 게임기',
    '솔티드 캐러멜',
    '초코칩 아이스크림',
  ],
};

/** ぐるるプチ情報のプール。後から追加する。 */
export const LUCKY_FACTS: Record<Lang, string[]> = {
  ja: [
    '魚の骨、こっそり集めてるらしい。',
    '最近あのドラマを一気見したらしい。',
    '最近あのゲームにはまってるとかなんとか。',
    '雨の日はテンション下がるー。',
    'お風呂はきらい、水浴びる意味わかんない。',
    'マシュマロは食べるほうも、読むほうも好き。',
    'おっとっと食べたい。ガトーショコラ食べたい。',
  ],
  en: [
    'Apparently collects fish bones in secret.',
    'Binged that drama recently, apparently.',
    'Hooked on that game lately, or something.',
    'Rainy days kill the mood—',
    'Hates baths. Doesn’t get why you’d soak in water.',
    'Likes marshmallows — eating them and reading them.',
    'Wants Ottotto. Wants gâteau au chocolat.',
  ],
  ko: [
    '생선 가시를 몰래 모은다는 소문.',
    '요즘 그 드라마를 정주행했대.',
    '요즘 그 게임에 빠졌다는 것 같기도 하고.',
    '비 오는 날은 텐션 떨어져—',
    '목욕은 싫어. 물에 담그는 의미를 모르겠음.',
    '마시멜로는 먹는 쪽도, 읽는 쪽도 좋아한다.',
    '오또또 먹고 싶어. 가토 쇼콜라 먹고 싶어.',
  ],
};

export const LUCKY_SITE_URL = 'https://nekohami-gururu.com';

const STORAGE_KEY = 'gururu-lucky-v1';

export type LuckyDraw = {
  dateKey: string;
  rankId: LuckyRankId;
  compatIndex: number;
  giftIndex: number;
  factIndex: number;
  played: boolean;
};

export const todayKey = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const hashString = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const pickWeightedRank = (seed: number): LuckyRankId => {
  const total = LUCKY_RANKS.reduce((sum, rank) => sum + rank.weight, 0);
  let cursor = seed % total;
  for (const rank of LUCKY_RANKS) {
    if (cursor < rank.weight) return rank.id;
    cursor -= rank.weight;
  }
  return 'kichi';
};

export const drawLuckyGururu = (dateKey = todayKey()): LuckyDraw => {
  const seed = hashString(`gururu-lucky-${dateKey}`);
  const rankId = pickWeightedRank(seed);
  const rankIndex = LUCKY_RANKS.findIndex((rank) => rank.id === rankId);
  const compatMax = LUCKY_COMPAT.ja.length - 1;
  const jitter = (seed % 3) - 1;
  const compatIndex = Math.min(compatMax, Math.max(0, compatMax - rankIndex + jitter));

  return {
    dateKey,
    rankId,
    compatIndex,
    giftIndex: seed % LUCKY_GIFTS.ja.length,
    factIndex: (seed >>> 8) % LUCKY_FACTS.ja.length,
    played: false,
  };
};

const readStored = (): LuckyDraw | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LuckyDraw;
    if (!parsed?.dateKey || !parsed.rankId) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const loadTodayDraw = (): LuckyDraw => {
  const key = todayKey();
  const stored = readStored();
  if (stored?.dateKey === key) return stored;
  const next = drawLuckyGururu(key);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const markDrawPlayed = (draw: LuckyDraw) => {
  const next = { ...draw, played: true };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const luckyShareUrl = (lang: Lang, draw: LuckyDraw) => {
  const rank = LUCKY_RANK_COPY[lang][draw.rankId];
  const gift = LUCKY_GIFTS[lang][draw.giftIndex];
  const compat = LUCKY_COMPAT[lang][draw.compatIndex];
  const text =
    lang === 'en'
      ? `Today's lucky Gururu is [${rank.rank}]!\nMood: ${rank.mood}.\nCompatibility: ${compat}.\nShe'd be happy with ${gift}.`
      : lang === 'ko'
        ? `오늘의 럭키 ぐるる는 【${rank.rank}】!\n기분은 ${rank.mood}.\n궁합은 ${compat}.\n주면 좋아할 것은 ${gift}.`
        : `今日のラッキーぐるるは【${rank.rank}】！\n機嫌は${rank.mood}。\n相性は${compat}。\nあげたら喜ぶものは${gift}。`;
  const params = new URLSearchParams({
    text: `${text}\n#ぐるるのおもちゃ #ぐるるの噛み跡\n${LUCKY_SITE_URL}`,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
};

