import { NextPage } from "next"
import { useState } from "react"

interface Props {}

type User = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

const Index: NextPage<Props> = ({}) => {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = async () => {
    const res = await fetch("https://testbackend-tau.vercel.app/api/users")
    const data = await res.json()
    setUsers(data)
  }
  getUsers()

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}

export default Index
