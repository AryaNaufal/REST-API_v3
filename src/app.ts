import { load } from "ts-dotenv"

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const userController = require('./user/user.controller')


const env = load({
  PORT: Number
})

app.use(bodyparser.json())
app.use(cors())

app.use("/users", userController)

// app.post('/addPost', async (req: any, res: any) => {
//   const post = req.body

//   const result = await prisma.post.create({
//     data: post
//   })
//   res.send(result)
// })

// app.put('/updatePost', async (req: any, res: any) => {
//   const id = req.body.id
//   const post = req.body
//   delete post.id

//   const result = await prisma.post.update({
//     where: {
//       id: id
//     },
//     data: post
//   })
//   res.send(result)
// })

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})