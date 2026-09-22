/**
 * 本番公開フラグ。
 * 「公開」済み。本編を出す。
 * 戻すなら Vercel Production の NEXT_PUBLIC_SITE_RELEASED=false で再デプロイ。
 */
export const PRE_RELEASE_SITE_TITLE = 'とある新人配信者🐾公式サイト';

export function isSiteReleased(): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  return process.env.NEXT_PUBLIC_SITE_RELEASED !== 'false';
}
