// middleware.js

// 允许的域名列表
const ALLOWED_HOSTS = ['cn.gd-forge.com'];

export function middleware(context) {
  const { request, next, rewrite, clientIp } = context;
  const url = new URL(request.url);

  // 只拦截页面导航请求
  const accept = request.headers.get('Accept') || '';
  if (!accept.includes('text/html')) {
    return next();
  }

  // 非 allowed 域名 或 无客户端 IP（未经过 EdgeOne 代理）→ 返回 404 页面
  const isForbiddenHost = !ALLOWED_HOSTS.includes(url.hostname);
  const isNotFromEdgeOne = !clientIp;

  if (isForbiddenHost || isNotFromEdgeOne) {
    // 重写到 404 页面，保持当前 URL 不变，内容替换为 404 页面
    return rewrite('/404.html');
  }

  return next();
}

// 匹配所有路由
export const config = {
  matcher: ['/:path*'],
};
