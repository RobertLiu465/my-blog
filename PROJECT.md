# 钢蛋的工坊 — 项目文档

> 基于 [Chirping Astro](https://github.com/kannansuresh/chirping-astro) 的个人博客。静态站点，Bun 构建；**生产部署在 Cloudflare Pages 与 EdgeOne 两套环境**，环境变量在各自平台单独配置。

## 技术栈

| 项     | 值                                                         |
| ------ | ---------------------------------------------------------- |
| 框架   | Astro 6.x（静态输出）                                      |
| 包管理 | Bun ≥ 1.1                                                  |
| 样式   | Tailwind CSS v4 + daisyUI v5                               |
| 搜索   | Pagefind（`build` 后生成）                                 |
| 评论   | Twikoo（优先）/ Giscus（二选一）                           |
| CI     | GitHub Actions `pr-checks.yml`（lint / typecheck / build） |
| 部署   | Cloudflare Pages + EdgeOne（**不用 GitHub Pages**）        |

## 站点配置

| 项           | 值                    | 文件                       |
| ------------ | --------------------- | -------------------------- |
| 站点名       | 钢蛋的工坊            | `src/config.ts`            |
| 默认语言     | `zh-cn`（URL 无前缀） | `src/config.ts`            |
| 支持语言     | `zh-cn`、`en`         | `src/config.ts`            |
| 多语言 UI    | **关闭**              | `multilingual: false`      |
| 每页文章数   | 8                     | `postsPerPage`             |
| 隐私政策链接 | 关闭                  | `showPrivacyPolicy: false` |

## 环境变量

完整列表见 `.env.example`（本地开发用）。**构建期变量**（`SITE_URL`、`BASE_PATH`、`PUBLIC_*`）须在 Cloudflare / EdgeOne 的构建环境中分别设置；两套环境的值可以不同。

| 变量                      | 用途                                    |
| ------------------------- | --------------------------------------- |
| `SITE_URL`                | canonical、RSS、sitemap、OG（无尾斜杠） |
| `BASE_PATH`               | 根域名留空                              |
| `PUBLIC_TWIKOO_*`         | Twikoo 评论                             |
| `PUBLIC_GITHUB_HANDLE` 等 | 侧边栏社交                              |

## 目录结构（自定义部分）

```
src/
├── config.ts              # 站点/导航/评论配置
├── config/taxonomies.ts   # 标签/分类 slug 与多语言显示名
├── content/
│   ├── posts/zh-cn/       # 文章
│   └── pages/zh-cn|en/    # 关于/隐私页
├── components/islands/
│   └── Twikoo.astro       # Twikoo 评论岛
functions/
└── _middleware.js         # Cloudflare Pages Functions
middleware.js              # EdgeOne Edge 中间件
```

## 常用命令

```bash
bun install
bun run dev          # 本地开发（搜索不可用）
bun run build        # 构建 + Pagefind 索引
bun run preview      # 预览 dist（可测搜索）
bun run typecheck
bun run lint
```

## 部署

两套环境均：**构建命令** `bun run build`，**输出目录** `dist`。环境变量在各自控制台配置，勿依赖 GitHub Actions 注入。

### Cloudflare Pages

| 项         | 说明                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| 中间件     | `functions/_middleware.js`                                                                                                 |
| 构建 env   | `SITE_URL`、`BASE_PATH`、`PUBLIC_*` 等                                                                                     |
| 运行时 env | `ALLOWED_HOSTS`（逗号分隔，可选）、`SITE_URL`（未设 `ALLOWED_HOSTS` 时用于推导域名）、`FORBIDDEN_PAGE`（默认 `/404.html`） |
| 访问控制   | 非白名单 Host 或无 `cf-connecting-ip`（未走 CF 代理）→ 404                                                                 |

### EdgeOne

| 项         | 说明                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 中间件     | 根目录 `middleware.js`                                                                                                       |
| 构建 env   | 与 Cloudflare 相同语义（`SITE_URL`、`PUBLIC_*` 等，按该平台文档配置）                                                        |
| 访问控制   | 非白名单 Host 或无 `clientIp`（未走 EdgeOne 代理）→ 404                                                                      |
| 域名白名单 | 当前在 `middleware.js` 内 `ALLOWED_HOSTS` 数组配置；与 Cloudflare 的 env 方式独立，按 EdgeOne 环境改代码或按平台能力绑定变量 |

### GitHub

- **已移除** `.github/workflows/deploy.yml`，不部署 GitHub Pages。
- **保留** `pr-checks.yml`：push/PR 时 lint、typecheck、快速 build（CI 专用 env，与生产无关）。

## 评论逻辑

`PostLayout.astro`：`TWIKOO.enabled` → Twikoo；否则 `GISCUS.enabled` → Giscus。单篇 `comments: false` 可关闭。

## 与上游主题的差异

- 默认语言 `zh-cn`
- Twikoo 评论、`useAI` frontmatter
- 标签/分类字典 `taxonomies.ts`
- Cloudflare + EdgeOne 双中间件
- 停用 GitHub Pages 自动部署
