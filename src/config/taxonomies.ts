import type { Locale } from '../config';

/** 单个标签/分类在各语言下的显示名。 */
type LocaleLabels = Record<Locale, string>;

/**
 * 标签字典：key 为 URL slug（文章 frontmatter 引用），value 为各语言显示名。
 * 新增标签只需在此添加一项。
 */
export const TAGS = {
  food: { 'zh-cn': '美食', en: 'Food' },
  unity: { 'zh-cn': 'Unity', en: 'Unity' },
  'game-dev': { 'zh-cn': '游戏开发', en: 'Game Dev' },
  cycling: { 'zh-cn': '骑行', en: 'Cycling' },
} as const satisfies Record<string, LocaleLabels>;

/**
 * 分类字典：结构同 TAGS。
 */
export const CATEGORIES = {
  life: { 'zh-cn': '生活', en: 'Life' },
  technology: { 'zh-cn': '技术', en: 'Technology' },
  announcements: { 'zh-cn': '公告', en: 'Announcements' },
} as const satisfies Record<string, LocaleLabels>;

export type TagId = keyof typeof TAGS;
export type CategoryId = keyof typeof CATEGORIES;

/** 从字典 key 推导，供 Zod `z.enum` 与 frontmatter 校验使用。 */
function keysOf<T extends Record<string, unknown>>(
  dict: T,
): [keyof T & string, ...(keyof T & string)[]] {
  const keys = Object.keys(dict);
  if (keys.length === 0) {
    throw new Error('Taxonomy dictionary must have at least one entry.');
  }
  return keys as [keyof T & string, ...(keyof T & string)[]];
}

export const TAG_IDS = keysOf(TAGS);
export const CATEGORY_IDS = keysOf(CATEGORIES);
