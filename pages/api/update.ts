import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    const { name, email } = req.body
    const userId = req.query.id as string
    const newUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    })
    res.status(201).json(newUser)
  } else {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  }
}

export default handler
