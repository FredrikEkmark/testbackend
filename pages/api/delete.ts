import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.body
    const userToDelete = await prisma.user.delete({
      where: {
        id,
      },
    })
    res.status(204).end()
  } else {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  }
}

export default handler
