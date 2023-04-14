import { NextApiHandler } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler: NextApiHandler = async (req, res) => {
  const users = await prisma.user.findMany()
  switch (res.statusCode) {
    case 200:
      res.status(200).json(users)
      break
    case 500:
      res.status(500).send("Internal Error")
  }
}

export default handler
