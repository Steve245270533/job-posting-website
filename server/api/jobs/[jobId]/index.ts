export default defineEventHandler(async (event) => {
  try {
    const jobId = (event.context.params?.jobId as string) ?? "";

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        postedBy: true,
      },
    });

    if (!job) {
      return responseError(0, "未找到该职位");
    }

    return responseOk(job);
  } catch {
    return responseError(0, "查询失败");
  }
});
