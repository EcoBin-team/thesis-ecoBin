const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

io.on("connection", socket => {
  console.log("user connected", socket.id)

  socket.on("send_message", data => {
    
  })

  io.on("disconnect", () => {
    console.log("user disconnected", socket.id)
  })
})

server.listen(5000, () => {
  console.log("> Socket Running")
})