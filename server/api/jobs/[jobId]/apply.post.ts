export default defineEventHandler(async (event) => {
  try {
    const jobId = (event.context.params?.jobId as string) ?? "";
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return responseError(0, "未找到该职位");
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobId,
        userId: event.context.user.id,
      },
    });

    if (existingApplication) {
      return responseError(0, "您已经申请过此职位");
    }

    const application = await prisma.application.create({
      data: {
        jobId: jobId,
        userId: event.context.user.id,
        status: "PENDING",
      },
    });

    return responseOk(application);
  } catch {
    return responseError(0, "创建失败");
  }
});
