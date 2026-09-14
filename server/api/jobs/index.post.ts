export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
  
    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: event.context.user.id,
      }
    })

    return responseOk(job)
  }
  catch {
    return responseError(0, "创建失败")
  }
})