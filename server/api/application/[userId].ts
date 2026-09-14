export default defineEventHandler(async (event) => {
  try {
    const userId = (event.context.params?.userId as string) ?? "";
    const applications = await prisma.application.findMany({
      where: {
        userId: userId,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    });
    
    return responseOk(applications);
  } catch {
    return responseError(0, "查询失败");
  }
});
