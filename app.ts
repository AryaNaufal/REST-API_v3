import { load } from "ts-dotenv"
import { PrismaClient } from "@prisma/client"

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const prisma = new PrismaClient()
const cors = require('cors')

const env = load({
  PORT: Number
})

app.use(bodyparser.json())
app.use(cors())

app.get('/', async (req: any, res: any) => {
  const result = await prisma.user.findMany()
  res.send(result)
});

app.post('/add', async (req: any, res: any) => {
  const user = req.body

  const result = await prisma.user.create({
    data: user
  })
  return res.send(result)
})

app.post('/addPost', async (req: any, res: any) => {
  const post = req.body

  const result = await prisma.post.create({
    data: post
  })
  res.send(result)
})

app.put('/updatePost', async (req: any, res: any) => {
  const id = req.body.id
  const post = req.body
  delete post.id

  const result = await prisma.post.update({
    where: {
      id: id
    },
    data: post
  })
  res.send(result)
})

app.delete('/deleteUser/:id', async (req: any, res: any) => {
  const id = req.params.id

  const result = await prisma.user.delete({
    where: {
      id: id
    }
  })
  res.send(result)
})

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})