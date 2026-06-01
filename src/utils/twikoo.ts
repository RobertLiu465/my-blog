/** 判断 Twikoo envId 是否为有效配置（非占位符）。 */
export function isTwikooEnvConfigured(envId: string): boolean {
  if (!envId) return false;
  const lower = envId.toLowerCase();
  return (
    !lower.includes('xxx') &&
    !lower.includes('your-') &&
    !envId.includes('您的环境id') &&
    !envId.includes('环境id')
  );
}
