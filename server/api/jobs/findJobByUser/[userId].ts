export default defineEventHandler(async (event) => {
  try {
    const userId = (event.context.params?.userId as string) ?? "";

    const jobs = await prisma.job.findMany({
      where: {
        postedById: userId,
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        postedAt: "desc",
      },
    })

    return responseOk(jobs)
  }
  catch {
    return responseError(0, "查询失败")
  }
})