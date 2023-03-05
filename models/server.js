const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'

        // conectar a base de datos
        this.conectarDB();

        // middlewares
        this.middlewares(); 

        // rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        // Lectura y parseo del body - envio de objectos en el body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }

}

module.exports = Server;