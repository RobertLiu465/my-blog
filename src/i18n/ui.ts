/**
 * UI dictionaries.
 * Add new locales by adding a key to `messages` and to `SITE.locales` in
 * src/config.ts. All keys must exist for every locale (TypeScript enforces it).
 */

import type { Locale } from '../config';

export const messages = {
  en: {
    'site.skipToContent': 'Skip to content',
    'nav.home': 'Home',
    'nav.posts': 'Posts',
    'nav.tags': 'Tags',
    'nav.categories': 'Categories',
    'nav.archives': 'Archives',
    'nav.about': 'About',
    'nav.search': 'Search',
    'nav.toggleMenu': 'Toggle menu',

    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    'lang.switcher': 'Language',
    'lang.en': 'English',
    'lang.zh-cn': 'Chinese-Simplified',

    'post.publishedOn': 'Published on',
    'post.updatedOn': 'Updated on',
    'post.readingTime': 'min read',
    'post.toc': 'Table of contents',
    'post.tags': 'Tags',
    'post.categories': 'Categories',
    'post.previous': 'Previous',
    'post.next': 'Next',
    'post.comments': 'Comments',
    'post.commentsDisabled': 'Comments are disabled for this post.',
    'post.commentsSetupTitle': 'Comments need configuration',
    'post.commentsSetupBody':
      'Giscus is enabled but not yet configured. Add the repository details below to start collecting comments.',
    'post.commentsSetupStep1':
      'Visit `giscus.app` and select your public GitHub repository (Discussions must be enabled).',
    'post.commentsSetupStep2':
      'Copy the generated `data-repo-id`, `data-category` and `data-category-id` values.',
    'post.commentsSetupStep3':
      'Set the `PUBLIC_GISCUS_ENABLED`, `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY` and `PUBLIC_GISCUS_CATEGORY_ID` env vars in your `.env` file.',
    'post.commentsSetupStep4':
      'Rebuild the site — this notice will be replaced by the live comments thread.',
    'post.commentsSetupDocs': 'Open giscus.app',
    'post.share': 'Share',
    'post.copyLink': 'Copy link',
    'post.copied': 'Copied!',
    'post.author': 'Author',

    'list.allPosts': 'All posts',
    'list.empty': 'No posts found.',
    'list.tagPosts': 'Posts tagged',
    'list.categoryPosts': 'Posts in',
    'list.totalPosts': 'posts',
    'list.totalPostsOne': 'post',

    'pagination.previous': 'Previous page',
    'pagination.next': 'Next page',
    'pagination.page': 'Page',
    'pagination.of': 'of',

    'archives.title': 'Archives',
    'archives.empty': 'No posts yet.',

    'tags.title': 'Tags',
    'tags.empty': 'No tags yet.',

    'categories.title': 'Categories',
    'categories.empty': 'No categories yet.',

    'search.title': 'Search',
    'search.placeholder': 'Search the site',
    'search.openLabel': 'Open search',
    'search.closeLabel': 'Close search',
    'search.empty': 'No results.',
    'search.loading': 'Loading search…',
    'search.typeToStart': 'Type to search…',
    'search.hintShortcut': 'Press / anywhere to open search',
    'search.searching': 'Searching…',
    'search.noResultsFor': 'No results for',
    'search.resultsCount': 'results',
    'search.resultsCountOne': 'result',
    'search.hintNavigate': 'to navigate',
    'search.hintSelect': 'to open',
    'search.clearLabel': 'Clear',

    'code.copy': 'Copy',
    'code.copied': 'Copied',

    '404.title': 'Page not found',
    '404.description': 'The page you are looking for has flown away.',
    '404.cta': 'Back to home',

    'footer.poweredBy': 'Powered by',
    'footer.theme': 'Theme',
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': 'All rights reserved.',
  },

  'zh-cn': {
    'site.skipToContent': '跳转至内容',
    'nav.home': '首页',
    'nav.posts': '文章',
    'nav.tags': '标签',
    'nav.categories': '分类',
    'nav.archives': '归档',
    'nav.about': '关于',
    'nav.search': '搜索',
    'nav.toggleMenu': '切换菜单',

    'theme.toggle': '切换主题',
    'theme.light': '亮色',
    'theme.dark': '暗色',
    'theme.system': '系统',

    'lang.switcher': '语言',
    'lang.en': '英文',
    'lang.zh-cn': '中文-简体',

    'post.publishedOn': '发布于',
    'post.updatedOn': '更新于',
    'post.readingTime': '分钟阅读',
    'post.toc': '目录',
    'post.tags': '标签',
    'post.categories': '分类',
    'post.previous': '上一篇',
    'post.next': '下一篇',
    'post.comments': '评论',
    'post.commentsDisabled': '评论已关闭',
    'post.commentsSetupTitle': '评论需要配置',
    'post.commentsSetupBody':
      '评论功能已启用但未配置。请在下方填写仓库信息以启用评论。',
    'post.commentsSetupStep1':
      '访问 `giscus.app` 并选择你的公共 GitHub 仓库（必须启用 Discussions）。',
    'post.commentsSetupStep2':
      '复制生成的 `data-repo-id`、`data-category` 和 `data-category-id` 值。',
    'post.commentsSetupStep3':
      '设置环境变量 `PUBLIC_GISCUS_ENABLED`、`PUBLIC_GISCUS_REPO`、`PUBLIC_GISCUS_REPO_ID`、`PUBLIC_GISCUS_CATEGORY` 和 `PUBLIC_GISCUS_CATEGORY_ID` 在你的 `.env` 文件中。',
    'post.commentsSetupStep4':
      '重新构建网站 — 此通知将被实时评论线程替换。',
    'post.commentsSetupDocs': '打开 giscus.app',
    'post.share': '分享',
    'post.copyLink': '复制链接',
    'post.copied': '已复制！',
    'post.author': '作者',

    'list.allPosts': '所有文章',
    'list.empty': '没有文章。',
    'list.tagPosts': '标签文章',
    'list.categoryPosts': '分类文章',
    'list.totalPosts': '文章',
    'list.totalPostsOne': '文章',

    'pagination.previous': '上一页',
    'pagination.next': '下一页',
    'pagination.page': '页',
    'pagination.of': '的',

    'archives.title': '归档',
    'archives.empty': '没有文章。',

    'tags.title': '标签',
    'tags.empty': '没有标签。',

    'categories.title': '分类',
    'categories.empty': '没有分类。',

    'search.title': '搜索',
    'search.placeholder': '搜索网站',
    'search.openLabel': '打开搜索',
    'search.closeLabel': '关闭搜索',
    'search.empty': '没有结果。',
    'search.loading': '加载搜索…',
    'search.typeToStart': '输入搜索…',
    'search.hintShortcut': '按 / 打开搜索',
    'search.searching': '搜索中…',
    'search.noResultsFor': '没有结果',
    'search.resultsCount': '结果',
    'search.resultsCountOne': '结果',
    'search.hintNavigate': '导航',
    'search.hintSelect': '打开',
    'search.clearLabel': '清除',

    'code.copy': '复制',
    'code.copied': '已复制',

    '404.title': '页面不存在',
    '404.description': '你正在寻找的页面已经飞走了。',
    '404.cta': '返回首页',

    'footer.poweredBy': 'powered by',
    'footer.theme': '主题',
    'footer.privacy': '隐私政策',
    'footer.copyright': 'All rights reserved.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof messages)['en'];
