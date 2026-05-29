// functions/_middleware.js
export async function middleware(context) {
  const url = new URL(context.request.url);

  // 只拦截页面导航请求（浏览器地址栏访问、链接点击等）
  // CSS/JS/图片等资源请求的 Accept 头不包含 text/html，自动跳过
  const accept = context.request.headers.get('Accept') || '';
  if (!accept.includes('text/html')) {
    return context.next();
  }

  // 从环境变量读取允许的域名
  const allowedHostsStr = context.env.ALLOWED_HOSTS || '';
  const siteUrl = context.env.SITE_URL || '';

  let allowedHosts;
  if (allowedHostsStr) {
    allowedHosts = allowedHostsStr.split(',').map((h) => h.trim());
  } else if (siteUrl) {
    allowedHosts = [new URL(siteUrl).hostname];
  } else {
    return context.next();
  }

  // 非 allowed 域名 或 未经过 Cloudflare 代理 → 返回自定义 404 页面
  const isForbiddenHost = !allowedHosts.includes(url.hostname);

  if (isForbiddenHost) {
    const forbiddenPagePath = context.env.FORBIDDEN_PAGE || '/404.html';
    const notFoundResponse = await context.env.ASSETS.fetch(
      new Request(new URL(forbiddenPagePath, url.origin)),
    );
    return new Response(notFoundResponse.body, {
      status: 404,
      headers: notFoundResponse.headers,
    });
  }

  return context.next();
}
