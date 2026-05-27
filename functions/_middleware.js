// functions/_middleware.js
const ALLOWED_HOSTS = ['gd-forge.com', 'www.gd-forge.com'];

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 非 allowed 域名访问 → 301 重定向到自定义域名
  if (!ALLOWED_HOSTS.includes(url.hostname)) {
    const redirectUrl = new URL(context.request.url);
    redirectUrl.hostname = 'gd-forge.com';
    return Response.redirect(redirectUrl.toString(), 301);
  }

  // 检查是否经过 Cloudflare 代理（cf-connecting-ip 由 CF 边缘注入）
  const cfIp = context.request.headers.get('cf-connecting-ip');
  if (!cfIp) {
    return new Response('Forbidden', { status: 403 });
  }

  return context.next();
}
