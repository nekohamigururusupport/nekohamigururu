/**
 * 本番公開フラグ。
 * ユーザーがプロンプト「公開」だけ送ったら:
 * 1. Vercel Production の NEXT_PUBLIC_SITE_RELEASED=true を入れて再デプロイ（NEXT_PUBLIC_ はビルド時埋め込み）
 * 2. 待っててねページが消えて本編が出るか確認
 * 3. 不具合チェックして結果報告
 * 今はまだ非公開。言われるまで触らない。
 */
export const PRE_RELEASE_SITE_TITLE = 'とある新人配信者🐾公式サイト';

export function isSiteReleased(): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  return process.env.NEXT_PUBLIC_SITE_RELEASED === 'true';
}
