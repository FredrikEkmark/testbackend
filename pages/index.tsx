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
    const res = await fetch("api/get")
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
      <h1>RESTfull Next.js Basic application</h1>
      <form onSubmit={handleSubmit}>
        <p>name - email</p>
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
      </form>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email} - {user.id}
        </div>
      ))}

      <form onSubmit={handleUpdate}>
        <p> name - email - id</p>
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
      </form>
      <form onSubmit={handleDelete}>
        <p> id</p>
        <input
          type="text"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />

        <button type="submit">Delete User</button>
      </form>
      <br />
      <h4>Link till projeket på gitHub.</h4>
      <p>https://github.com/FredrikEkmark/testbackend</p>

      <br />
      <h4>Installationsguide</h4>
      <p>Skapa en databas på https://supabase.com/</p>

      <p>Installera i ditt next.js projekt:</p>
      <p>Installera prisma: npm install prisma --save-dev</p>
      <p>Skapa en fil i root: .env</p>
      <p>
        Skriv i .env:
        DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ObubJTKrJYcPSkdsWqms.supabase.co:5432/postgres"
      </p>
      <p>
        Det som skrivs in vid DATABASE_URL ska ni ta från er egen supabase
        databas connection string
      </p>
      <p>Pusha din schema.prisma fil till din databas: npx prisma db push</p>
      <p>
        Du kan modiferia din schema.prisma fil till att ha med den data du
        behöver. Rekomenderar att ta den model data som finns nuvarande och
        stoppa in i chatGPT och be om en nogran förklaring av vad allt betyder.
      </p>
      <p>Installera prisma/client: npm install @prisma/client</p>
      <p>Kör: npx prisma generate</p>
      <p>
        Detta skapar din struktur och behövs göras varje gång schema.prisma
        pushas up på nytt
      </p>
      <p>Sen bör det funka om ni gjort en pull av detta projekt från gitHub</p>
      <p>
        Ifall ni vill depoya på vercel.com så måste ni skapa en Environment
        Variables som matchar er .env fil
      </p>

      <p>
        Jag använde mig av https://vercel.com/guides/nextjs-prisma-postgres för
        att skapa detta och det finns mycket mer info om man gå djupare.
      </p>
    </div>
  )
}

export default Index
