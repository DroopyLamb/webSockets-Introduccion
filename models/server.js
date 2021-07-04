const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Creamos un servidor http ( ya viene integrado en node
        // también enviamos nuestro servidor de express
        this.server = require('http').createServer(this.app);

        // io es toda la información de las conexiones que tenga a nuestro server
        this.io = require('socket.io')(this.server);


        // Lista de paths
        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Manejo de los eventos de sockets
        this.sockets();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() { /* this.app.use( this.paths.auth, require('../routes/auth')); */ }

    sockets() {
        // Cliente conectado
        this.io.on('connection', socketController);
    }

    listen() {
        // Tenemos que levantar el server que creamos con socket.io
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;