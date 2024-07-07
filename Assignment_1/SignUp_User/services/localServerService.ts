import { Application } from 'express';
import express = require('express');
import bodyParser = require('body-parser');
import routes from './routes';
import DatabaseConnector from './databaseConnector';
import http = require('node:http');

class Server {
    private app: Application;
    private databaseConnector: DatabaseConnector;

    constructor(databaseConnector: DatabaseConnector) {
        this.app = express();
        this.databaseConnector = databaseConnector;
    }
    private async setup(): Promise<void> {
        await this.databaseConnector.connectToDatabase();
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use("/", routes);
    }
    
    public async start(): Promise<void> {
        try {
            await this.setup();
            const PORT: number | string = process.env.PORT || 4000;
            console.log('Server has been setup');
            const httpServer : http.Server = this.getServer()
            httpServer.listen(+PORT);
        } catch (error) {
            console.error('Error setting up server:', error);
        }
    }

    private getServer():http.Server{
        return http.createServer(this.app);
    }
}

export default Server;
