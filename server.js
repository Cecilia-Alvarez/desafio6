const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMensajes = require('./contenedores/ContenedorMensajes.js')
const ContenedorProductos = require('./contenedores/ContenedorProductos.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorMensajes()
const mensajesApi = new ContenedorProductos('mensajes.json')

io.on('connection', async socket => {
    console.log('¡Nuevo cliente conectado!');

    socket.emit('productos', productosApi.displayAll());

    socket.on('update', producto => {
        productosApi.saveAll(producto)
        io.sockets.emit('productos', productosApi.displayAll());
    })

    socket.emit('mensajes', await mensajesApi.displayAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.saveAll(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.displayAll());
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server ON at ${connectedServer.address().port} port`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
