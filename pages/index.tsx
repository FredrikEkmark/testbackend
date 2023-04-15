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
    const res = await fetch("api/users")
    const data = await res.json()
    setUsers(data)
  }
  getUsers()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
    const newUser = await res.json()
    setUsers([...users, newUser])
    setName("")
    setEmail("")
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await fetch(`/api/update?id=${userId}`, {
      // Pass user ID in the request URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
    const updatedUser = await res.json()
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    ) // Update the user in the state
    setName("")
    setEmail("")
    setUserId("")
  }

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await fetch(`/api/delete?id=${userId}`, {
      // Pass user ID in the request URL
      method: "DELETE",
    })
    if (res.ok) {
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
      setName("")
      setEmail("")
      setUserId("")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Create User</button>
        <p>name - email</p>
      </form>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email} - {user.id}
        </div>
      ))}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <button type="submit">Update User</button>
        <p> name - email - id</p>
      </form>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <button type="submit">Delete User</button>
        <p> id</p>
      </form>
      <br />
      <p>Link till projeket på gitHub.</p>
      <p>https://github.com/FredrikEkmark/testbackend</p>
    </div>
  )
}

export default Index
