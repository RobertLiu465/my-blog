/**
 * 站点根 URL 解析。
 *
 * astro.config 在加载 .env 之前就会执行，需用 Vite loadEnv + process.env；
 * 应用代码在构建时通过 vite.define 注入 import.meta.env.SITE_URL。
 */

export const DEFAULT_SITE_URL = 'https://chirping-astro.example.com';

/** 规范化 SITE_URL，去掉尾部斜杠 */
export function normalizeSiteUrl(raw?: string): string {
  const value = (raw ?? '').trim();
  return (value || DEFAULT_SITE_URL).replace(/\/+$/, '');
}

/** 从 Node 构建环境 / import.meta.env 解析站点 URL */
export function resolveSiteUrl(): string {
  const fromNode =
    typeof globalThis !== 'undefined'
      ? (globalThis as { process?: { env?: { SITE_URL?: string } } }).process?.env?.SITE_URL
      : undefined;
  return normalizeSiteUrl(fromNode || import.meta.env.SITE_URL);
}
