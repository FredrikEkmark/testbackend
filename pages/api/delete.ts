import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    const userId = req.query.id as string
    const userToDelete = await prisma.user.delete({
      where: {
        id: userId,
      },
    })
    res.status(204).end()
  } else {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  }
}

export default handler
