export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;
  const method = event.method;
  runTask("console", {
    payload: {
      cc: 123,
      name: 'steve'
    }
  })

  // 非 /api 不处理
  if (!path.startsWith("/api/")) {
    return;
  }

  // Better Auth 自己的接口不鉴权
  if (path.startsWith("/api/auth/")) {
    return;
  }

  // API 白名单
  const publicRoutes = [{ method: "GET", path: "/api/jobs" }];

  const isPublic = publicRoutes.some(
    (route) => route.method === method && route.path === path,
  );

  if (isPublic) {
    return;
  }

  // 其他 API 统一鉴权
  const auth = serverAuth(event);
  const data = await auth.api.getSession({ headers: event.headers });
  if (!data?.user) {
    return responseError(401, "未登录");
  }

  event.context.session = data.session;
  event.context.user = data.user;
});
