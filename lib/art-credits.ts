export const ART_CREDITS = [
  {
    id: 'illust',
    labelKey: 'artCredit',
    name: '月　島　様',
    /** SNS。空ならテキストのみ。あとでURLを入れる。 */
    url: '',
  },
  {
    id: 'sd',
    labelKey: 'sdArtCredit',
    name: 'aqubi!　様',
    url: '',
  },
] as const;

export type ArtCreditId = (typeof ART_CREDITS)[number]['id'];
