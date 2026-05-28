// functions/_middleware.js
export async function onRequest(context) {
  const url = new URL(context.request.url);

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
  const isNotFromCF = !context.request.headers.get('cf-connecting-ip');

  if (isForbiddenHost || isNotFromCF) {
    // 从环境变量读取 404 页面路径，默认 /404.html
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
