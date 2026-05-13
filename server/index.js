const express = require("express")
const { createServer } = require("node:http")
const { Server} = require("socket.io")

const app = express()
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

const mensajes = []

io.on("connection", (socket) => {
    console.log("Cliente conectado.")
    
    // Mensaje a todos
    //io.emit("Bienvenida", "Hola")
    socket.emit("mensaje", mensajes)

    socket.on("mensaje", (mensaje) => {
        //console.log("Mensaje recibido: ", mensaje)
        mensajes.push(mensaje)

        // A todos los que estén conectados
        //  "nombre evento", parámetro
        io.emit("mensaje", mensajes)

        

        // A todos excepto a mí
        //socket.broadcast.emit("mensaje", mensajes)
    })
})

server.listen(3000, () => {
    console.log("Corriendo")
})