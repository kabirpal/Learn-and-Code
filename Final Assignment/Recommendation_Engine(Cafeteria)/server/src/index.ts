import SocketWrapper from './utils/socketWrapper';
import SocketServer from './utils/server';
import MySQLConnection from './database/mySQLConnection';

const PORT = 3000;

const socketWrapper = new SocketWrapper(PORT);
const dbConnection = new MySQLConnection();
const socketServer = new SocketServer(socketWrapper, dbConnection);

socketServer.start().catch((error) => {
    console.error('Error starting the server:', error);
});

