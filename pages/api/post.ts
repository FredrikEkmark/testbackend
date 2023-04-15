import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email } = req.body
    const newUser = await prisma.user.create({
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
