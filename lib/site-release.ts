/** 本番公開フラグ。デビュー時に Vercel 等で NEXT_PUBLIC_SITE_RELEASED=true を設定して再デプロイ */
export const PRE_RELEASE_SITE_TITLE = 'とある新人配信者🐾公式サイト';

export function isSiteReleased(): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  return process.env.NEXT_PUBLIC_SITE_RELEASED === 'true';
}
