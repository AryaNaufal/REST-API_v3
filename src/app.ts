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

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
})