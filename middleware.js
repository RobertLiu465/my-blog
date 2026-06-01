// EdgeOne Edge 中间件。域名白名单按 EdgeOne 环境修改；构建期变量在 EdgeOne 控制台配置。

const ALLOWED_HOSTS = ['cn.gd-forge.com'];

export async function middleware(context) {
  const { request, next, clientIp } = context;
  const url = new URL(request.url);

  // 只拦截页面导航请求
  const accept = request.headers.get('Accept') || '';
  if (!accept.includes('text/html')) {
    return next();
  }

  // 非 allowed 域名 或 未经过 EdgeOne 代理
  const isForbiddenHost = !ALLOWED_HOSTS.includes(url.hostname);
  const isNotFromEdgeOne = !clientIp;

  if (isForbiddenHost || isNotFromEdgeOne) {
    // 获取 404 页面内容，返回 404 状态码
    const notFoundResponse = await fetch(new URL('/404.html', request.url));
    return new Response(notFoundResponse.body, {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return next();
}

export const config = {
  matcher: ['/:path*'],
};
