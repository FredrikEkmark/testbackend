import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
}

export default handler
