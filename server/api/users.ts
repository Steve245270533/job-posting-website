export default defineEventHandler(async (event) => {
  return await prisma.user.findMany()
})