import { Socket } from 'socket.io';
import SocketWrapper from './socketWrapper';
import MySQLConnection from '../database/mySQLConnection';
import AuthenticationHandler from '../handlers/authHandler';
import SocketHandler from './socketHandler';

class SocketServer {
    private socketWrapper: SocketWrapper;
    private dbConnection: MySQLConnection;
    private authHandler: AuthenticationHandler;
    private socketHandler: SocketHandler;

    constructor(socketWrapper: SocketWrapper, dbConnection: MySQLConnection) {
        this.socketWrapper = socketWrapper;
        this.dbConnection = dbConnection;
        this.authHandler = new AuthenticationHandler(dbConnection);
        this.socketHandler = new SocketHandler(dbConnection);
    }

    public async start(): Promise<void> {
        await this.dbConnection.connect();
        this.socketWrapper.start();

        this.socketWrapper.onConnection((socket: Socket) => {
            console.log(`New client connected: ${socket.id}`);

            this.authHandler.handleAuthentication(socket);
            this.socketHandler.handleSocketOperations(socket);

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }
}

export default SocketServer;
