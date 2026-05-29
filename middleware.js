export async function middleware(context) {
  const request = context.request;
  const url = new URL(request.url);
  const requestHost = url.host;
  const pathname = url.pathname;
  if (!requestHost.endsWith(context.env.HOST_NAME || '')) {
    return context.redirect('/404.html');
  }

  if (pathname !== null && pathname.toLowerCase().startsWith('/api/xxx')) {
    return await fetch(context.env.apiPath);
  }

  // 请求直接透传
  return context.next();
}
