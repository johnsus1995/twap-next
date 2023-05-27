import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}
//to prevent running multiple prisma instances
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client