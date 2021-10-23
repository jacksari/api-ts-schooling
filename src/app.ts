// Servidor de Express
import express from 'express';
// import http from 'http';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import './config/db';

//Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


// Rutas
import routeUser from './components/user/user.routes';
import routeAuth from './components/auth/auth.routes';
import { options } from './config/swaggerOptions';

//const socketio = require('socket.io');
//const Sockets  = require('./sockets');

export default class Server {

    public app: express.Application;
    public port: number;

    constructor(port: number) {

        this.app  = express();
        this.port = port;

        // Http server
        //this.server = http.createServer( this.app );

        // Configuraciones de sockets
        //this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares(): void {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        this.app.use(morgan('dev'));

        this.app.use(express.json())
    }

    swagger(): void {
        const specs = swaggerJsDoc(options);
        this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
    }

    routes(): void {
        this.app.use("/api/v1/user", routeUser);
        this.app.use("/api/v1/auth", routeAuth);
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    configurarSockets(): void {
        //new Sockets( this.io );
    }

    static init(port: number): Server{
        return new Server(port);
    }

    start(): void {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        //this.configurarSockets();

        this.routes();

        this.swagger();

        // Inicializar Server
        this.app.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }
}
