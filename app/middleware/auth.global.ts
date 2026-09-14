export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useUserSession();
  // 白名单
  const publicPaths = ["/jobs", "/auth/signin"];

  // 判断当前路径是否在白名单中（精确匹配）
  const isPublic = publicPaths.some(path => to.path === path);

  // 已登录用户访问登录页 → 重定向到首页（禁用登录页）
  if (user.value && to.path === '/auth/signin') {
    return navigateTo('/'); // 或 '/dashboard' 等
  }

  // 未登录用户访问非白名单路径 → 重定向到登录页
  if (!user.value && !isPublic) {
    return navigateTo('/auth/signin');
  }
});
