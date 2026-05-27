import { SITE, type Locale } from '../config';
import { TAGS, CATEGORIES, type TagId, type CategoryId } from '../config/taxonomies';
import { withBase } from '../i18n/utils';

/** 标签在指定语言下的显示名；未知 id 时回退为 slug。 */
export function getTagLabel(locale: Locale, id: TagId): string {
  return TAGS[id][locale] ?? id;
}

/** 分类在指定语言下的显示名；未知 id 时回退为 slug。 */
export function getCategoryLabel(locale: Locale, id: CategoryId): string {
  return CATEGORIES[id][locale] ?? id;
}

export function getTagLabels(locale: Locale, ids: readonly TagId[]): string[] {
  return ids.map((id) => getTagLabel(locale, id));
}

export function getCategoryLabels(locale: Locale, ids: readonly CategoryId[]): string[] {
  return ids.map((id) => getCategoryLabel(locale, id));
}

/** 标签列表页 URL（路径段为 slug，非显示名）。 */
export function tagPath(locale: Locale, tagId: TagId): string {
  const path = locale === SITE.defaultLocale ? `/tags/${tagId}/` : `/${locale}/tags/${tagId}/`;
  return withBase(path);
}

/** 分类列表页 URL（路径段为 slug，非显示名）。 */
export function categoryPath(locale: Locale, categoryId: CategoryId): string {
  const path =
    locale === SITE.defaultLocale
      ? `/categories/${categoryId}/`
      : `/${locale}/categories/${categoryId}/`;
  return withBase(path);
}

export interface TaxonomyWithCount {
  id: TagId | CategoryId;
  name: string;
  count: number;
}

/** 汇总某语言下已使用标签及文章数（仅含至少一篇文章的项）。 */
export function aggregateTagsWithCount(
  locale: Locale,
  posts: Array<{ data: { tags: readonly TagId[] } }>,
): Array<{ id: TagId; name: string; count: number }> {
  const map = new Map<TagId, number>();
  for (const p of posts) {
    for (const id of p.data.tags) map.set(id, (map.get(id) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([id, count]) => ({ id, name: getTagLabel(locale, id), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** 汇总某语言下已使用分类及文章数（仅含至少一篇文章的项）。 */
export function aggregateCategoriesWithCount(
  locale: Locale,
  posts: Array<{ data: { categories: readonly CategoryId[] } }>,
): Array<{ id: CategoryId; name: string; count: number }> {
  const map = new Map<CategoryId, number>();
  for (const p of posts) {
    for (const id of p.data.categories) map.set(id, (map.get(id) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([id, count]) => ({ id, name: getCategoryLabel(locale, id), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
