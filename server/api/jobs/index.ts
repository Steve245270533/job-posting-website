export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { q = "", type = "", location = "" } = query;
    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: q as string } },
              { company: { contains: q as string } },
              {
                description: {
                  contains: q as string,
                },
              },
            ],
          },
          type ? { type: type as string } : {},
          location ? { location: { contains: location as string } } : {},
        ],
      },
      orderBy: {
        postedAt: "desc",
      },
      include: {
        postedBy: true,
      },
    });

    return responseOk(jobs);
  } catch {
    return responseError(0, "查询失败");
  }
});
